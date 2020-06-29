import { getAuthHeader } from '../utils'

export class AdminService {

    constructor(api) {
        this.api = api
    }

    async login(credentials) {
        const { data } = await this.api.post('admin/login', credentials)
        if (data.success) {
            return data.access_token
        }
        return ''
    }

    async checkToken(token) {
        const { data } = await this.api.get('admin/checkToken', {}, getAuthHeader(token))
        return data.success
    }

    async redirect(token, next, passRoute, failRoute) {
        try {
            const isAuthenticated = await this.checkToken(token)
            if (isAuthenticated) {
                if (passRoute) {
                    next(passRoute)
                }
                else {
                    next()
                }
            }
            else {
                if (failRoute) {
                    next(failRoute)
                }
                else {
                    next()
                }
            }
        } catch (err) {
            if (failRoute) {
                next(failRoute)
            }
            else {
                next()
            }
        }
    }
}