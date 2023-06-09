const express = require('express')
const router = express.Router()
const {upload} = require('./multer')
const {createBlog , editBlog, deleteBlog, saveBlog , deleteFromToWatch} = require('./controller')
const {isAuth , isAdmin} = require('../auth/middlewares')

// router.post('/api/new' , (req , res) =>{
//     res.send('ok')
// })
// router.post('/api/new' , createBlog)
// router.post('/api/new' , upload.single('image') , (req , res) =>{
//     console.log(req.body);
//     res.send('ok')
// })
router.post('/api/blogs/new' , isAdmin , upload.single('image') , createBlog)
router.post('/api/blogs/edit' , isAdmin, upload.single('image') , editBlog)
router.delete('/api/blogs/:id' , isAdmin, deleteBlog)
router.post('/api/blogs/save' , isAuth , saveBlog)
router.delete('/api/blogs/save/:id' , isAuth , deleteFromToWatch)

module.exports = router