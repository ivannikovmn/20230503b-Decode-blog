const express = require('express')
const router = express.Router()
const {upload} = require('./multer')
const {createBlog , editBlog, deleteBlog} = require('./controller')
const {isAuth} = require('../auth/middlewares')

// router.post('/api/new' , (req , res) =>{
//     res.send('ok')
// })
// router.post('/api/new' , createBlog)
// router.post('/api/new' , upload.single('image') , (req , res) =>{
//     console.log(req.body);
//     res.send('ok')
// })
router.post('/api/blogs/new' , isAuth , upload.single('image') , createBlog)
router.post('/api/blogs/edit' , isAuth, upload.single('image') , editBlog)
router.delete('/api/blogs/:id' , isAuth, deleteBlog)

module.exports = router