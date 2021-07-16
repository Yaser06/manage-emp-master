import axios from "axios";
const updateNews=()=>{
   return (id,item)=> axios.put(`http://localhost:8081/notice/${id}`, item)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
export default updateNews