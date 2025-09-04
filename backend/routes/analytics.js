import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/analytics/dashboard
// @desc    Get dashboard analytics data
// @access  Private (Admin)
router.get('/dashboard', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { timeframe = '30d' } = req.query;
    
    // Calculate date ranges
    let startDate = new Date();
    let previousStartDate = new Date();
    
    switch (timeframe) {
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        previousStartDate.setDate(previousStartDate.getDate() - 14);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        previousStartDate.setDate(previousStartDate.getDate() - 60);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        previousStartDate.setDate(previousStartDate.getDate() - 180);
        break;
      case '1y':
        startDate.setFullYear(startDate.getFullYear() - 1);
        previousStartDate.setFullYear(previousStartDate.getFullYear() - 2);
        break;
      default:
        startDate.setDate(startDate.getDate() - 30);
        previousStartDate.setDate(previousStartDate.getDate() - 60);
    }

    const [
      currentPeriodStats,
      previousPeriodStats,
      revenueByDay,
      topProducts,
      recentOrders,
      lowStockProducts
    ] = await Promise.all([
      // Current period stats
      Order.aggregate([
        { 
          $match: { 
            createdAt: { $gte: startDate },
            paymentStatus: 'paid'
          } 
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$total' },
            totalOrders: { $sum: 1 },
            averageOrderValue: { $avg: '$total' }
          }
        }
      ]),
      
      // Previous period stats for comparison
      Order.aggregate([
        { 
          $match: { 
            createdAt: { $gte: previousStartDate, $lt: startDate },
            paymentStatus: 'paid'
          } 
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$total' },
            totalOrders: { $sum: 1 },
            averageOrderValue: { $avg: '$total' }
          }
        }
      ]),
      
      // Revenue by day for chart
      Order.aggregate([
        { 
          $match: { 
            createdAt: { $gte: startDate },
            paymentStatus: 'paid'
          } 
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              day: { $dayOfMonth: '$createdAt' }
            },
            revenue: { $sum: '$total' },
            orders: { $sum: 1 }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
      ]),
      
      // Top selling products
      Order.aggregate([
        { 
          $match: { 
            createdAt: { $gte: startDate },
            paymentStatus: 'paid'
          } 
        },
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.product',
            title: { $first: '$items.title' },
            totalQuantity: { $sum: '$items.quantity' },
            totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
          }
        },
        { $sort: { totalQuantity: -1 } },
        { $limit: 10 }
      ]),
      
      // Recent orders
      Order.find({ paymentStatus: 'paid' })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('orderNumber customerName total status createdAt'),
      
      // Low stock products
      Product.find({ 
        stock: { $lt: 10 }, 
        isActive: true 
      })
        .sort({ stock: 1 })
        .limit(10)
        .select('title stock category price')
    ]);

    // Calculate percentage changes
    const current = currentPeriodStats[0] || { totalRevenue: 0, totalOrders: 0, averageOrderValue: 0 };
    const previous = previousPeriodStats[0] || { totalRevenue: 0, totalOrders: 0, averageOrderValue: 0 };

    const calculateChange = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    const stats = {
      revenue: {
        current: current.totalRevenue,
        change: calculateChange(current.totalRevenue, previous.totalRevenue)
      },
      orders: {
        current: current.totalOrders,
        change: calculateChange(current.totalOrders, previous.totalOrders)
      },
      averageOrderValue: {
        current: current.averageOrderValue || 0,
        change: calculateChange(current.averageOrderValue || 0, previous.averageOrderValue || 0)
      },
      conversionRate: {
        current: 2.5, // This would typically come from tracking visitor data
        change: 0.3
      }
    };

    // Format revenue by day data for charts
    const chartData = revenueByDay.map(item => ({
      date: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}-${item._id.day.toString().padStart(2, '0')}`,
      revenue: item.revenue,
      orders: item.orders
    }));

    res.json({
      stats,
      chartData,
      topProducts,
      recentOrders,
      lowStockProducts
    });
  } catch (error) {
    console.error('Get dashboard analytics error:', error);
    res.status(500).json({ message: 'Server error while fetching analytics' });
  }
});

// @route   GET /api/analytics/sales
// @desc    Get detailed sales analytics
// @access  Private (Admin)
router.get('/sales', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { 
      timeframe = '30d',
      groupBy = 'day' // day, week, month
    } = req.query;
    
    // Calculate date range
    let startDate = new Date();
    switch (timeframe) {
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(startDate.getDate() - 30);
    }

    // Build grouping based on groupBy parameter
    let grouping;
    switch (groupBy) {
      case 'week':
        grouping = {
          year: { $year: '$createdAt' },
          week: { $week: '$createdAt' }
        };
        break;
      case 'month':
        grouping = {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        };
        break;
      default: // day
        grouping = {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' }
        };
    }

    const salesData = await Order.aggregate([
      { 
        $match: { 
          createdAt: { $gte: startDate },
          paymentStatus: 'paid'
        } 
      },
      {
        $group: {
          _id: grouping,
          revenue: { $sum: '$total' },
          orders: { $sum: 1 },
          averageOrderValue: { $avg: '$total' },
          totalItems: { $sum: { $sum: '$items.quantity' } }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1, '_id.week': 1 } }
    ]);

    // Format data for frontend
    const formattedData = salesData.map(item => {
      let dateLabel;
      if (groupBy === 'week') {
        dateLabel = `${item._id.year}-W${item._id.week}`;
      } else if (groupBy === 'month') {
        dateLabel = `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`;
      } else {
        dateLabel = `${item._id.year}-${item._id.month.toString().padStart(2, '0')}-${item._id.day.toString().padStart(2, '0')}`;
      }

      return {
        date: dateLabel,
        revenue: item.revenue,
        orders: item.orders,
        averageOrderValue: item.averageOrderValue,
        totalItems: item.totalItems
      };
    });

    res.json({
      salesData: formattedData,
      summary: {
        totalRevenue: salesData.reduce((sum, item) => sum + item.revenue, 0),
        totalOrders: salesData.reduce((sum, item) => sum + item.orders, 0),
        totalItems: salesData.reduce((sum, item) => sum + item.totalItems, 0),
        averageOrderValue: salesData.length > 0 ? 
          salesData.reduce((sum, item) => sum + item.revenue, 0) / 
          salesData.reduce((sum, item) => sum + item.orders, 0) : 0
      }
    });
  } catch (error) {
    console.error('Get sales analytics error:', error);
    res.status(500).json({ message: 'Server error while fetching sales analytics' });
  }
});

// @route   GET /api/analytics/products
// @desc    Get product analytics
// @access  Private (Admin)
router.get('/products', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { timeframe = '30d' } = req.query;
    
    let startDate = new Date();
    switch (timeframe) {
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(startDate.getDate() - 30);
    }

    const [
      productPerformance,
      categoryPerformance,
      inventoryStatus
    ] = await Promise.all([
      // Product performance
      Order.aggregate([
        { 
          $match: { 
            createdAt: { $gte: startDate },
            paymentStatus: 'paid'
          } 
        },
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.product',
            title: { $first: '$items.title' },
            totalQuantity: { $sum: '$items.quantity' },
            totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
            averagePrice: { $avg: '$items.price' },
            orderCount: { $sum: 1 }
          }
        },
        { $sort: { totalRevenue: -1 } },
        { $limit: 20 }
      ]),
      
      // Category performance
      Order.aggregate([
        { 
          $match: { 
            createdAt: { $gte: startDate },
            paymentStatus: 'paid'
          } 
        },
        { $unwind: '$items' },
        {
          $lookup: {
            from: 'products',
            localField: 'items.product',
            foreignField: '_id',
            as: 'product'
          }
        },
        { $unwind: '$product' },
        {
          $group: {
            _id: '$product.category',
            totalQuantity: { $sum: '$items.quantity' },
            totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
            productCount: { $addToSet: '$items.product' }
          }
        },
        {
          $addFields: {
            productCount: { $size: '$productCount' }
          }
        },
        { $sort: { totalRevenue: -1 } }
      ]),
      
      // Inventory status
      Product.aggregate([
        { $match: { isActive: true } },
        {
          $group: {
            _id: null,
            totalProducts: { $sum: 1 },
            lowStock: { 
              $sum: { 
                $cond: [{ $lt: ['$stock', 10] }, 1, 0] 
              } 
            },
            outOfStock: { 
              $sum: { 
                $cond: [{ $eq: ['$stock', 0] }, 1, 0] 
              } 
            },
            totalValue: { $sum: { $multiply: ['$price', '$stock'] } }
          }
        }
      ])
    ]);

    res.json({
      productPerformance,
      categoryPerformance,
      inventoryStatus: inventoryStatus[0] || {
        totalProducts: 0,
        lowStock: 0,
        outOfStock: 0,
        totalValue: 0
      }
    });
  } catch (error) {
    console.error('Get product analytics error:', error);
    res.status(500).json({ message: 'Server error while fetching product analytics' });
  }
});

export default router;
