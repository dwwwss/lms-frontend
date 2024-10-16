import axios from "axios";
import { BASE_URL } from "./apiconstants";

export default function Api(path , method ,data , headers ={}){
    const token = localStorage.getItem("token")
    return axios({
        url : path,
        method: method,
        baseURL: BASE_URL,
        data: data,
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
          },
    })
    .then(response =>{
        return response.data;
    })
    .catch(error =>{
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
    })
}