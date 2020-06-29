// import { getAuthHeader } from '../utils'

export class LogService {

    constructor(api) {
        this.api = api
    }

    async log(err) {
        const obj = {}
        obj.stacktrace = err.stack
        obj.message = err.message
        obj.api = 'UI'
        obj.code = 'UI'
        obj.type = 'ERROR'
        await this.api.post('log', obj)
    }
}