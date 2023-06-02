function deleteBlogs(id, authorID){
    axios.delete(`/api/blogs/${id}`).then(data => {
        // console.log(data);
        if(data.status == 200){
            location.replace(`/admin/${authorID}`)
        }else if(data.status == 404){
            location.replace('/not-found')
        }
    })
    // console.log(id, authorID);
}