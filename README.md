# Connectify - MERN Chat Application

Connectify is a real-time chat application that allows users to communicate through text messages. It features group chat functionality, user authentication, and a responsive UI.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Contributing](#contributing)

## Features

- Real-time messaging with WebSockets.
- Group chat functionality.
- User authentication and authorization.
- Responsive design for various devices.

## Technologies Used

### Frontend:
- React.js
- Context API for state management
- CSS for styling

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Socket.io for real-time communication

## Project Structure
```plaintext
Connectify/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   ├── context/
│   │   └── images/
│   ├── package.json
│   └── README.md
├── server/
│   ├── Models/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── index.js
│   ├── package.json
│   └── README.md
├── .gitattributes
├── .gitignore
└── README.md
```

## Installation

### Prerequisites:
- Node.js and npm installed on your machine
- MongoDB instance (local or cloud-based)

### Backend Setup:
- Navigate to the server directory:
```plaintext
cd Connectify/server
```
- Install the backend dependencies:
```plaintext
npm install
```
- Create a .env file in the server directory with the following environment variables:
```plaintext
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret
```
- Start the backend server:
```plaintext
npm start
```

### Frontend Setup:
- Navigate to the frontend directory:
```plaintext
cd Connectify/frontend
```
- Install the frontend dependencies:
```plaintext
npm install
```
- Start the frontend server:
```plaintext
npm start
``` 
## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.