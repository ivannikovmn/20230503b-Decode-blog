function sendRate(e){
    e.preventDefault() //Отмена действия браузера по умолчанию, связанного с определенным событием
    // console.log('work');
    const comment_text = document.querySelector('#comment-text').value //текст комментария
    alert(comment_text);
    const author = document.querySelector('#comment_author').value
    const blog = document.querySelector('#comment_blog').value // blogId , sample: 6479f192fff4f183fb3df6b1
    // console.log(author);
    if(comment_text.length > 0){
        // console.log(comment_text);
        // console.log(comment_text.length);
        axios.post('/api/rate/new' , {text: comment_text , authorId: author , blogId: blog}).then(data =>{
            // console.log(data);
            if(data.data){
                location.reload()
            }
        })
    }
}