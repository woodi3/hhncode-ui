import { getAuthHeader } from "../utils"

export class ReceiptService {

    constructor(api) {
        this.api = api
    }

    async getReceipts(query, token) {
        const { data } = await this.api.get('receipts', query, getAuthHeader(token))
        return data
    }

    async createReceipt(newReceipt, token) {
        const { data } = await this.api.post('receipt', newReceipt, getAuthHeader(token))
        return data
    }

    async deleteReceipt(receipt, token) {
        const { data } = await this.api.delete(`receipt/${receipt._id}`, {}, getAuthHeader(token))
        return data
    }
}