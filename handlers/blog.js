const db = require('../models');


exports.getBlog = async function(req , res ,next){
    try{
       const blog = await db.Blog.findById(req.params.blog_id);
       if(blog){
          return res.status(200).json(blog)
       }else{
           return res.status(200).json({
               message:'Blog Not Found!'
           })
       }
    }catch(err){
        return next(err);
    }
}

exports.getAllBolgs = async function(req ,res , next){
    try{
    let foundUser = await db.User.findById(req.params.user_id).populate('blogs' ,{
        header:true,
        description:true,
        image:true,
        publisher:true,
        status:true
    });
    if(foundUser){
        return res.status(200).json(
            foundUser.blogs
        );
    }else{
        return res.status(500).json({
            message:'Something went wrong!'
        });
    }
    }catch(err){
        return next(err);
    }
}


exports.createBlogs = async function(req ,res , next){
    try{
        let blog = await db.Blog.create({
            header:req.body.header,
            description:req.body.description,
            image:req.body.image,
            publisher:req.body.publisher,

        });
        let foundUser = await db.User.findById(req.params.user_id);
        foundUser.blogs.push(blog.id);
        await foundUser.save();
        await blog.save();
        return res.status(200).json({
            mesage:'Blog Created successfully'
        });
    }catch(err){
        return next(err);
    }
}

exports.updateBlog = async function(req ,res , next){
    try{
        const blog = await db.Blog.findByIdAndUpdate(req.params.blog_id, 
            req.body, { new: true, runValidators: true });
          return res.status(201).json(blog);
    }catch(err){
        return next(err);
    }
}

exports.deleteBlog = async function(req ,res , next){
    try{
        const blog = await db.Blog.findByIdAndUpdate(req.params.blog_id, {status:'DELETED'});
          return res.status(201).json({
              message:'Blog Deleted Successfully!'
          });
    }catch(err){
        return next(err);
    }
}
