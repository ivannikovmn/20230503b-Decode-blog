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

module.exports = {
    saveRate
}