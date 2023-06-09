const express = require('express')
const router = express.Router();
const Categories = require('../Categories/Categories')
const User = require('../auth/User')
const Blog = require('../Blogs/Blog')
const Rate = require('../Rates/Rates')

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
    const user = req.user ? await User.findById(req.user._id)
    // .populate('toWatch')
    // .populate({path: 'toWatch' , populate: {path: 'category'}})
    // .populate({path: 'toWatch' , populate: {path: 'author'}}) 
    : {}    
    res.render("index" , {categories: allCategories , user , blogs , pages: Math.ceil(totalBlogs / limit)})
})

router.get('/login' , (req , res) =>{
    res.render("login" , {user: req.user ?  req.user: {}})
})

router.get('/register' , (req , res) =>{
    res.render("register" , {user: req.user ?  req.user: {}})
})

router.get('/profile/:id' , async(req , res) =>{
    const user = await User.findById(req.params.id).populate('toWatch')
    .populate({path: 'toWatch' , populate: {path: 'category'}})
    .populate({path: 'toWatch' , populate: {path: 'author'}})
    if (user){
        res.render("profile", { user: user, loginUser: req.user})
        // console.log(user);
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
    //const rates = await Rate.find().populate('authorId') //перестал работать, убрал
    const rates = await Rate.find()
    const users = await User.find()
    res.render("adminProfile" , {loginUser: req.user ?  req.user: {} , user: user, blogs, rates, users})
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

router.get('/edit_comment/:id' , async(req , res) =>{
    const allCategories = await Categories.find()
    const blog = await Blog.findById(req.params.id)
    const rate = await Rate.findById(req.params.id)
    res.render("editComment" , {categories: allCategories, user: req.user ?  req.user: {} , blog , rate})
})

router.get('/edit_user/:id' , async(req , res) =>{
    const allCategories = await Categories.find()
    const blog = await Blog.findById(req.params.id)
    const user = await User.findById(req.params.id)
    res.render("editUser" , {categories: allCategories, user: req.user ?  req.user: {} , blog , user})
})

router.get('/block_user/:id' , async(req , res) =>{
    const allCategories = await Categories.find()
    const blog = await Blog.findById(req.params.id)
    const user = await User.findById(req.params.id)
    res.render("blockUser" , {categories: allCategories, user: req.user ?  req.user: {} , blog , user})
})

router.get('/not-found', (req , res) => {
    res.render("notFound")
})

router.get('/detail/:id' , async(req , res) =>{
    const rates = await Rate.find({blogId: req.params.id}).populate('authorId')
    // console.log(rates);
    const allCategories = await Categories.find()
    const blog = await Blog.findById(req.params.id).populate('category').populate('author')
    res.render("detail" , {categories: allCategories, user: req.user ?  req.user: {} , blog: blog , rates: rates})
})

module.exports = router