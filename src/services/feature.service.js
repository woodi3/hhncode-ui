import { getAuthHeader } from "../utils"

export class FeatureService {

    constructor(api) {
        this.api = api
    }

    async getFeatures() {
        const { data } = await this.api.get('features', {})
        return data
    }

    async createFeature(newFeature, token) {
        const { data } = await this.api.post('feature', newFeature, getAuthHeader(token))
        return data
    }

    async deleteFeature(feature, token) {
        const { data } = await this.api.delete(`feature/${feature._id}`, {}, getAuthHeader(token))
        return data
    }
}