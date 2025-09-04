import express from 'express';
import Stripe from 'stripe';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @route   POST /api/checkout/create-session
// @desc    Create Stripe checkout session
// @access  Public
router.post('/create-session', async (req, res) => {
  try {
    const { items, customerEmail, customerName } = req.body;

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items are required' });
    }

    if (!customerEmail || !customerName) {
      return res.status(400).json({ message: 'Customer email and name are required' });
    }

    // Validate and calculate totals
    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      
      if (!product || !product.isActive) {
        return res.status(400).json({ 
          message: `Product ${item.productId} not found or unavailable` 
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.title}. Available: ${product.stock}` 
        });
      }

      const lineTotal = product.price * item.quantity;
      subtotal += lineTotal;

      validatedItems.push({
        product: product._id,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        image: product.image
      });
    }

    // Calculate tax and total (you can customize tax calculation)
    const taxRate = 0.08; // 8% tax rate
    const tax = subtotal * taxRate;
    const shipping = subtotal > 50 ? 0 : 10; // Free shipping over $50
    const total = subtotal + tax + shipping;

    // Create Stripe line items
    const lineItems = validatedItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: [item.image]
        },
        unit_amount: Math.round(item.price * 100) // Convert to cents
      },
      quantity: item.quantity
    }));

    // Add shipping line item if applicable
    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Shipping'
          },
          unit_amount: Math.round(shipping * 100)
        },
        quantity: 1
      });
    }

    // Add tax line item
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Tax'
        },
        unit_amount: Math.round(tax * 100)
      },
      quantity: 1
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      customer_email: customerEmail,
      metadata: {
        customerName,
        customerEmail,
        orderData: JSON.stringify({
          items: validatedItems,
          subtotal,
          tax,
          shipping,
          total
        })
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA']
      }
    });

    res.json({
      sessionId: session.id,
      url: session.url
    });
  } catch (error) {
    console.error('Create checkout session error:', error);
    res.status(500).json({ message: 'Server error creating checkout session' });
  }
});

// @route   POST /api/checkout/webhook
// @desc    Handle Stripe webhook events
// @access  Public (Stripe webhook)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        await handleSuccessfulPayment(session);
        break;
      
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        await handlePaymentIntentSucceeded(paymentIntent);
        break;
      
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        await handleFailedPayment(failedPayment);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ message: 'Webhook handler error' });
  }
});

// Handle successful payment
async function handleSuccessfulPayment(session) {
  try {
    const { metadata } = session;
    const orderData = JSON.parse(metadata.orderData);

    // Retrieve payment intent to get more details
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);

    // Create order in database
    const order = new Order({
      customerEmail: metadata.customerEmail,
      customerName: metadata.customerName,
      items: orderData.items,
      subtotal: orderData.subtotal,
      tax: orderData.tax,
      shipping: orderData.shipping,
      total: orderData.total,
      stripeSessionId: session.id,
      stripePaymentIntentId: paymentIntent.id,
      paymentStatus: 'paid',
      status: 'processing',
      shippingAddress: session.shipping_details?.address
    });

    await order.save();

    // Update product stock
    for (const item of orderData.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      );
    }

    console.log(`Order created successfully: ${order.orderNumber}`);
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

// Handle payment intent succeeded
async function handlePaymentIntentSucceeded(paymentIntent) {
  try {
    await Order.findOneAndUpdate(
      { stripePaymentIntentId: paymentIntent.id },
      { paymentStatus: 'paid' }
    );
  } catch (error) {
    console.error('Error updating payment status:', error);
  }
}

// Handle failed payment
async function handleFailedPayment(paymentIntent) {
  try {
    await Order.findOneAndUpdate(
      { stripePaymentIntentId: paymentIntent.id },
      { paymentStatus: 'failed' }
    );
  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
}

// @route   GET /api/checkout/session/:sessionId
// @desc    Get checkout session details
// @access  Public
router.get('/session/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Find the order associated with this session
    const order = await Order.findOne({ stripeSessionId: session.id });

    res.json({
      session: {
        id: session.id,
        payment_status: session.payment_status,
        customer_email: session.customer_email
      },
      order: order ? {
        orderNumber: order.orderNumber,
        status: order.status,
        total: order.total
      } : null
    });
  } catch (error) {
    console.error('Get session error:', error);
    res.status(500).json({ message: 'Server error retrieving session' });
  }
});

export default router;
