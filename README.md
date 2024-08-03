# Task Manager Application

## Overview

This is a Task Manager application that allows users to register, log in, manage their tasks, and perform CRUD operations on them. The application uses a modern tech stack with a focus on security and user experience.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces. Used for creating interactive UI components.
- **TypeScript**: A statically typed superset of JavaScript that helps in writing robust and maintainable code.
- **Axios**: A promise-based HTTP client for making API requests.
- **React Router**: A library for handling routing in React applications, enabling navigation between pages.
- **CSS**: For styling the application.

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine. Used to build the backend server.
- **Express.js**: A web application framework for Node.js, used to build RESTful APIs and handle routing.
- **TypeScript**: Used in the backend for type safety and improved code maintainability.
- **MongoDB**: A NoSQL database for storing user and task data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **jsonwebtoken**: A library for generating and verifying JSON Web Tokens (JWTs) for user authentication.
- **bcryptjs**: A library for hashing passwords to ensure secure storage.

## Features

- **User Authentication**: Users can register, log in, and manage their sessions securely using JWTs.
- **Task Management**: Users can create, update, delete, and view tasks. Each task includes a title and description.
- **Protected Routes**: Certain routes are protected and require authentication to access.

## Setup and Installation

### Prerequisites

- Node.js (version 14 or later)
- MongoDB

