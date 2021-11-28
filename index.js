require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./handlers/error');
const blogRoutes = require('./routes/blog'); 
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const db = require('./models');
const {loginRequired , ensureCorrectUser} = require('./middleware/auth');
const {ensureAdmin} = require('./middleware/admin');
app.use(cors());
const PORT = process.env.PORT || 5000;


// to  get req.body data in API
app.use(
    express.urlencoded({
      extended: true
    })
  )
app.use(express.json());

//all routes
//public routes
app.get('/api/blogs/:blog_id' ,async function(req ,res ,next){
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
})


app.use('/api/auth',authRoutes);

//secure routes
app.use('/api/blog/:user_id/',
        loginRequired,
        ensureCorrectUser,
        blogRoutes);

app.use('/api/admin',
        ensureAdmin,
        adminRoutes);


//handling error 
app.use(function(req ,res ,next){
    let err = new Error('Not Found!');
    err.status = 404;
    next(err);
})
app.use(errorHandler)

//listening to PORT 5000
app.listen(PORT ,()=>{
    console.log(`Server is running on port ${PORT}`);
})