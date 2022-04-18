const jwt = require("jsonwebtoken");
require('dotenv').config()
module.exports = (req, res, next) => {


    const token = req.headers.authorization;
   
    if (!token) {
        res.status(401).json({
            message: 'Auth failed'
        });
    } else {
        jwt.verify(token,process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: 'Auth failed'
                });
            } else {
               
                next()
            }

        })
    }
    
}