# PlayGrate

PlayGrate is a full-stack web application designed to provide users with a seamless gaming experience. It features user authentication, game browsing, and account management functionalities. The project is built with a React frontend and a Node.js/Express backend, with MongoDB as the database.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)

---

## Features

### Client-Side
- **User Authentication**: Login, register, and logout functionality.
- **Game Grid**: Browse games with pagination and sorting by popularity.
- **Search Functionality**: Search for games using a search bar.
- **Account Management**: Change passwords and view account details.
- **Responsive Design**: Fully responsive UI built with React Bootstrap.

### Server-Side
- **Authentication**: Secure user authentication using JWT.
- **Password Management**: Change password functionality with validation.
- **RESTful API**: Backend API for user management and game data.

---

## Technologies Used

### Frontend
- **React**: Component-based UI library.
- **React Router**: For client-side routing.
- **React Bootstrap**: For responsive and styled components.
- **Axios**: For making HTTP requests.

### Backend
- **Node.js**: JavaScript runtime for the server.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: ODM for MongoDB.
- **bcryptjs**: For password hashing.
- **jsonwebtoken (JWT)**: For secure user authentication.

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or on a cloud service like MongoDB Atlas)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/playgrate.git
   cd playgrate

2. Install dependencies for both client and server
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install

3. Set up environment variables:
    # Create a .env file in the server directory with the following
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

4. Start the development servers:
    # Start the backend server
    cd server
    nodemon server.cjs

    # Start the frontend server
    cd ../client
    npm run dev

## Usage
    Client-Side
    Home Page: Browse games and click on a game card to view details.
    Search: Use the search bar to find specific games.
    Account Management: Access your account details and change your password.
    Server-Side
    The backend provides RESTful APIs for user authentication and game data.

## API Endpoints
    Authentication
    POST /api/auth/register: Register a new user.
    POST /api/auth/login: Login with email and password.
    POST /api/auth/change-password: Change the user's password.
    User Profile
    GET /api/auth/profile: Get the authenticated user's profile.

## Future Enhancements
    Game Recommendations: Add personalized game recommendations.
    Game Reviews: Allow users to leave reviews and ratings for games.
    Admin Panel: Add an admin interface for managing games and users.
    Dark Mode: Add a toggle for light/dark mode.

Contributors
    Anton Kovachev - Developer