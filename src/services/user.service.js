import { getAuthHeader } from '../utils'

export class UserService {

    constructor(api) {
        this.api = api
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

    async getUsers(token) {
        const { data } = await this.api.get('users', {}, getAuthHeader(token))
        return data
    }

    async getUser (token) {
        const { data } = await this.api.get('user', {}, getAuthHeader(token))
        return data
    }

    /**
     * Admin - Create a user
     * @param {User} user 
     * @param {string} token 
     */
    async createUser(user, token) {
        const { data } = await this.api.post('user', user, getAuthHeader(token))
        return data
    }
    /**
     * Register a user
     * @param {User} user 
     */
    async registerUser(user) {
        const { data } = await this.api.post('user/register', user)
        return data
    }

    async updateUser(user, token) {
        const { data } = await this.api.patch('user', user, getAuthHeader(token))
        return data
    }

    async validatePassword(email, password, token) {
        const { data } = await this.api.post('user/validate', { email, password }, getAuthHeader(token))
        return data
    }

    /**
     * Subscribe a user
     * @param {User} user 
     */
    async subscribe(user) {
        const { data } = await this.api.post('user/subscribe', user)
        return data.success
    }

    async charge(quantity) {
        const { data } = await this.api.post('user/charge', quantity)
        return data
    }

    async deleteUser(isAdmin, query, token) {
        if (isAdmin) {
            const { data } = await this.api.delete(`user/admin`, query, getAuthHeader(token))
            return data
        } else {
            const { data } = await this.api.delete(`user/client`, query, getAuthHeader(token))
            return data
        }
    }
    async unsubscribe (query) {
        const { data } = await this.api.post(`user/unsubscribe`, query)
        return data
    }

    async checkToken(token) {
        const { data } = await this.api.get('user/checkToken', {}, getAuthHeader(token))
        return data
    }

    async login(credentials) {
        const { data } = await this.api.post('user/login', credentials)
        return data
    }
}