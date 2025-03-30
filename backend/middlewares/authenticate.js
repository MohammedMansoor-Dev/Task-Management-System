const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: 'No token provided, authorization denied'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.id;  // Attach user ID from token to request object
        req.role = decoded.role;  // Attach user role from token to request object
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({
            message: 'Token is not valid'
        });
    }
};

module.exports = authenticate;
