const jwt = require('jsonwebtoken');

module.exports = {
    validateToken: (req, res, next) => {
        const authorizationHeaader = req.headers.authorization;
        // console.log(authorizationHeaader);
        let result;
        if(authorizationHeaader) {
            const token = req.headers.authorization.split(' ')[1];
            const options = {
                expiresIn: '2d',
                issuer: 'https://scotch.io'
            };

            try {
                result = jwt.verify(token, process.env.JWT_SECRET, options);

                req.decoded = result;
                // console.log(req.decode);
                
                next();
            } catch (err) {
                throw new Error(err);
            }
        } else {
            result = {
                error: `Authentication error. Token required.`,
                status: 401
            };
            res.status(401).send(result);
        }
    }
};