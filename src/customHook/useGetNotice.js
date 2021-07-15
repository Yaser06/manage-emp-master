import { useEffect, useState } from "react"
import axios from "axios";
const useGetNotice = () => {
    const [state, setState] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8081/notice')
            .then(function ({ data }) {
                console.log(data);
                // handle success
                setState(data);
            })
            .catch(function (error) {
                // handle error
                console.error(error);
            })
            .then(function () {
                // always executed
            });
    }, [])

    return state
}
export default useGetNotice