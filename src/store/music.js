export const MUSIC_INSTANCE_KEY = 'setMusicInstance'

// MUTATIONS
const mutSetMusicInstance = (state, instance) => {
    state.appleMusicInstance = instance
}
// ACTIONS
const actSetMusicInstance = (context, instance) => {
    context.commit(MUSIC_INSTANCE_KEY, instance)
}

export default {
    state: {
        appleMusicInstance: null,
    },
    mutations: {
        [`${MUSIC_INSTANCE_KEY}`]: mutSetMusicInstance,
    },
    actions: {
        [`${MUSIC_INSTANCE_KEY}`]: actSetMusicInstance,
    },
    getters: {},
    modules: {},
}
