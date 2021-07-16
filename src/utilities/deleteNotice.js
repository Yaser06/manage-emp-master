import axios from "axios";
const deleteNotice=()=>{
   return (id,item)=> {
     const newItem={...item,status:false};
     console.log(newItem)
    return axios.put(`http://localhost:8081/notice/${id}`,newItem )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
   }
}
export default deleteNotice