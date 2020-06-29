<template>
    <zen-box class="music-player shadow-reg"
        :class="{'minimized': isMinimized}"
        position="fixed"
        bg="gray-dark"
        w="400px"
        :d="isMinimized ? 'flex' : 'block'"
        alignItems="center"
        :pt="isMinimized ? '1.25rem' : '.5rem'"
        :pr="isMinimized ? '.25rem' : '1rem'"
        :pb="isMinimized ? '.5rem' : '1rem'"
        pl="1rem">
        <zen-box v-if="!isMinimized" class="music-player-content">
            <zen-flex justify="flex-end">
                <zen-button color="plain" @click="minimize">
                    <v-icon class="text-white" :icon="['fas', 'minus']" size="sm"/>
                </zen-button>
            </zen-flex>
            <zen-flex class="inner mb-2" justify="center">
                <zen-text class="start text-center">Start</zen-text>
                <zen-box class="time text-center ml-2 mr-2">
                    TODO this will be the time indicator
                </zen-box>
                <zen-text class="end text-center">End</zen-text>
            </zen-flex>
            <zen-flex class="song" justify="center">
                <!-- <zen-text fontSize="lg" bold>{{nowPlaying.title}}</zen-text> -->
            </zen-flex>
            <zen-flex class="artist" justify="center">
                <zen-text bold color="light-gray">
                    <!-- {{nowPlaying.artistName}} &#8212; {{nowPlaying.}} -->
                </zen-text>
            </zen-flex>
            <!-- <zen-box class="minimize" position="absolute">
                <zen-button size="lg">
                    <v-icon class="text-white" :icon="['fas', 'compress']" size="sm"/>
                </zen-button>
            </zen-box> -->
            <zen-box class="play" position="absolute">
                <zen-button color="accent" size="lg" @click="play">
                    <v-icon class="text-white" :icon="['fas', 'play']" size="sm"/>
                </zen-button>
            </zen-box>
        </zen-box>
        <zen-box class="minimize-container mt-1" v-else>
            <zen-box class="song-ticker">
                <zen-text>
                    TODO when minimized create a ticker for the music
                </zen-text>
            </zen-box>
            <zen-box class="maximize-btn-container">
                <zen-button class="mr-1" color="plain-accent">
                    <v-icon class="text-white" :icon="['fas', 'play']" size="sm"/>
                </zen-button>
                <zen-button color="plain-accent" @click="maximize">
                    <v-icon class="text-white" :icon="['fas', 'window-maximize']" size="sm"/>
                </zen-button>
            </zen-box>
            <!-- <zen-box class="play" position="absolute">
                <zen-button color="accent" size="lg">
                    <v-icon class="text-white" :icon="['fas', 'play']" size="sm"/>
                </zen-button>
            </zen-box> -->
        </zen-box>
        
    </zen-box>
</template>

<script>

const PLAYLIST_URL = `https://music.apple.com/us/playlist/boom-boom-boom/pl.u-kv9lbmmTLglmZq`

const MEDIA_STATES = {
    PLAY: 'play',
    PAUSE: 'pause',
    STOP: 'stop',
}

export default {
    data () {
        return {
            isMinimized: false,
            queue: null,
            mediaState: MEDIA_STATES.STOP,
            currentSong: null,
        }
    },
    mounted () {
        this.setQueue()
    },
    computed: {
        musicInstance () {
            return this.$musicService.musicInstance
        },
        playing () {
            return this.mediaState === MEDIA_STATES.PLAY
        },
        paused () {
            return this.mediaState === MEDIA_STATES.PAUSE
        },
        stopped () {
            return this.mediaState === MEDIA_STATES.STOP
        },
        player () {
            return this.musicInstance.player
        },
        nowPlaying () {
            return this.player.currentMediaItem
        },
    },
    methods: {
        minimize () {
            this.isMinimized = true
        },
        maximize () {
            this.isMinimized = false
        },
        setMediaState (state) {
            this.mediaState = state
        },
        async play () {
            try {
                console.log(this.musicInstance.isAuthorized)
                if (!this.musicInstance.isAuthorized) {
                    const userToken = await this.musicInstance.authorize()
                    this.musicInstance.musicUserToken = userToken
                }
                await this.musicInstance.play()
                this.setMediaState(MEDIA_STATES.PLAY)
                console.log(this.currentMediaItem)
            } catch (err) { 
                console.info('Error Playing')
                console.error(err)
            }
        },
        pause () {
            try {
                this.setMediaState(MEDIA_STATES.PAUSE)
                this.musicInstance.pause()
            } catch (err) { 
                console.info('Error Pausing')
                console.error(err)
            }   
        },
        stop () {
            try {
                this.setMediaState(MEDIA_STATES.STOP)
                this.musicInstance.stop()
            } catch (err) { 
                console.info('Error Stopping')
                console.error(err)
            }   
        },
        async setQueue () {
            try {
                this.queue = await this.musicInstance.setQueue({ url: PLAYLIST_URL })
                this.queue.shuffle()
                this.musicInstance.player.queue = this.queue
            } catch (err) {
                console.log(err)
            }
        },
    }
}
</script>

<style scoped>
.music-player {
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    border-radius: .5rem;
    transition: padding .75s ease-in, transform .5s ease-in;
}
.music-player-content {
    position: relative;
}
.play {
    margin-bottom: -24px;
    right: 0;
    margin-right: -24px;
    bottom: 0;
}
.minimized {
    right: 16px !important;
    left: inherit;
    transform: none;
    /* height: 40px; */
    width: 360px;
}
.maximize-btn-container {
    top: 0;
    right: 0;
    position: absolute;
}
.minimize-container {
    width: 360px;
    overflow: hidden;
}
.song-ticker {
    width: 600px;
}
</style>