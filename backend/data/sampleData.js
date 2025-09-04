// Sample data for demo purposes when MongoDB is not available

export const sampleProducts = [
  // Electronics & Tech
  {
    _id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    category: 'Electronics',
    stock: 45,
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    _id: '2', 
    name: 'Smart Fitness Watch Pro',
    description: 'Advanced smartwatch with heart rate monitoring, GPS tracking, sleep analysis, and 7-day battery life. Water-resistant up to 50m.',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    category: 'Electronics',
    stock: 32,
    featured: true,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  {
    _id: '3',
    name: 'Professional DSLR Camera',
    description: '24MP full-frame DSLR camera with 4K video recording, dual pixel autofocus, and weather sealing. Perfect for professional photography.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80',
    category: 'Electronics',
    stock: 8,
    featured: true,
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22')
  },
  {
    _id: '4',
    name: 'Wireless Charging Stand',
    description: 'Fast wireless charging stand compatible with all Qi-enabled devices. Sleek aluminum design with LED indicator.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1609692814857-c5c23ce3d853?w=800&q=80',
    category: 'Electronics',
    stock: 78,
    featured: false,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },

  // Fashion & Lifestyle
  {
    _id: '5',
    name: 'Designer Sunglasses - Aviator Style',
    description: 'Classic aviator sunglasses with polarized lenses and titanium frame. UV400 protection with premium leather case included.',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
    category: 'Fashion',
    stock: 28,
    featured: true,
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19')
  },
  {
    _id: '6',
    name: 'Minimalist Leather Wallet',
    description: 'Handcrafted genuine leather wallet with RFID blocking technology. Slim design with 6 card slots and bill compartment.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
    category: 'Fashion',
    stock: 42,
    featured: false,
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-21')
  },
  {
    _id: '7',
    name: 'Luxury Ceramic Watch',
    description: 'Elegant ceramic watch with Swiss movement, sapphire crystal, and water resistance to 100m. Perfect for formal occasions.',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80',
    category: 'Fashion',
    stock: 15,
    featured: true,
    createdAt: new Date('2024-01-23'),
    updatedAt: new Date('2024-01-23')
  },
  {
    _id: '8',
    name: 'Premium Canvas Backpack',
    description: 'Durable canvas backpack with leather accents, laptop compartment, and multiple organizational pockets. Perfect for work or travel.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=800&q=80',
    category: 'Fashion',
    stock: 36,
    featured: false,
    createdAt: new Date('2024-01-24'),
    updatedAt: new Date('2024-01-24')
  },

  // Home & Living
  {
    _id: '9',
    name: 'Modern Floor Lamp',
    description: 'Contemporary LED floor lamp with adjustable brightness and warm/cool light settings. Perfect for reading and ambient lighting.',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&q=80',
    category: 'Home & Living',
    stock: 22,
    featured: false,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  {
    _id: '10',
    name: 'Ergonomic Office Chair',
    description: 'Premium ergonomic office chair with lumbar support, breathable mesh back, and adjustable armrests. Perfect for long work sessions.',
    price: 379.99,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    category: 'Home & Living',
    stock: 18,
    featured: true,
    createdAt: new Date('2024-01-26'),
    updatedAt: new Date('2024-01-26')
  },
  {
    _id: '11',
    name: 'Ceramic Dinnerware Set',
    description: 'Elegant 16-piece ceramic dinnerware set with modern design. Dishwasher and microwave safe. Includes plates, bowls, and mugs.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    category: 'Home & Living',
    stock: 31,
    featured: true,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17')
  },
  {
    _id: '12',
    name: 'Luxury Throw Blanket',
    description: 'Ultra-soft cashmere blend throw blanket with elegant fringe detail. Perfect for cozy evenings and stylish home decor.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    category: 'Home & Living',
    stock: 27,
    featured: false,
    createdAt: new Date('2024-01-27'),
    updatedAt: new Date('2024-01-27')
  },

  // Sports & Fitness
  {
    _id: '13',
    name: 'Premium Yoga Mat',
    description: 'Eco-friendly yoga mat with superior grip and cushioning. Made from natural rubber with alignment lines for perfect poses.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    category: 'Sports & Fitness',
    stock: 45,
    featured: false,
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-21')
  },
  {
    _id: '14',
    name: 'Resistance Band Set',
    description: 'Complete resistance band workout set with 5 different resistance levels, door anchor, and exercise guide.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    category: 'Sports & Fitness',
    stock: 63,
    featured: false,
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-01-28')
  },

  // Books & Education
  {
    _id: '15',
    name: 'JavaScript Programming Guide',
    description: 'Comprehensive guide to modern JavaScript programming with practical examples and best practices. Perfect for developers.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    category: 'Books & Education',
    stock: 92,
    featured: false,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  },
  {
    _id: '16',
    name: 'Digital Marketing Masterclass',
    description: 'Complete digital marketing course with video tutorials, templates, and case studies. Learn from industry experts.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    category: 'Books & Education',
    stock: 156,
    featured: false,
    createdAt: new Date('2024-01-29'),
    updatedAt: new Date('2024-01-29')
  },

  // Beauty & Personal Care
  {
    _id: '17',
    name: 'Luxury Skincare Set',
    description: 'Complete skincare routine with vitamin C serum, hyaluronic acid moisturizer, and gentle cleanser. Dermatologist approved.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    category: 'Beauty & Personal Care',
    stock: 38,
    featured: true,
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-01-30')
  },
  {
    _id: '18',
    name: 'Electric Toothbrush Pro',
    description: 'Advanced electric toothbrush with smart pressure sensor, 5 cleaning modes, and 2-week battery life.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800&q=80',
    category: 'Beauty & Personal Care',
    stock: 47,
    featured: false,
    createdAt: new Date('2024-01-31'),
    updatedAt: new Date('2024-01-31')
  },

  // Kitchen & Dining
  {
    _id: '19',
    name: 'Professional Chef Knife Set',
    description: 'High-carbon steel chef knife set with ergonomic handles and magnetic storage block. Restaurant-quality precision.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80',
    category: 'Kitchen & Dining',
    stock: 19,
    featured: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    _id: '20',
    name: 'Smart Coffee Maker',
    description: 'WiFi-enabled coffee maker with app control, programmable brewing, and built-in grinder. Wake up to perfect coffee.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    category: 'Kitchen & Dining',
    stock: 24,
    featured: false,
    createdAt: new Date('2024-02-02'),
    updatedAt: new Date('2024-02-02')
  }
];

export const sampleOrders = [
  {
    _id: 'order1',
    orderNumber: 'ORD-001',
    customerEmail: 'customer@example.com',
    items: [
      { product: '1', quantity: 1, price: 199.99 },
      { product: '2', quantity: 1, price: 299.99 }
    ],
    total: 499.98,
    status: 'completed',
    paymentStatus: 'paid',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    createdAt: new Date('2024-01-23'),
    updatedAt: new Date('2024-01-23')
  },
  {
    _id: 'order2',
    orderNumber: 'ORD-002',
    customerEmail: 'another@example.com',
    items: [
      { product: '3', quantity: 1, price: 449.99 }
    ],
    total: 449.99,
    status: 'processing',
    paymentStatus: 'paid',
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    createdAt: new Date('2024-01-24'),
    updatedAt: new Date('2024-01-24')
  }
];

export const sampleUser = {
  _id: 'admin1',
  email: 'admin@demo.com',
  password: '$2a$10$X8yK9J7bZKJ.UYkJXJXJXOeHZzGzGzGzGzGzGzGzGzGzGzGzGzGzG', // password: 'admin123'
  role: 'admin',
  name: 'Demo Admin',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01')
};
