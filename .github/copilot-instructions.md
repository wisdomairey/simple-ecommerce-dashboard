# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Context

This is a full-stack MERN e-commerce application with the following structure:

- **Backend**: Node.js + Express.js + MongoDB + Mongoose
- **Frontend**: React.js + Tailwind CSS + React Router
- **Authentication**: JWT-based authentication for admin users
- **Payment Processing**: Stripe API integration
- **Analytics**: Recharts for admin dashboard analytics

## Key Features

1. **Public Storefront**: Product browsing, cart management, Stripe checkout
2. **Admin Dashboard**: Product management, order tracking, sales analytics
3. **Role-based Access**: Admin authentication with JWT
4. **Payment Integration**: Stripe test mode for secure transactions

## Code Style Guidelines

- Use ES6+ modules with `type: "module"` in package.json
- Write clean, modular code with proper error handling
- Include helpful comments for complex business logic
- Follow RESTful API conventions for backend routes
- Use functional components with React Hooks
- Implement proper validation for forms and API endpoints

## Security Considerations

- Never expose sensitive credentials in client-side code
- Use environment variables for all configuration
- Implement proper CORS settings
- Validate and sanitize all user inputs
- Use secure JWT practices with appropriate expiration times
