import { getAuthHeader } from '../utils'

export class CommentService {

    constructor(api) {
        this.api = api
    }

    async getComments(post) {
        let id
        if (typeof post === 'object') {
            id = post._id
        }
        else {
            id = post
        }
        let { data } = await this.api.get('comments', { postId: id })
        return data
    }

    async createComment(comment, token) {
        const { data } = await this.api.post('comment', comment, getAuthHeader(token))
        return data
    }

    async deleteComment(comment, token) {
        const { data } = await this.api.delete(`comment/${comment._id}`, {}, getAuthHeader(token))
        return data
    }
}