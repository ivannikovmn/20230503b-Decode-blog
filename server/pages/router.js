const express = require('express')
const router = express.Router();
const Categories = require('../Categories/Categories')
const User = require('../auth/User')
const Blog = require('../Blogs/Blog')

router.get('/', async(req , res) => {
    const options = {}
    const categories = await Categories.findOne({key : req.query.category})
    // console.log(categories);
    if(req.query.category){ 
        // options.category = req.query.categ
        options.category  = categories._id
        res.locals.category = req.query.category
    }
    let page = 0
    const limit = 3
    if(req.query.page && req.query.page > 0){
        page = req.query.page
    }
    if(req.query.search && req.query.search.length > 0){
        options.$or = [
            {
                title: new RegExp(req.query.search , 'i')
            },
            {
                description: new RegExp(req.query.search , 'i')
            }
        ]
        res.locals.search = req.query.search
    }    
    // const totalBlogs = await Blog.count(options)
    const totalBlogs = await Blog.count(options)
    // console.log(totalBlogs);
    // console.log(options);
    // console.log(req.query); // чтобый достать 0 из http://localhost:3000/?categ=0
    const allCategories = await Categories.find()
    const blogs = await Blog.find(options).limit(limit).skip(page * limit).populate('category').populate('author')
    res.render("index" , {categories: allCategories , user: req.user ?  req.user: {} , blogs , pages: Math.ceil(totalBlogs / limit)})
})

router.get('/login' , (req , res) =>{
    res.render("login" , {user: req.user ?  req.user: {}})
})

router.get('/register' , (req , res) =>{
    res.render("register" , {user: req.user ?  req.user: {}})
})

router.get('/profile/:id' , async(req , res) =>{
    const user = await User.findById(req.params.id)
    // console.log(user);
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

router.get('/detail/:id' , async(req , res) =>{
    const allCategories = await Categories.find()
    const blog = await Blog.findById(req.params.id).populate('category').populate('author')
    res.render("detail" , {categories: allCategories, user: req.user ?  req.user: {} , blog: blog})
})

module.exports = router