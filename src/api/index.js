//import axios
import axios from "axios";

//buat instance Axios
const Api = axios.create({
  //gunakan baseURL utama
  baseURL: "http://localhost:8000/api/",
});

//export instance
export default Api;
