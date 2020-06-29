import { getAuthHeader } from "../utils"

export class TagService {

    constructor(api) {
        this.api = api
    }

    async getTags() {
        const { data } = await this.api.get('tags', {})
        return data
    }

    async createTag (newTag, token) {
        const { data } = await this.api.post('tag', newTag, getAuthHeader(token))
        return data
    }

    async deleteTag(tag, token) {
        const { data } = await this.api.delete(`tag/${tag._id}`, {}, getAuthHeader(token))
        return data
    }
}