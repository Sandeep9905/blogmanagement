require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.ensureAdmin = function(req ,res ,next){
    try{
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token , process.env.SECRET_KEY , function(err ,decoded){
         if(decoded && decoded.status == 2 && decoded.role == 'ADMIN'){
              return next()
         }else{
             return next({
                 status:401 ,
                 message:'Unauthorized!!!!'
             });
         }
      })
    }catch(err){
        return next({
            status:401 ,
            message:'Unauthorized!!!!'
        });
    }
}