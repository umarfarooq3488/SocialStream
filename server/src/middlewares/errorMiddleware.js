const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong",
        errors: err.errors || [],
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export default errorHandler;