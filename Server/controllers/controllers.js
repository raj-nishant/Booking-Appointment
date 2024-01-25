const {Users} = require("../model/model");

module.exports.postDataController=async(req,res,next)=>{
    try{
        const username=req.body.username
        const email=req.body.email
        const mobile=req.body.mobile
        const time=req.body.time
        if(!mobile && !email){
            throw new Error('Please complete the form')
        }
        const data=await Users.create({
            username:username,
            email:email,
            mobile:mobile,
            time:time
        })
        res.status(201).json(data)
    }catch(err){
        res.status(500).send(err.message||'Already scheduled')
    }   
}

module.exports.getDataController=async(req,res,next)=>{
    const users=await Users.findAll()
    try {
        res.send(users)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports.deleteDataController=async(req,res,next)=>{
    const Id=req.params.Id
    const deleteId=await Users.findByPk(Id)
    try {
        const destruction=await deleteId.destroy();
        try {
            res.status(200).send('Deleted')
        } catch (error) {
            throw new Error('Not deleted')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports.getUpdateDataController=async(req,res,next)=>{
    const Id=req.params.Id
    const getUser= await Users.findByPk(Id)
    try {
        console.log(getUser);
        res.json(getUser)
    } catch (error) {
        console.log(error);
    }
}

module.exports.postUpdateDataController=async(req,res,next)=>{
    const Id=req.params.Id
    const postUser=await Users.findByPk(Id)
    try {
        postUser.username=req.body.username
        postUser.email=req.body.email
        postUser.mobile=req.body.mobile
        postUser.time=req.body.time
        const updateUser=await postUser.save()
        try {
            res.send(updateUser)
        } catch (error) {
            throw new Error()
        }
    } catch (error) {
        console.log(error);
    }
}