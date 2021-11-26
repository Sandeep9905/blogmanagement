const express = require('express');
const router = express.Router({mergeParams:true});
const {createBlogs , updateBlog ,deleteBlog ,getAllBolgs ,getBlog} = require('../handlers/blog');


router.get('/:blog_id' , getBlog);
router.get('/getallblogs',getAllBolgs);
router.post('/create_blog', createBlogs);
router.put('/edit_blog/:blog_id' , updateBlog);
router.delete('/delete_blog/:blog_id',deleteBlog);

module.exports = router;

