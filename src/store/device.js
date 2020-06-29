export const DEVICE_KEY = 'setDevice'

// MUTATIONS
const mutSetDevice = (state, device) => {
    state.device = device
}

// ACTIONS
const actSetDevice = (context, val) => {
    context.commit(DEVICE_KEY, val)
}
export default {
    state: {
        device: 'DESKTOP',
    },
    mutations: {
        [`${DEVICE_KEY}`]: mutSetDevice,
    },
    actions: {
        [`${DEVICE_KEY}`]: actSetDevice,
    },
    getters: {},
    modules: {},
}
