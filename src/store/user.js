export const USER_KEY = 'setUser'

const LOCAL_STORAGE_USER = 'hhncode_user'
function getUser() {
    return localStorage.getItem(LOCAL_STORAGE_USER) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER)) : null
}
function setUser(user) {
    localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user))
}

// MUTATIONS
const mutSetUser = (state, user) => {
    state.user = {...user}
    setUser(user)
}

// ACTIONS
const actSetUser = (context, user) => {
    context.commit(USER_KEY, user)
}

//test user
// const user = {
//     name: 'Alex Wood',
//     email: 'wawood@email.sc.edu',
//     notify: true,
// }
const user = null

export default {
    state:{
        user: getUser() || user,
    },
    mutations: {
        [`${USER_KEY}`]: mutSetUser
    },
    actions: {
        [`${USER_KEY}`]: actSetUser
    },
    getters: {},
    modules: {},
}