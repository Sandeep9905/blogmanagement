require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./handlers/error');
const blogRoutes = require('./routes/blog'); 
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const {loginRequired , ensureCorrectUser} = require('./middleware/auth');
const {ensureAdmin} = require('./middleware/admin');

const PORT = process.env.PORT || 5000;
app.use(cors());

// to  get req.body data in API
app.use(
    express.urlencoded({
      extended: true
    })
  )
app.use(express.json());

//all routes

app.use('/api/auth',authRoutes);

app.use('/api/blog/:user_id',
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