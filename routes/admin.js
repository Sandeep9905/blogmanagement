const express = require('express');
const router = express.Router({mergeParams:true});
const {allBlogs , allContentWriter , addContentWriter, editContentWriter , deleteContentWriter ,approveBlogs} = require('../handlers/admin');


router.get('/allblogs', allBlogs);
router.get('/allcontent_writer', allContentWriter);

router.post('/addcontent_writer', addContentWriter);
router.put('/editContent_writer/:user_id', editContentWriter);
router.delete('/:user_id' , deleteContentWriter);
router.put('/:blogid' , approveBlogs);
// router.delete('');


module.exports = router;