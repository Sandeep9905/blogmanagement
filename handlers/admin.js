const db = require('../models');

exports.allBlogs = async function(req ,res , next){
    try{
        let allBlogs = await db.Blog.find({});
        res.status(200).json(allBlogs);
    }catch(err){
     return next(err);
    }
}

exports.allContentWriter = async function(req ,res ,next){
    try{
     let allContentWriter = await db.User.find({role:'CONTENT-WRITER'});
     if(allContentWriter){
        return res.status(200).json(allContentWriter);
     }else{
         return res.status(500).json({
             message:'Something went Wrong!!'
         })
     }
    }catch(err){
        return next(err);
    }
}

exports.addContentWriter = async function(req ,res,next){
    try{
        let user = await db.User.create(req.body);
        if(user){
           return res.status(200).json({
               message:'Content Writer Created.'
           })
        }else{
            return res.status(500).json({
                message:'Something went Wrong!'
            })
        }
    }catch(err){
        if(err.status === 11000){
            err.message = 'Sorry that username and/or Email is taken.'
        }
        return next(err);
    }
}

exports.editContentWriter = async function(req ,res ,next){
    try{
        const user = await db.User.findByIdAndUpdate(req.params.user_id,
            req.body, { new: true, runValidators: true });
          return res.status(201).json(user);

    }catch(err){
        return next(err);
    }
}

exports.deleteContentWriter = async function (req ,res ,next){
    try{
        const blog = await db.User.findByIdAndUpdate(req.params.user_id, {status:-1});
        return res.status(201).json({
            message:'User Deleted Successfully!'
        });
    }catch(err){
        return next(err);
    }
}

exports.approveBlogs = async function (req ,res ,next){
    try{
       let approved = await db.Blog.findByIdAndUpdate(req.params.blogid ,{status:'APPROVED'});
       return res.status(200).json({
           message:'Blog Approved'
       }); 
    }catch(err){
        return next(err);
    }
}