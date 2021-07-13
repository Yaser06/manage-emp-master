import axios from "axios";
const deleteNews=()=>{
   return (id,item)=> {
     const newItem={...item,status:false};
     console.log(newItem)
    return axios.put(`http://localhost:8081/news/${id}`,newItem )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
   }
}
export default deleteNews