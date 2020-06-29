export class PrivacyPolicyService {

    constructor(api) {
        this.api = api
    }

    async get() {
        const { data } = await this.api.get('privacy-policy')
        return data
    }
}