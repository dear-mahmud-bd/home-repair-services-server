# Home Repair Services Backend (RENOXY)

Welcome to the **Home Repair Services Backend**, built to support a platform where users can offer, book, and manage various home repair services like plumbing, electrical repairs, and carpentry. This backend is developed using **Node.js** and **Express.js**, with **MongoDB** as the database and **JWT (JSON Web Token)** for secure api and authentication.

## Frontend Repository
[Click Here to Visit Frontend Code](https://github.com/dear-mahmud-bd/home-repair-services-client)

## Features
- **JWT Authentication**: Secure access to protected routes using JSON Web Tokens.
- **Role-Based Access**: Differentiate between service providers and customers.
- **CRUD Operations**: Create, read, update, and delete services.
- **Booking System**: Customers can book services, and service providers can manage them.
- **MongoDB Integration**: Data persistence using MongoDB.
- **Middleware**: Custom middleware for logging and authentication.
- **Cookie-Based Token Management**: Use cookies for storing and handling JWT tokens.

## Technologies Used
- **Node.js**: Backend runtime environment for running JavaScript on the server.
- **Express.js**: Web framework for building RESTful APIs quickly and efficiently.
- **MongoDB**: NoSQL database used to store user, service, and booking information.
- **JWT (JSON Web Token)**: Used for secure user authentication and session management.
- **CORS (Cross-Origin Resource Sharing)**: Handles cross-origin requests to allow the frontend to communicate with the backend.
- **Cookie-Parser**: Middleware for parsing cookies, used for managing authentication tokens securely in HTTP-only cookies.
