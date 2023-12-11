const jwt  = require("jsonwebtoken");
const {BlacklistModel} = require("../models/blacklist.model");
require("dotenv").config();
const auth = async (req, res,next) =>{
    const token = req.headers.authorization.split(" ")[1];
    try{
        let existingToken = await BlacklistModel.find({
            blackList: {$in:token},
        });
        if(existingToken){
            res.status(200).json("please login!!");
        }else{
            const decoded = jwt.verify(token, process.env.SECRET);
            req.body.userID = decoded.userID;
            next();
        }
    }catch(error){
        res.status(400).json({error:error.message});
    }
}
module.exports = [auth]