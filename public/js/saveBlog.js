function saveToWatch(id){
    // console.log(id);
    axios.post('/api/blogs/save' , {id}).then(data => {
        // console.log(data);
        if(data.status == 200){
            // alert('Блог сохранен')
            alert(data.data)
            location.reload()
        }
    })
}

function deleteFromToWatch(id){
    // console.log(id);
    axios.delete(`/api/blogs/save/${id}`).then(data => {
        // console.log(data);
        if(data.status == 200){
            alert(data.data)
            location.reload()
        }
    })
}