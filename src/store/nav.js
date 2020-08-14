export const HIDE_NAV_KEY = 'setHideNav'
export const HIDE_FOOTER_KEY = 'setHideFooter'
export const CURRENT_ROUTE_KEY = 'setCurrentRoute'
export const LAST_ROUTE_KEY = 'setLastRoute'
export const OPEN_NAV_KEY = 'setOpenNav'

// MUTATIONS
const mutSetHideNav = (state, val) => {
    state.hideNav = val
}
const mutSetHideFooter = (state, val) => {
    state.hideFooter = val
}
const mutSetCurrentRoute = (state, route) => {
    state.currentRoute = route
}
const mutSetLastRoute = (state, route) => {
    state.lastRoute = route
}
const mutSetOpenNav = (state, val) => {
    state.sideNavOpen = val
}

// ACTIONS
const actSetHideNav = (context, val) => {
    context.commit(HIDE_NAV_KEY, val)
}
const actSetHideFooter = (context, val) => {
    context.commit(HIDE_FOOTER_KEY, val)
}
const actSetCurrentRoute = (context, route) => {
    context.commit(CURRENT_ROUTE_KEY, route)
}
const actSetLasttRoute = (context, route) => {
    context.commit(LAST_ROUTE_KEY, route)
}
const actSetOpenNav = (context, val) => {
    context.commit(OPEN_NAV_KEY, val)
}

export default {
    state: {
        hideNav: false,
        hideFooter: false,
        currentRoute: null,
        lastRoute: null,
        sideNavOpen: false,
        links: [
            {
                label: 'Home',
                to: '/home',
            },
            {
                label: 'Hip Hop',
                to: '/hiphop',
            },
            {
                label: 'Code',
                to: '/code',
            },
            {
                label: 'Account',
                icon: ['fas', 'user'],
                to: '/account-settings',
                authCheck: true,
                accent: true,
                end: true,
            },
        ]
    },
    mutations: {
        [`${HIDE_NAV_KEY}`]: mutSetHideNav,
        [`${CURRENT_ROUTE_KEY}`]: mutSetCurrentRoute,
        [`${LAST_ROUTE_KEY}`]: mutSetLastRoute,
        [`${OPEN_NAV_KEY}`]: mutSetOpenNav,
        [`${HIDE_FOOTER_KEY}`]: mutSetHideFooter,
    },
    actions: {
        [`${HIDE_NAV_KEY}`]: actSetHideNav,
        [`${CURRENT_ROUTE_KEY}`]: actSetCurrentRoute,
        [`${LAST_ROUTE_KEY}`]: actSetLasttRoute,
        [`${OPEN_NAV_KEY}`]: actSetOpenNav,
        [`${HIDE_FOOTER_KEY}`]: actSetHideFooter,
    },
    getters: {},
    modules: {},
}