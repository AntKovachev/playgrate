# PlayGrate

PlayGrate is a full-stack web application designed to provide users with a seamless gaming experience. It features user authentication, game browsing, and account management functionalities. The project is built with a React frontend and a Node.js/Express backend, with MongoDB as the database.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Future Enhancements](#future-enhancements)
8. [Contributors](#contributors)

---

## Features

### Client-Side Features
- **User Authentication**: Login, register, and logout functionality.
- **Game Grid**: Browse games with pagination and sorting by popularity.
- **Search Functionality**: Search for games using a search bar.
- **Account Management**: Change passwords and view account details.
- **Responsive Design**: Fully responsive UI built with React Bootstrap.

### Server-Side Features
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

## Project Structure

```
playgrate/
├── client/                     # Frontend code
│   ├── public/                 # Static assets
│   ├── src/                    # React components and logic
│   │   ├── components/         # Reusable components
│   │   │   ├── Auth/           # Authentication-related components
│   │   │   ├── GameGrid.jsx    # Game grid component
│   │   │   ├── TopNavbar.jsx   # Navigation bar
│   │   │   ├── MyAccount.jsx   # Account management page
│   │   ├── App.jsx             # Main React app
│   │   ├── index.js            # React entry point
│   ├── package.json            # Frontend dependencies
├── server/                     # Backend code
│   ├── controllers/            # API controllers
│   │   ├── authController.cjs  # Authentication logic
│   ├── models/                 # Mongoose models
│   │   ├── User.cjs            # User schema
│   ├── routes/                 # API routes
│   │   ├── authRoutes.cjs      # Authentication routes
│   ├── server.js               # Main server file
│   ├── package.json            # Backend dependencies
├── README.md                   # Project documentation
```

---

## Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (running locally or on a cloud service like MongoDB Atlas)

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/playgrate.git
   cd playgrate
   ```

2. **Install dependencies**:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the `server` directory with the following:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Start the development servers**:
   ```bash
   # Start the backend server
   cd server
   nodemon server.cjs

   # Start the frontend server
   cd ../client
   npm run dev
   ```

5. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.

---

## Usage

### Client-Side
- **Home Page**: Browse games and click on a game card to view details.
- **Search**: Use the search bar to find specific games.
- **Account Management**: Access your account details and change your password.

### Server-Side
- The backend provides RESTful APIs for user authentication and game data.

---

## API Endpoints

### Authentication
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login with email and password.
- **POST /api/auth/change-password**: Change the user's password.

### User Profile
- **GET /api/auth/profile**: Get the authenticated user's profile.

---

## Future Enhancements

- **Game Recommendations**: Add personalized game recommendations.
- **Game Reviews**: Allow users to leave reviews and ratings for games.
- **Admin Panel**: Add an admin interface for managing games and users.
- **Dark Mode**: Add a toggle for light/dark mode.

---

## Contributors

- **Anton Kovachev** - Developer