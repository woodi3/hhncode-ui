export const FEATURES_KEY = 'setFeatures'

// MUTATIONS
const mutSetFeatures = (state, features) => {
    state.features = [...features]
}
// ACTIONS
const actSetFeatures = (context, features) => {
    context.commit(FEATURES_KEY, features)
}

export default {
    state: {
        features: null,
    },
    mutations: {
        [`${FEATURES_KEY}`]: mutSetFeatures,
    },
    actions: {
        [`${FEATURES_KEY}`]: actSetFeatures,
    },
    getters: {},
    modules: {},
}
