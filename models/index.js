const mongoose = require('mongoose');

mongoose.set('debug',true);
mongoose.Promise = Promise;



mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true ,useUnifiedTopology: true});


module.exports.Blog = require('./blog');
module.exports.User = require('./user');
// module.exports.Product = require('./products');
// module.exports.Order = require('./orders');
// module.exports.Admin = require('./admin');