const {Router} = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt")
require("dotenv").config();

const userRouter = Router()
userRouter.post("/register",async(req,res)=>{
    try{
        const email = req.body.email;
        const user = await UserModel.findOne({email});
        if(user){
            req.status(400).json({msg:"user already Registered"})
        }else{
            bcrypt.hash(req.body.password,10,async(error , hash)=>{
                if(hash){
                    const newUser = new UserModel({
                        ...req.body,
                        password:hash,
                    });
                    await newUser.save();
                    res.status(200).json({msg:"user registeration successfull"});

                }
            })
        }
    }catch(error){
        res.status(400).json({error:error.message});

    }
})
userRouter.post("/login", async(req,res )=>{
    const {email,password} = req.body;
    try{
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(error,result)=>{
                if(result){
                    var token = jwt.sign({userID: user._id},process.env.SECRET);
                    res.status(200).json({msg:"user logged in successful" ,token});

                }else{
                    res.status(200).json({msg:"Incorrect password"})
                }
            })
        }
    }catch(error){
        res.status(400).json({error:error.message});

    }
})

module.exports = {userRouter};