# Deployment Guide for Render

## 🚀 NexaShop Deployment on Render

### Prerequisites

1. **GitHub Repository**: Push your code to GitHub
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **MongoDB Atlas**: Set up a free MongoDB cluster
4. **Stripe Account**: Get API keys from Stripe dashboard

### 🗄️ **Step 1: Setup MongoDB Atlas**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user
4. Get connection string (replace `<password>` with actual password)
5. Whitelist Render's IP addresses or use `0.0.0.0/0` for all IPs

### 🔧 **Step 2: Deploy Backend (API)**

1. **Connect Repository**:

   - Go to Render Dashboard
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

2. **Configure Backend Service**:

   ```
   Name: nexashop-backend
   Region: Oregon (US West)
   Branch: main
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

3. **Environment Variables**:

   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nexashop?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-here
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   FRONTEND_URL=https://nexashop-frontend.onrender.com
   PORT=5000
   ```

4. **Deploy**: Click "Create Web Service"

### 🎨 **Step 3: Deploy Frontend (Static Site)**

1. **Create Static Site**:

   - Click "New" → "Static Site"
   - Connect same GitHub repository

2. **Configure Frontend Service**:

   ```
   Name: nexashop-frontend
   Branch: main
   Root Directory: frontend
   Build Command: npm run build
   Publish Directory: build
   ```

3. **Environment Variables**:

   ```
   REACT_APP_API_URL=https://nexashop-backend.onrender.com
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   ```

4. **Deploy**: Click "Create Static Site"

### 🔗 **Step 4: Update API URL**

After both services are deployed, update the frontend's API URL:

1. Copy your backend service URL from Render dashboard
2. Update `REACT_APP_API_URL` in frontend environment variables
3. Redeploy frontend

### 🛠️ **Step 5: Seed Database (Optional)**

1. Open Render backend service shell
2. Run: `npm run seed`

### ✅ **Verification Checklist**

- [ ] Backend API responds at `/api/health`
- [ ] Frontend loads without errors
- [ ] Admin login works (admin@demo.com / admin123)
- [ ] Products display on homepage
- [ ] Shopping cart functionality works
- [ ] Stripe checkout redirects properly

### 🚨 **Common Issues & Solutions**

1. **CORS Errors**: Ensure `FRONTEND_URL` is correctly set in backend
2. **API Connection**: Verify `REACT_APP_API_URL` in frontend
3. **Database Connection**: Check MongoDB Atlas IP whitelist
4. **Environment Variables**: Ensure all required vars are set

### 💰 **Cost Optimization**

- **Free Tier**: Both services run on Render's free tier
- **Limitations**: Services may sleep after 15 minutes of inactivity
- **Upgrade**: Consider paid plans for production use

### 🔄 **Auto-Deploy Setup**

Enable auto-deploy on both services:

1. Go to service settings
2. Enable "Auto-Deploy"
3. Services will redeploy on every git push

### 📞 **Support**

If you encounter issues:

1. Check Render service logs
2. Verify environment variables
3. Test API endpoints directly
4. Check network/CORS settings
