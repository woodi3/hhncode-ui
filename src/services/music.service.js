export class MusicService {
    constructor(api) {
        this.api = api
    }
    // TODO
    // make end point call to get developer token
    // call configure to get instance
    // get link to playlist and see if we can get the queue w/o authentication

    configure (config) {
        if (window.MusicKit) {
            window.MusicKit.configure(config)
            return true
        } 
        console.info('Music Kit not on window object.')
        return false
    }

    getMusicInstance() {
        if (this.musicInstance) {
            return this.musicInstance
        }
        return window.MusicKit.getInstance()
    }

    setMusicInstance (instance) {
        this.musicInstance = instance
    }

    async getDeveloperToken() {
        const { data } = await this.api.get('music/token')
        return data
    }
}