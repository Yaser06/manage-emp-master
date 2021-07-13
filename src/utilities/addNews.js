import axios from "axios";
const addNews=()=>{
   return (item)=> axios.post('http://localhost:8081/news', item)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
export default addNews