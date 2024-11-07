# E-Commerce API

This is a Node.js-based RESTful API for an e-commerce platform, designed to handle user authentication, product management, category management, orders, and payment processing using Stripe. The application uses MongoDB for the database and integrates with Cloudinary for image storage.

## Features

- **User Authentication**: Secure authentication with session handling and cookie parsing.
- **Product Management**: API endpoints to create, update, delete, and retrieve products.
- **Category Management**: Manage product categories with dedicated API routes.
- **Order Management**: Handle orders with Stripe payment integration.
- **Image Uploads**: Cloudinary integration for image storage.
- **Security**: Implemented security features like data sanitization, CORS, and Helmet for enhanced protection.

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Stripe API** for payments
- **Cloudinary** for image storage
- **Passport.js** for authentication (if used)
- **dotenv** for environment configuration
- **cookie-parser** for managing cookies
- **cors** for handling Cross-Origin Resource Sharing
- **helmet** for securing HTTP headers
- **express-mongo-sanitize** for sanitizing user input to prevent MongoDB operator injection

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/DhruvGajera9022/E-Commerce-NodeJs.git
   cd E-Commerce-NodeJs
   ```

2. **Install Packages:**

   ```bash
   npm install
   ```

3. **Run the Server:**
   ```bash
   npm start
   ```
