const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    header:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    publisher:{
        type:String,
        required:true
    },
    status:{
      type:String,
      enum:['DELETED','NOTDELETED','APPROVED','NOTAPPROVED'],
      default:'NOTAPPROVED'
    },
    image:{
        type:String,
        required:true
    }
},{
    timestamps:true
  });

const Blog = mongoose.model('Blog',BlogSchema);

module.exports = Blog;