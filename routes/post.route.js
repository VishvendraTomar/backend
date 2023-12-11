const {Router } =  require("express");
const { PostModel } = require("../models/post.model");

const postRouter = Router();

postRouter.get("/",async(req,res)=>{
    const{device1 , device2}=
    req.query
    const {userID} = req.body
    const query = {}
    if(userID){
        query.userID = userID
    }
    if(device1&&device2){
        query.device = {$and: [{device:device1},{device:device2}]};

    }else if(device1){
        query.device = device1;
    }else if(device2){
        query.device = device2;
    }
    try{
        let post = await PostModel.find({userID: req.body.userID})
        res.status(200).send({"msg": "data fetched succesfull","post":post})

    }catch(err){
        res.status(400).send({"Error":`${err}`})
    }
})
postRouter.post("/add",async (req,res)=>{
    const {userID}  = req.body;
    try{
        const post = new PostModel({...req.body,userID});
        await post.save()
        res.status(200).json({msg:"post was added "});

    }catch(error ){
        res.status(400).json({error:error.message});
    }
})

postRouter.patch("/update/:postID", async(req,res)=>{
    const {postID } = req.params;
    const {userID } = req.body;

    try{
        const post = await PostModel.findByIdAndUpdate(
            {userID,_id: postID },
            req.body
        );
        if(!post){
            res.status(400).json({msg:"post not found"});

        }else{
            res.status(200).json({msg: "Post updated "});

        }
    }catch(error){
        res.status(400).json({error:error.message});

    }
 })

 postRouter.delete("/delete/:postID" , async (req, res)=>{
    const {postID} = req.params;
    const {userID } = req.body;
    try{
        const post = await PostModel.findByIdAndDelete({userID , _id:postID});
        if(!post){
            res.status(400).json({msg:"Post not found"});

        }else{
            res.status(200).json({msg: "post deleted"});

        }
    }catch(error){
        res.status(400).json({error:error.message})
    }
 })
 module.exports = {postRouter};
