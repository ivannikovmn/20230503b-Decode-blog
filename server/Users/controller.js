const User = require('../auth/User')

const editUser = (req , res) => {
    // console.log(req.params);
    console.log('work');
    console.log(req.body.full_name);
    // if(req.body.full_name
    //     ){
    //         // const rates = await Rate.findById(req.body.id)
    //         // // <1 cпособ редактирования>
    //         // // console.log(rates);
    //         // rates.text = req.body.text
    //         // rates.save()  
    //         // res.redirect('/admin/' + req.user._id) 
    //         // // </1 cпособ редактирования>
    //         // // --
    //         // // // <2 cпособ редактирования>
    //         // // await Rate.findByIdAndUpdate(req.body.id , {  
    //         // //     text: req.body.text,
    //         // //     // category: req.body.category,
    //         // //     // description: req.body.description,
    //         // //     // image: `/images/blogs/${req.file.filename}`,
    //         // //     author: req.user._id                        
    //         // // })                              
    //         // // res.redirect('/admin/' + req.user._id)  
    //         // // // </2 cпособ редактирования>                   
    // }else{
    //     res.redirect(`/edit_user/${req.body.id}?error=1`)
    // }
}

module.exports = {
    editUser
}