const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

function authenticator(req, res, next){
    const token = req.headers.authorization
    jwt.verify(token, "your_secret_key", (err, decode)=>{
        if(err)
        return res.send({
            message:  "Invalid token, please login again",
            status: 2
        })
        if(decode){
            req.body.user = decode.userID
            next()
        }
        else
        {
            res.send({
                message: "Invalid token, please login again",
                status: 2
            })
        }
    })
}

module.exports = {
    authenticator
}