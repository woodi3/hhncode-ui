import axios from 'axios'
import environment from '../../environment'

const BASE_URL = environment.BASE_API_URL
const TIMEOUT = 3000
const DEFAULT_POST_HEADERS = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export class ApiService {
    
    constructor(baseURL, timeout) {
        this.api = axios.create({
            baseURL: baseURL ? baseURL : BASE_URL,
            timeout: timeout ? timeout : TIMEOUT,
        })
    }

    get(endpoint, params, headers) {
        return this.api.request(
            {
                url: endpoint,
                method: 'get',
                params,
                headers: headers ? headers : {}
            }
        )
    }

    post(endpoint, data, headers) {
        const h = Object.assign({}, DEFAULT_POST_HEADERS.headers, headers ? headers : {}); 
        return this.api.request(
            {
                url: endpoint,
                method: 'post',
                data,
                headers: h
            }
        )
    }

    patch(endpoint, data, headers) {
        const h = Object.assign({}, DEFAULT_POST_HEADERS.headers, headers ? headers : {});
        return this.api.request(
            {
                url: endpoint,
                method: 'patch',
                data,
                headers: h
            }
        )
    }

    delete(endpoint, params, headers) {
        return this.api.request(
            {
                url: endpoint,
                method: 'delete',
                params,
                headers: headers ? headers : {}
            }
        )
    }

    static getUrl(endpoint) {
        return `${BASE_URL}${endpoint}`
    }
}