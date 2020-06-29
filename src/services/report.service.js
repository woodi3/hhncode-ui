export class ReportService {

    constructor(api) {
        this.api = api
    }

    async report(report) {
        const { data } = await this.api.post('report', report)
        return data
    }
}