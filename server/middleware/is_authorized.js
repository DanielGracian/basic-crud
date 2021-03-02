const jwt = require('jsonwebtoken');

exports.preAuth = (req, res, next) => {   
    if (!req.headers['authorization']) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const token = req.headers['authorization'].split(' ')[1];
   
    let decodedToken ='';
    try {
        decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    //req.userId = decodedToken.userId;
    next();
};

