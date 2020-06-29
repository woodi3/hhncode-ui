import { getAuthHeader } from '../utils'

export class SeriesService {

    constructor(api) {
        this.api = api
    }

    async getSeries(isAdmin, token) {
        let result
        if (isAdmin) {
            result = await getSeriesForAdmin(this.api, token)
        }
        else {
            result = await getSeriesForClient(this.api)
        }
        return result.series
    }

    async createSeries(post, token) {
        const { data } = await this.api.post('series', post, getAuthHeader(token))
        return data
    }

    async uploadImg(formData, token) {
        const { data } = await this.api.post('series/upload', formData, getAuthHeader(token))
        return data
    }

    async deleteSeries(post, token) {
        const { data } = await this.api.delete(`series/${post._id}`, {}, getAuthHeader(token))
        return data
    }
}

async function getSeriesForAdmin(api, token) {
    return await api.get('series', {}, getAuthHeader(token))
}

async function getSeriesForClient(api) {
    return await api.get('series/client')
}