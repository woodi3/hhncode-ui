export const IS_AUTHENTICATED_KEY = 'setIsAuthenticated'
export const TOKEN_KEY = 'setToken'
export const REDIRECT_KEY = 'setRedirect'

// MUTATIONS
const mutSetIsAuthenticated = (state, val) => {
    state.isAuthenticated = val
    if (!val) {
        clearStorage()
    }
}

const mutSetToken = (state, token) => {
    state.token = token

    setToken(token)
}

const mutSetRedirect = (state, redirect) => {
    state.redirect = {...redirect}
}

// ACTIONS
const actSetIsAuthenticated = (context, val) => {
    context.commit(IS_AUTHENTICATED_KEY, val)
}
const actSetToken = (context, token) => {
    context.commit(TOKEN_KEY, token)
}
const actSetRedirect = (context, redirect) => {
    context.commit(REDIRECT_KEY, redirect)
}

const LOCAL_STORAGE_TOKEN = 'hhncode_token'
function getToken () {
    return getFromLocalStorage(LOCAL_STORAGE_TOKEN)
}
function setToken(token) {
    setLocalStorage(LOCAL_STORAGE_TOKEN, token)
}
const LOCAL_STORAGE_USER = 'hhncode_user'
function clearStorage() {
    setToken('')
    setLocalStorage(LOCAL_STORAGE_USER, '')
}

function getFromLocalStorage(key){
    return localStorage.getItem(key)
}
function setLocalStorage(key, val) {
    localStorage.setItem(key, val)
}

export default {
    state: {
        isAuthenticated: false,
        token: getToken() || null,
        redirect: null,
    },
    mutations: {
        [`${IS_AUTHENTICATED_KEY}`]: mutSetIsAuthenticated,
        [`${TOKEN_KEY}`]: mutSetToken,
        [`${REDIRECT_KEY}`]: mutSetRedirect,
    },
    actions: {
        [`${IS_AUTHENTICATED_KEY}`]: actSetIsAuthenticated,
        [`${TOKEN_KEY}`]: actSetToken,
        [`${REDIRECT_KEY}`]: actSetRedirect,
    },
    getters: {},
    modules: {},
}
