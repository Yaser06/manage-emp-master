import { useEffect, useState } from "react"
import axios from "axios";
const useGetItems = () => {
    const [state, setState] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8081/news')
            .then(function ({ data }) {
                console.log('news',data)
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
export default useGetItems