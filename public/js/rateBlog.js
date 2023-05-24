function sendRate(e){
    e.preventDefault()
    // console.log('work');
    const comment_text = document.querySelector('#comment-text').value
    // console.log(comment_text , 'text');
    const author = document.querySelector('#comment_author').value
    const blog = document.querySelector('#comment_blog').value
    // console.log(author);
    // console.log(blog);
    if(comment_text.length > 0){
        // console.log(comment_text);
        // console.log(comment_text.length);
        axios.post('/api/rate' , {text: comment_text , authorId: author , blogId: blog}).then(data =>{
            // console.log(data);
            if(data.data){
                location.reload()
            }
        })
    }
}