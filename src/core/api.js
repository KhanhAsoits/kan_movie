import axios from "axios";
import {configs} from "./configs";

class API {

    constructor(base_url, token) {
        this.base_uri = base_url
        this.token = token;
    }


    async get(uri) {
        try {
            let url = this.base_uri + "/" + uri + "/" + this.token;
            console.log(url)
            return (await axios.get(url)).data
        } catch (e) {
            console.log(e)
        }
    }

    async post(uri, data, configs) {
        try {
            configs = {...configs, headers: {authorization: `Bearer ${this.token}`}}
            let url = this.base_uri + "/" + uri
            return await axios.post(url, data ? data : [], configs ? configs : {})
        } catch (e) {
            console.log(e)
        }
    }
}

const BaseAPI = new API(configs.api_en_base_uri, configs.token)
export default BaseAPI