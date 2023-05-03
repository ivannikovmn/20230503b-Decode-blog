const Blog = require('./Blog')
const fs = require('fs')
const path = require('path')
const createBlog = async (req , res) =>  {
    // console.log(req.body);
    // res.send('ok')
    // console.log(req);
    if(req.file && req.body.title.length > 2 &&
        req.body.category.length > 2 &&
        req.body.description.length > 2)
    {
        await new Blog({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            image: `/images/blogs/${req.file.filename}`,
            author: req.user._id
        }).save()
        res.redirect(`/admin/${req.user._id}`)
        // res.redirect(`/new`)
    }else{
        res.redirect('/new?error=1')
    }
}

const editBlog = async (req , res) => {
    // console.log(req.params);
    if(req.file && req.body.title.length > 2 &&
        req.body.category.length > 2 &&
        req.body.description.length > 0
        ){
            const blogs = await Blog.findById(req.body.id)
            // console.log(blogs);
            fs.unlinkSync(path.join(__dirname + '../../../public' + blogs.image))
            blogs.title = req.body.title;
            blogs.category = req.body.category;
            blogs.description = req.body.description;
            blogs.image = `/images/blogs/${req.file.filename}`;
            blogs.author = req.user._id;
            blogs.save()  
            // await Blog.findByIdAndUpdate(req.body.id , {  
            //         title: req.body.title,
            //         category: req.body.category,
            //         description: req.body.description,
            //         image: `/images/blogs/${req.file.filename}`,
            //         author: req.user._id                        
            // })                              
            res.redirect('/admin/' + req.user._id)        
        }else{
            res.redirect(`/edit/${req.body.id}?error=1`)
        }
}

const deleteBlog = async(req , res) => {
    const blog = await Blog.findById(req.params.id)
    if(blog){
        fs.unlinkSync(path.join(__dirname + '../../../public' + blog.image))
        await Blog.deleteOne({_id: req.params.id})
        res.status(200).send('ok')
    }else{
        res.status(404).send('Not found')
    }
}

module.exports = {
    createBlog,
    editBlog,
    deleteBlog
}