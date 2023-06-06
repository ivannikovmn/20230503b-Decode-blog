function deleteRates(id, authorID){
    // console.log('work');
    axios.delete(`/api/rates/${id}`).then(data => {
        // console.log(data);
        if(data.status == 200){
            location.replace(`/admin/${authorID}`)
        }else if(data.status == 404){
            location.replace('/not-found')
        }
    })
    // console.log(id, authorID);
}