const express = require("express")
const { UserModel } = require("../models/UserModel")
const salt = 5
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

userRouter.get("/", (req, res)=>{
    res.send("All users")
})

userRouter.post("/register", async(req, res)=>{
    const {name, email, password} = req.body
    bcrypt.hash(password, salt, async function(err, hash) {
        if(err)
            return res.send({message: "Something went wrong", status: 0})
        try
        {
            let data = await UserModel.find({email})
            if(data.length > 0)
            {
                res.send({
                    message: "Email already exists!",
                    status: 0
                })
            }
            else
            {
                let user = new UserModel({name, email, password: hash})
                await user.save()
                res.send({
                    message: "User created successfully",
                    status: 1
                })
            }
        }
        catch(error)
        {
            res.send({
                message: error.message,
                status: 0
            })
        }
    });
})

userRouter.post("/login", async(req, res)=>{
    const {email, password} = req.body
    let option = {
        expiresIn: "1d"
    }
    try
    {
        let data = await UserModel.find({email})
        //console.log(data)
        if(data.length > 0)
        {
            let token = jwt.sign({userID: data[0]._id}, "your_secret_key", option);
            bcrypt.compare(password, data[0].password, function(err, result)
            {
                if(err) return res.send({
                    message: "Something went wrong: " + err,
                    status: 0
                })
                if(result)
                res.send({
                    message: "Login successful",
                    user: data[0].name,
                    token: token,
                    status: 1
                })
                else
                res.send({
                    message: "Incorrect password",
                    status: 0
                })
            });
        }
        else
        {
            res.send({
                message: "User does not exist",
                status: 0
            })
        }
    }
    catch(error)
    {
        res.send({
            message: error.message,
            status: 0
        })
    }
    
})

module.exports = {
    userRouter
}