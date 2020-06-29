import { getAuthHeader } from '../utils'

export class PostService {

    constructor(api) {
        this.api = api
    }

    async getPosts(isAdmin, query, token) {
        let result
        if (isAdmin) {
            result = await getPostsForAdmin(this.api, query, token)
        }
        else {
            result = await getPostsForClient(this.api, query)
        }
        return result.data
    }

    async getPost(post, token) {
        const { data } = await this.api.get(`post/admin`, {_id: post._id}, getAuthHeader(token))
        return data
    }

    async getPostForClient(query) {
        const { data } = await this.api.get(`post/client`, cleanQuery(query))
        return data
    }

    async createPost(post, token) {
        const { data } = await this.api.post('post', post, getAuthHeader(token))
        return data
    }
    
    async uploadImg(formData, token) {
        const { data } = await this.api.post('post/upload', formData, getAuthHeader(token))
        return data
    }

    async deletePost(post, token) {
        const { data } = await this.api.delete(`post/${post._id}`, {}, getAuthHeader(token))
        return data
    }

    async search (searchText) {
        const { data } = await this.api.get(`posts/search`, {title: searchText, 'meta.subtitle': searchText})
        return data
    }

    async incrementMetric (query, metricKey) {
        const { data } = await this.api.post(`post/metrics`, { query, metricKey })
        return data.success
    }

    async getBatchPosts (postIds) {
        const { data } = await this.api.post('posts/get/batch', { postIds })
        return data
    }
}

function cleanQuery (query) {
    const q = {}
    Object.keys(query).forEach(k => {
        if (query[k] !== '') {
            q[k] = query[k]
        }
    })
    return q
}

async function getPostsForAdmin(api, query, token) {
    return await api.get('posts', cleanQuery(query), getAuthHeader(token))
}

async function getPostsForClient(api, query) {
    return await api.get('posts/client', cleanQuery(query))
}