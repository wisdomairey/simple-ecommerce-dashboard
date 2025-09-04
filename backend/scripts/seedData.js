import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      email: 'admin@ecommerce.com',
      password: 'admin123',
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User'
    });
    await adminUser.save();
    console.log('Created admin user: admin@ecommerce.com / admin123');

    // Create sample products
    const products = [
      {
        title: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        category: 'Electronics',
        stock: 25,
        sku: 'WBH-001',
        tags: ['wireless', 'bluetooth', 'headphones', 'audio']
      },
      {
        title: 'Organic Cotton T-Shirt',
        description: 'Comfortable and sustainable organic cotton t-shirt. Available in multiple colors and sizes.',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
        category: 'Clothing',
        stock: 100,
        sku: 'OCT-001',
        tags: ['organic', 'cotton', 'sustainable', 'basic']
      },
      {
        title: 'Smart Fitness Watch',
        description: 'Advanced fitness tracking with heart rate monitor, GPS, and smartphone connectivity.',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop',
        category: 'Electronics',
        stock: 15,
        sku: 'SFW-001',
        tags: ['fitness', 'smartwatch', 'health', 'tracking']
      },
      {
        title: 'Ceramic Coffee Mug Set',
        description: 'Beautiful handcrafted ceramic mugs, perfect for your morning coffee. Set of 4 mugs.',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=300&fit=crop',
        category: 'Home & Kitchen',
        stock: 50,
        sku: 'CCM-001',
        tags: ['ceramic', 'coffee', 'handcrafted', 'set']
      },
      {
        title: 'Leather Laptop Bag',
        description: 'Premium leather laptop bag with multiple compartments. Fits laptops up to 15 inches.',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
        category: 'Accessories',
        stock: 30,
        sku: 'LLB-001',
        tags: ['leather', 'laptop', 'professional', 'bag']
      },
      {
        title: 'Yoga Mat Premium',
        description: 'Non-slip premium yoga mat made from eco-friendly materials. Perfect for all types of yoga practice.',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
        category: 'Sports & Fitness',
        stock: 40,
        sku: 'YMP-001',
        tags: ['yoga', 'fitness', 'eco-friendly', 'exercise']
      },
      {
        title: 'Stainless Steel Water Bottle',
        description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop',
        category: 'Sports & Fitness',
        stock: 75,
        sku: 'SSW-001',
        tags: ['water bottle', 'insulated', 'stainless steel', 'hydration']
      },
      {
        title: 'Wireless Phone Charger',
        description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek and compact design.',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1609692814857-c5c23ce3d853?w=300&h=300&fit=crop',
        category: 'Electronics',
        stock: 60,
        sku: 'WPC-001',
        tags: ['wireless', 'charger', 'phone', 'qi']
      },
      {
        title: 'Scented Candle Collection',
        description: 'Set of 3 premium soy wax candles with relaxing scents: lavender, vanilla, and eucalyptus.',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1602874801034-15c98d208ed9?w=300&h=300&fit=crop',
        category: 'Home & Kitchen',
        stock: 35,
        sku: 'SCC-001',
        tags: ['candles', 'soy wax', 'scented', 'relaxation']
      },
      {
        title: 'Gaming Mouse RGB',
        description: 'High-precision gaming mouse with customizable RGB lighting and programmable buttons.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop',
        category: 'Electronics',
        stock: 20,
        sku: 'GMR-001',
        tags: ['gaming', 'mouse', 'rgb', 'precision']
      },
      {
        title: 'Plant-Based Protein Powder',
        description: 'Organic plant-based protein powder with vanilla flavor. 30 servings per container.',
        price: 44.99,
        image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&h=300&fit=crop',
        category: 'Health & Wellness',
        stock: 45,
        sku: 'PBP-001',
        tags: ['protein', 'plant-based', 'organic', 'fitness']
      },
      {
        title: 'Bamboo Cutting Board Set',
        description: 'Sustainable bamboo cutting board set with 3 different sizes. Antibacterial and eco-friendly.',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop',
        category: 'Home & Kitchen',
        stock: 55,
        sku: 'BCS-001',
        tags: ['bamboo', 'cutting board', 'sustainable', 'kitchen']
      }
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`Created ${createdProducts.length} sample products`);

    // Create some sample orders with realistic dates
    const sampleOrders = [];
    const orderStatuses = ['pending', 'processing', 'shipped', 'delivered'];
    const paymentStatuses = ['paid', 'pending'];

    for (let i = 0; i < 20; i++) {
      const randomProducts = createdProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 1);

      const items = randomProducts.map(product => ({
        product: product._id,
        title: product.title,
        price: product.price,
        quantity: Math.floor(Math.random() * 3) + 1,
        image: product.image
      }));

      const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.08;
      const shipping = subtotal > 50 ? 0 : 10;
      const total = subtotal + tax + shipping;

      // Create order with random date in the last 90 days
      const orderDate = new Date();
      orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 90));

      const order = {
        customerEmail: `customer${i + 1}@example.com`,
        customerName: `Customer ${i + 1}`,
        items,
        subtotal,
        tax,
        shipping,
        total,
        status: orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
        paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
        stripeSessionId: `cs_test_${Date.now()}_${i}`,
        createdAt: orderDate,
        updatedAt: orderDate
      };

      sampleOrders.push(order);
    }

    const createdOrders = await Order.insertMany(sampleOrders);
    console.log(`Created ${createdOrders.length} sample orders`);

    console.log('\n✅ Seed data created successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Admin user: admin@ecommerce.com (password: admin123)`);
    console.log(`- Products: ${createdProducts.length}`);
    console.log(`- Orders: ${createdOrders.length}`);
    console.log('\n🚀 You can now start the server and begin testing!');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);
  }
};

// Run the seed function
seedData();
