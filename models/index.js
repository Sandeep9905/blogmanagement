const mongoose = require('mongoose');

mongoose.set('debug',true);
mongoose.Promise = Promise;


let url = 'mongodb+srv://blogwala:sandeep123@cluster0.t7iak.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(url, {useNewUrlParser: true ,useUnifiedTopology: true});


module.exports.Blog = require('./blog');
module.exports.User = require('./user');
// module.exports.Product = require('./products');
// module.exports.Order = require('./orders');
// module.exports.Admin = require('./admin');