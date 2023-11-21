# Example Code: Express.js Middleware Demonstration

Based on the provided description of middleware in Express.js, we'll create a simple Express.js application that
demonstrates the use of middleware for logging, authentication, and error handling. We will also show how to chain
multiple middleware functions together and apply middleware to specific routes.

## express.js

```javascript
const express = require('express');
const app = express();
const port = 3000;

// Middleware for logging each request
function loggerMiddleware(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}

// Middleware for basic authentication
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader === 'Bearer valid-token') {
        next();
    } else {
        res.status(401).send('Authentication required');
    }
}

// Error handling middleware
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).send('Internal Server Error');
}

// Applying the logger middleware to all requests
app.use(loggerMiddleware);

// Applying authentication middleware only to a specific route
app.use('/protected', authMiddleware);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/protected', (req, res) => {
    res.send('Protected content');
});

// Chaining multiple middleware functions
app.get('/chain', loggerMiddleware, authMiddleware, (req, res) => {
    res.send('Chained route');
});

// Error handling route
app.get('/error', (req, res) => {
    throw new Error('This is a simulated error');
});

// Applying the error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
```

## Explanation

- Logger Middleware (loggerMiddleware): Logs the date, HTTP method, and URL of each request.
- Authentication Middleware (authMiddleware): Checks for a specific authorization header ('Bearer valid-token') 
and allows the request to proceed if the header is present. Otherwise, it sends a 401 status code.
- Error Handling Middleware (errorHandler): Catches errors and sends a 500 status code.
- Route-Specific Middleware: The /protected route uses the authMiddleware to protect its content.
- Chaining Middleware: The /chain route demonstrates chaining multiple middleware functions.
- Simulated Error Route (/error): Demonstrates the use of error handling middleware.
- Global Middleware Application: app.use(loggerMiddleware) applies the logger middleware to all incoming requests.
- 