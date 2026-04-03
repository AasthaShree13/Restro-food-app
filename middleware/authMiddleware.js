const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        //get token
        const token = req.headers["authorization"].split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (err,decode) => {
            if(err){
                return res.status(401).send({
                    success:false,
                    message:"un-authorized user"
                });
            } else{
                if(!req.body) req.body ={};
                req.body.id = decode.id;
                //req.user = decode;
                next();
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in auth API",
            error
        })
    }
}