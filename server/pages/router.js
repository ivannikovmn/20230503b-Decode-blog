const express = require('express')
const router = express.Router();
const Categories = require('../Categories/Categories')
const User = require('../auth/User')
const Blog = require('../Blogs/Blog')

router.get('/', async(req , res) => {
    const allCategories = await Categories.find()
    const blogs = await Blog.find().populate('category').populate('author')
    res.render("index" , {categories: allCategories , user: req.user ?  req.user: {} , blogs})
})

router.get('/login' , (req , res) =>{
    res.render("login" , {user: req.user ?  req.user: {}})
})

router.get('/register' , (req , res) =>{
    res.render("register" , {user: req.user ?  req.user: {}})
})

router.get('/profile/:id' , async(req , res) =>{
    const user = await User.findById(req.params.id)
    console.log(user);
    // console.log(req.user , '==profile');
    // res.render("profile", {user: req.user ?  req.user: {}})
    // if (user.full_name.length > 0){
    // console.log(user._id);
    // console.log(req.user._id);
    if (user){
        res.render("profile", { user: user, loginUser: req.user})
    }else{//не работает пока        
            res.redirect('/not-found') 
            // res.render('/not-found') 
        }
})

router.get('/admin/:id', async(req, res) => {
    // console.log(req.user , '--- admin');
    // res.render("adminProfile" , {user: req.user ?  req.user: {}})
    const user = await User.findById(req.params.id)
    const blogs = await Blog.find().populate('category').populate('author')
    res.render("adminProfile" , {loginUser: req.user ?  req.user: {} , user: user, blogs})
})

router.get('/new' , async(req , res) =>{
    // console.log(req.user , '--new');
    const allCategories = await Categories.find()
    res.render("newBlog" , {categories: allCategories, user: req.user ?  req.user: {}})
})

router.get('/edit/:id' , async(req , res) =>{
    const allCategories = await Categories.find()
    const blog = await Blog.findById(req.params.id)
    res.render("editBlog" , {categories: allCategories, user: req.user ?  req.user: {} , blog})
})

router.get('/not-found', (req , res) => {
    res.render("notFound")
})

router.get('/detail/:id' , (req , res) =>{
    res.render("detail" , {user: {}})
})

////

router.get('/card_noreg' , async(req , res) =>{
    const allCategories = await Categories.find()
    res.render("card_noreg" , {categories: allCategories , user: {}})
})
module.exports = router