import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
export const httpFetcher = async (url)=> {
    var data =  await axios.get(url);
    return data.data;
}

