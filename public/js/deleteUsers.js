function deleteUsers(id){
    console.log('work');
    axios.delete(`/api/users/${id}`).then(data => {
        // console.log(data);
        if(data.status == 200){
            location.replace(`/admin/644256663458cfea90f6b427`)
        }else if(data.status == 404){
            location.replace('/not-found')
        }
    })
    console.log(id);
}
