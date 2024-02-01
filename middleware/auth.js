const jwt = require('jsonwebtoken');

const verifyToken = (req , res , next) => {
    try {
        console.log("yes")
        let cookies = req.headers.cookie;
        console.log("cookies are :", cookies);
        if(cookies == undefined) {
            res.status(500).send({msg: "Cookie is expired"});
            return;
        }
        let token = cookies.split('=')[1];
            jwt.verify(token, process.env.SECRET_KEY, (err, authdata) => {
            if(!err) {
                req.user = authdata.user_Id;
                console.log({user : authdata.user_Id})
                next();
            }
        })
    } catch (error) {
        console.log({"Error in generating token and cookies" : error.message})
        res.status(500).send({Message : error.message});
    }
}

module.exports = verifyToken;
