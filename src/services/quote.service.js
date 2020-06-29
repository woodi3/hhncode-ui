import { getAuthHeader } from "../utils"

export class QuoteService {

    constructor(api) {
        this.api = api
    }

    async getQuotes(query) {
        const { data } = await this.api.get('quotes', query)
        return data
    }

    async createQuote(newQuote, token) {
        const { data } = await this.api.post('quote', newQuote, getAuthHeader(token))
        return data
    }

    async deleteQuote(quote, token) {
        const { data } = await this.api.delete(`quote/${quote._id}`, {}, getAuthHeader(token))
        return data
    }
}