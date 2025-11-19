const errorHandler = (err, req, res, next) => {
    // log to console with timestamp, request info and stack
    console.error(`[${new Date().toISOString()}] Error on ${req.method} ${req.originalUrl}`);
    console.error(err.stack || err);

    // respond to client (avoid leaking sensitive details in production)
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};

module.exports = { errorHandler };