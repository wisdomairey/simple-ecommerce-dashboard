# NexaShop - Premium E-commerce Platform

A full-stack MERN e-commerce application designed for modern retailers and premium shopping experiences. Features a sophisticated public storefront for customers and a comprehensive admin dashboard for managing products, orders, and analytics.

## 🚀 Features

### Public Storefront

- **Homepage**: Hero carousel, featured products, and brand showcase
- **Product Catalog**: Advanced filtering, search, and sorting capabilities
- **Product Details**: Interactive product views with cart functionality
- **Shopping Cart**: Real-time cart management with dynamic totals
- **Stripe Checkout**: Secure payment processing in test mode
- **Order Confirmation**: Professional order completion experience

### Admin Dashboard

- **Authentication**: JWT-based secure login system
- **Dashboard Overview**: Real-time sales metrics and analytics
- **Product Management**: Complete CRUD operations with inventory tracking
- **Order Management**: Order status updates and fulfillment tracking
- **Analytics**: Advanced reporting with interactive charts (Recharts)
- **Responsive Design**: Mobile-optimized admin interface

## 🛠️ Tech Stack

### Frontend

- **React.js 18** - Modern UI library with hooks
- **React Router 6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Recharts** - Chart library for analytics
- **React Hot Toast** - Toast notifications
- **Lucide React** - Modern icon library

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Stripe** - Payment processing
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Stripe account (for payment processing)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd simple-ecommerce-dashboard
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ecommerce

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
JWT_EXPIRES_IN=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Stripe Configuration (Test Mode)
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

### 4. Seed Sample Data

```bash
cd backend
npm run seed
```

This will create:

- Admin user: `admin@ecommerce.com` / `admin123`
- Sample products with realistic data
- Sample orders for analytics

### 5. Start the Application

#### Start Backend (Terminal 1)

```bash
cd backend
npm run dev
```

#### Start Frontend (Terminal 2)

```bash
cd frontend
npm start
```

The application will be available at:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:3000/admin

## 🔧 Configuration

### Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your test API keys from the Stripe Dashboard
3. Add the keys to your `.env` files
4. Configure webhook endpoints for order processing

### MongoDB Setup

- **Local MongoDB**: Install MongoDB locally or use MongoDB Compass
- **MongoDB Atlas**: Create a free cluster and get your connection string

### Environment Variables

See `.env.example` files in both frontend and backend directories for all required environment variables.

## 📝 API Endpoints

### Authentication

- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Create admin account
- `GET /api/auth/me` - Get current user

### Products

- `GET /api/products` - Get all products (public)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders

- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status

### Checkout

- `POST /api/checkout/create-session` - Create Stripe session
- `POST /api/checkout/webhook` - Stripe webhook handler

### Analytics

- `GET /api/analytics/dashboard` - Dashboard metrics
- `GET /api/analytics/sales` - Sales analytics
- `GET /api/analytics/products` - Product analytics

## 🎨 Project Structure

```
simple-ecommerce-dashboard/
├── backend/
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API route handlers
│   ├── middleware/       # Custom middleware
│   ├── scripts/          # Utility scripts
│   └── server.js         # Main server file
├── frontend/
│   ├── public/           # Static assets
│   └── src/
│       ├── components/   # Reusable components
│       ├── pages/        # Page components
│       ├── context/      # React context providers
│       ├── services/     # API service functions
│       ├── utils/        # Utility functions
│       └── App.js        # Main app component
└── README.md
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **CORS Protection**: Configured for specific origins
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: Server-side validation for all inputs
- **Secure Headers**: Security headers for production

## 📊 Analytics Features

- **Revenue Tracking**: Real-time revenue monitoring
- **Order Analytics**: Order volume and status tracking
- **Product Performance**: Best-selling products analysis
- **Time-based Reporting**: Customizable date ranges
- **Visual Charts**: Interactive charts with Recharts
- **Key Metrics**: KPIs and percentage changes

## �‍💼 Admin Guide - Adding Products

### Admin Access

**Demo Admin Credentials:**

- **Email**: `admin@demo.com`
- **Password**: `admin123`

### How to Add Products as Admin

1. **Login to Admin Panel**

   - Navigate to `/admin/login`
   - Use the demo credentials above
   - You'll be redirected to the admin dashboard

2. **Access Product Management**

   - Click "Products" in the admin sidebar
   - You'll see the products management interface

3. **Add New Product**
   - Click the "Add Product" button (blue button with plus icon)
   - A modal form will open with the following fields:

#### Product Form Fields

| Field              | Type     | Required | Description                       |
| ------------------ | -------- | -------- | --------------------------------- |
| **Product Name**   | Text     | ✅       | Unique product name               |
| **Description**    | Textarea | ✅       | Detailed product description      |
| **Price**          | Number   | ✅       | Price in USD (e.g., 29.99)        |
| **Stock Quantity** | Number   | ✅       | Available inventory count         |
| **Category**       | Select   | ✅       | Choose from predefined categories |
| **Image URL**      | URL      | ✅       | High-quality product image URL    |
| **Featured**       | Checkbox | ❌       | Mark as featured product          |

#### Available Categories

- Electronics
- Clothing & Accessories
- Home & Garden
- Sports & Fitness
- Beauty & Personal Care
- Kitchen & Dining
- Books & Media
- Toys & Games

#### Image Guidelines

- **Source**: Use Unsplash.com for high-quality stock photos
- **Format**: `https://images.unsplash.com/photo-XXXXXX?w=800&q=80`
- **Size**: Recommended 800px width for optimal performance
- **Quality**: Use `q=80` parameter for good quality/size balance

#### Example Image URLs

```
Electronics: https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80
Fashion: https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80
Home: https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80
```

4. **Product Management Actions**

   - **Edit**: Click the edit icon (pencil) to modify product details
   - **Delete**: Click the delete icon (trash) to remove product
   - **View**: Products are automatically visible on the public storefront

5. **Product Status Indicators**

   - **Stock Status**: Green (In Stock) / Red (Out of Stock)
   - **Featured**: Yellow badge for featured products
   - **Category**: Blue badge showing product category

6. **Search and Filter Products**
   - **Search**: Find products by name or description
   - **Category Filter**: Filter by specific categories
   - **Sort Options**: Sort by date, name, price, or stock
   - **Order**: Ascending or descending order

### Admin Dashboard Features

1. **Products Tab**: Complete CRUD operations for product management
2. **Orders Tab**: View and manage customer orders
3. **Analytics Tab**: Sales performance and metrics
4. **Dashboard**: Overview of key business metrics

### Product Workflow

```
Admin Login → Products Page → Add Product → Fill Form → Submit → Product Live
```

### Best Practices for Adding Products

1. **High-Quality Images**: Use professional product photos
2. **Detailed Descriptions**: Include key features and benefits
3. **Accurate Pricing**: Ensure prices are competitive and correct
4. **Stock Management**: Keep inventory counts updated
5. **SEO-Friendly Names**: Use descriptive product names
6. **Category Organization**: Choose appropriate categories for better browsing
7. **Featured Products**: Mark bestsellers or new arrivals as featured

### Bulk Operations (Future Enhancement)

- Import products via CSV
- Bulk price updates
- Inventory management alerts
- Product performance analytics

## �🚢 Deployment

### Backend Deployment (Heroku/Railway)

1. Set environment variables on your hosting platform
2. Ensure MongoDB connection string is configured
3. Set up Stripe webhooks for your production domain

### Frontend Deployment (Vercel/Netlify)

1. Build the React application: `npm run build`
2. Set environment variables for production API URL
3. Deploy the build folder to your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Check the GitHub issues page
- Review the documentation
- Contact the development team

## 🔄 Future Enhancements

- **Email Notifications**: Order confirmation and status updates
- **Inventory Alerts**: Low stock notifications
- **Customer Accounts**: User registration and order history
- **Product Reviews**: Customer feedback system
- **Advanced Analytics**: More detailed reporting features
- **Multi-vendor Support**: Support for multiple sellers
- **Mobile App**: React Native mobile application

---

**Built with ❤️ using the MERN stack**
