/*
Based on the provided description of middleware in Express.js, we'll create a simple Express.js application that
demonstrates the use of middleware for logging, authentication, and error handling. We will also show how to chain
multiple middleware functions together and apply middleware to specific routes.
 */
import express from 'express';

const app = express();
const port = 13001;

// Middleware for logging each request
function logMiddleware(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}

// Middleware for basic authentication
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader === 'Bearer valid-token') { // Replace 'valid-token' with your own token
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
app.use(logMiddleware);

// Applying authentication middleware only to a specific route
app.use('/protected', authMiddleware);

app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/protected', (req, res) => {
    res.send('Protected content');
});

// Chaining multiple middleware functions
app.get('/chain', logMiddleware, authMiddleware, (req, res) => {
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
