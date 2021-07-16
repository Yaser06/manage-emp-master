import axios from "axios";
const addNotice=()=>{
   return (item)=> axios.post('http://localhost:8081/notice', item)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
export default addNotice