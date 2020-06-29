export const INIT_POST_KEY = 'setPost'

// MUTATIONS
const mutSetPost = (state, post) => {
    state.post = {...post}
}
// ACTIONS
const actSetPost = (context, post) => {
    context.commit(INIT_POST_KEY, post)
}

export const DEFAULT_HEADER = 'https://via.placeholder.com/500x500'

export const defaultPost = {
    _id: null,
    title: '',
    headerImg: DEFAULT_HEADER,
    content: '',
    tags: [],
    comments: [],
    isTutorial: false,
    isDraft: true,
    isTrending: false,
    isReview: false,
    views: 0,
    totalReads: 0,
    totalWords: 0,
    totalViews: 0,
}

export default {
    state: {
        post: defaultPost,
    },
    mutations: {
        [`${INIT_POST_KEY}`]: mutSetPost,
    },
    actions: {
        [`${INIT_POST_KEY}`]: actSetPost,
    },
    getters: {},
    modules: {},
}
