
# CartWish 🛒

**CartWish** is an e-commerce web application designed to provide a seamless shopping experience. It features a modern front-end built with React.js and integrates user authentication for secure access. The app includes features such as product browsing, featured products, and user-specific order management.

---

## Features ✨

- **User Authentication**: Secure login and signup using JWT authentication.
- **Product Display**: Fetch and display featured products and product listings dynamically.
- **Order Management**: View and manage "My Orders" with data retrieved from protected API routes.
- **Responsive Design**: Fully responsive UI optimized for both desktop and mobile devices.
- **Seamless Navigation**: Intuitive and user-friendly interface for smooth browsing.

---

## Getting Started 🚀

Follow these steps to set up and run the project locally:

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Rohitbanala/CartWish-E-CommerceProject.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd CartWish-E-CommerceProject
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add your backend API URLs and keys as follows:
     ```env
     REACT_APP_BACKEND_URL=your_backend_url
     ```
   Replace `your_backend_url` with the base URL of your backend API.

5. **Run the application**:
   Start the development server:
   ```bash
   npm start
   ```

6. **Access the application**:  
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

---

## Technologies Used 🛠️

- **Frontend**: React.js, HTML, CSS, JavaScript
- **Authentication**: JSON Web Tokens (JWT)
- **API Integration**: Axios for backend communication
- **State Management**: Context API
- **Tools**: VS Code, Git

---

## Features in Detail 📝

1. **Authentication**:
   - User signup and login using JWT for secure sessions.
   - Protected routes ensure only authenticated users can access specific features.

2. **Product Browsing**:
   - Fetch and display featured products dynamically from the backend.
   - View detailed information about each product.

3. **Order Management**:
   - Retrieve user-specific order data from protected API routes.
   - Display order details in a user-friendly format.

