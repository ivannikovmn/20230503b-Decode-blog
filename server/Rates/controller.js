const Rate = require('./Rates')

const saveRate = async(req , res) => {
    // console.log(req.body);
    if(req.body.authorId && req.body.blogId)
    new Rate({
        text: req.body.text,
        authorId: req.body.authorId,
        blogId: req.body.blogId,
        date: Date.now()
    }).save()
    // res.send('ok')
    res.status(200).send(true)
}

const editRate = async (req , res) => {
    // console.log(req.params);
    console.log(req.body.text.length);
    if(req.body.text.length > 0
        ){
            const rates = await Rate.findById(req.body.id)
            // <1 cпособ редактирования>
            console.log(rates);
            rates.text = req.body.text
            rates.save()  
            res.redirect('/admin/' + req.user._id) 
            // </1 cпособ редактирования>
            // --
            // // <2 cпособ редактирования>
            // await Rate.findByIdAndUpdate(req.body.id , {  
            //     text: req.body.text,
            //     // category: req.body.category,
            //     // description: req.body.description,
            //     // image: `/images/blogs/${req.file.filename}`,
            //     author: req.user._id                        
            // })                              
            // res.redirect('/admin/' + req.user._id)  
            // // </2 cпособ редактирования>                  
        }else{
            res.redirect(`/edit_comment/${req.body.id}?error=1`)
        }
}


// const deleteFromRate = async(req , res) => {
//     if(req.user && req.params.id){
//         // const user = await User.findById(req.user.id)
//         // console.log(user);
//         console.log('work');
//         res.send('ok')
//         // for(let i = 0; i < user.toWatch.length; i++){
//         //     if(user.toWatch[i] == req.params.id){
//         //         user.toWatch.splice(i , 1)
//         //         user.save()
//         //         res.send('Успешно удалено')
//         //     }
//         // }
//         // res.send('Данные не найдены')
//     }
// }

module.exports = {
    saveRate, 
    editRate 
}