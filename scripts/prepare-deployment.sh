#!/bin/bash

# NexaShop Deployment Preparation Script
# This script helps prepare your project for Render deployment

echo "🚀 Preparing NexaShop for Render Deployment..."
echo "================================================"

# Check if we're in the correct directory
if [ ! -f "README.md" ] || [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "✅ Project structure verified"

# Check if .env files exist
echo ""
echo "🔍 Checking environment files..."

if [ -f "backend/.env" ]; then
    echo "✅ Backend .env file found"
else
    echo "⚠️  Backend .env file missing - you'll need environment variables in Render"
fi

if [ -f "frontend/.env" ]; then
    echo "✅ Frontend .env file found"
else
    echo "⚠️  Frontend .env file missing - you'll need environment variables in Render"
fi

# Check dependencies
echo ""
echo "📦 Checking dependencies..."

echo "Backend dependencies:"
cd backend
if npm list --depth=0 2>/dev/null | grep -q "express\|mongoose\|cors"; then
    echo "✅ Essential backend packages found"
else
    echo "❌ Some backend packages may be missing"
fi

cd ../frontend
echo "Frontend dependencies:"
if npm list --depth=0 2>/dev/null | grep -q "react\|react-router-dom\|axios"; then
    echo "✅ Essential frontend packages found"
else
    echo "❌ Some frontend packages may be missing"
fi

cd ..

echo ""
echo "📋 Pre-deployment Checklist:"
echo "=========================================="
echo "□ 1. Push code to GitHub repository"
echo "□ 2. Set up MongoDB Atlas cluster"
echo "□ 3. Get Stripe API keys (test mode)"
echo "□ 4. Create Render account"
echo "□ 5. Deploy backend service first"
echo "□ 6. Deploy frontend service second"
echo "□ 7. Update environment variables"
echo "□ 8. Test both services"

echo ""
echo "🔗 Required Environment Variables:"
echo "=================================="
echo ""
echo "Backend (nexashop-backend):"
echo "- NODE_ENV=production"
echo "- MONGODB_URI=mongodb+srv://..."
echo "- JWT_SECRET=your-secret-key"
echo "- STRIPE_SECRET_KEY=sk_test_..."
echo "- FRONTEND_URL=https://your-frontend.onrender.com"
echo ""
echo "Frontend (nexashop-frontend):"
echo "- REACT_APP_API_URL=https://your-backend.onrender.com"
echo "- REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_..."

echo ""
echo "📖 Next Steps:"
echo "=============="
echo "1. Read DEPLOYMENT.md for detailed instructions"
echo "2. Visit https://render.com and create an account"
echo "3. Connect your GitHub repository"
echo "4. Follow the deployment guide step by step"

echo ""
echo "✨ Good luck with your deployment!"
