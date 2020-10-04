export const HOME = 'home'
export const HIPHOP = 'hiphop'
export const CODE = 'code'
export const TAG = 'tag'
export const ACCOUNT_SETTINGS = 'account-settings'
export const NEW_ACCOUNT = 'new-account'
export const UNSUBSCRIBE = 'unsubscribe'
export const ADMIN = 'admin'
export const LOGIN = 'login'
export const DASHBOARD = 'dashboard'
export const POSTS = 'posts'
export const USERS = 'users'
export const DETAIL = 'detail'
export const CREATE = 'create'
export const ADMIN_CATCH_ALL = 'admin-catch-all'
export const SEARCH = 'search'
export const PREVIEW = 'preview'
export const FEATURES = 'features'
export const QUOTES = 'quotes'
export const RECEIPTS = 'receipts'

// import AccountSettings from '../views/AccountSettings'
import Admin from '../views/Admin'
import AdminDetail from '../views/AdminDetail'
import AdminLogin from '../views/AdminLogin'
import AdminPosts from '../views/AdminPosts'
import AdminTags from '../views/AdminTags'
import AdminTutorials from '../views/AdminTutorials'
// import ClientLogin from '../views/ClientLogin'
import Unsubscribe from '../views/Unsubscribe'
import Create from '../views/Create'
import Dashboard from '../views/Dashboard'
import Detail from '../views/Detail'
import Hiphop from '../views/Hiphop'
import Home from '../views/Home'
// import NewAccount from '../views/NewAccount'
import Code from '../views/Code'
import Users from '../views/Users'
import Search from '../views/Search'
import Preview from '../views/Preview'
import AdminFeatures from '../views/AdminFeatures'
import AdminQuotes from '../views/AdminQuotes'
import AdminReceipts from '../views/AdminReceipts'


export const BASE_TITLE = 'HHnCode'

const routes = {
    [`${HOME}`]: {
        name: HOME,
        path: `/${HOME}`,
        component: Home,
        meta: {
            title: BASE_TITLE + ' | Home'
        },
    },
    [`${HIPHOP}`]: {
        name: HIPHOP,
        path: `/${HIPHOP}`,
        component: Hiphop,
        meta: {
            title: BASE_TITLE + ' | Hip Hop'
        },
    },
    [`${CODE}s`]: {
        name: `${CODE}`,
        path: `/${CODE}`,
        component: Code,
        meta: {
            title: BASE_TITLE + ' | Code'
        },
    },
    [`${DETAIL}`]: {
        name: `${DETAIL}`,
        path: `/${DETAIL}`,
        component: Detail,
        props: (route) => ({ 
            t: route.query.title, 
            i: route.query._id,
        }),
        meta: {
            setTitleOnLoad: true,
        },
    },
    // [`${ACCOUNT_SETTINGS}`]: {
    //     name: ACCOUNT_SETTINGS,
    //     path: `/${ACCOUNT_SETTINGS}`,
    //     component: AccountSettings,
    //     meta: {
    //         title: BASE_TITLE + ' | Account Settings'
    //     },
    // },
    // [`${NEW_ACCOUNT}`]: {
    //     name: NEW_ACCOUNT,
    //     path: `/${NEW_ACCOUNT}`,
    //     component: NewAccount,
    //     meta: {
    //         title: BASE_TITLE + ' | Join us'
    //     },
    // },
    // [`${LOGIN}`]: {
    //     name: LOGIN,
    //     path: `/${LOGIN}`,
    //     component: ClientLogin,
    //     meta: {
    //         title: BASE_TITLE + ' | Login'
    //     },
    // },
    [`${UNSUBSCRIBE}`]: {
        path: `/${UNSUBSCRIBE}`,
        name: UNSUBSCRIBE,
        component: Unsubscribe,
        props: (route) => ({ e: route.query.email}),
        meta: {
            title: BASE_TITLE + ' | Unsubscribe'
        },
    },
    [`${SEARCH}`]: {
        path: `/${SEARCH}`,
        name: SEARCH,
        component: Search,
        props: (route) => ({
            search: route.query.search
        }),
        meta: {
            title: BASE_TITLE + ' | Search'
        },
    },
    [`${ADMIN}`]: {
        path: `/${ADMIN}`,
        component: Admin,
        children: [
            {
                path: '',
                name: ADMIN,
                redirect: `/${ADMIN}/${LOGIN}`,
                meta: {
                    title: BASE_TITLE + ' | Admin Login'
                },
            },
            {
                path: `${LOGIN}`,
                name: `${ADMIN}-${LOGIN}`,
                component: AdminLogin,
                meta: {
                    title: BASE_TITLE + ' | Admin Login'
                },
            },
            {
                path: `${DASHBOARD}`,
                name: `${ADMIN}-${DASHBOARD}`,
                component: Dashboard,
                redirect: `/${ADMIN}/${DASHBOARD}/${POSTS}`,
                children: [
                    {
                        path: POSTS,
                        name: `${ADMIN}-${DASHBOARD}-${POSTS}`,
                        component: AdminPosts,
                        meta: {
                            title: BASE_TITLE + ' | Admin Posts'
                        },
                    },
                    {
                        path: `${CODE}`,
                        name: `${ADMIN}-${DASHBOARD}-${CODE}`,
                        component: AdminTutorials,
                        meta: {
                            title: BASE_TITLE + ' | Admin Code'
                        },
                    },
                    {
                        path: `${USERS}`,
                        name: `${ADMIN}-${DASHBOARD}-${USERS}`,
                        component: Users,
                        meta: {
                            title: BASE_TITLE + ' | Admin Users'
                        },
                    },
                    {
                        path: `${TAG}s`,
                        name: `${ADMIN}-${DASHBOARD}-${TAG}s`,
                        component: AdminTags,
                        meta: {
                            title: BASE_TITLE + ' | Admin Tags'
                        },
                    },
                    {
                        path: `${CREATE}`,
                        name: `${ADMIN}-${DASHBOARD}-${CREATE}`,
                        component: Create,
                        meta: {
                            title: BASE_TITLE + ' | Admin New Post'
                        },
                    },
                    {
                        path: `${PREVIEW}/:id`,
                        name: `${ADMIN}-${DASHBOARD}-${PREVIEW}`,
                        component: Preview,
                        meta: {
                            title: BASE_TITLE + ' | Admin Preview'
                        },
                    },
                    {
                        path: `${FEATURES}`,
                        name: `${ADMIN}-${DASHBOARD}-${FEATURES}`,
                        component: AdminFeatures,
                        meta: {
                            title: BASE_TITLE + ' | Admin Features'
                        },
                    },
                    {
                        path: `${DETAIL}/:postTitle`,
                        name: `${ADMIN}-${DASHBOARD}-${DETAIL}`,
                        component: AdminDetail,
                        meta: {
                            title: BASE_TITLE + ' | Admin Detail'
                        },
                    },
                    {
                        path: `${QUOTES}`,
                        name: `${ADMIN}-${DASHBOARD}-${QUOTES}`,
                        component: AdminQuotes,
                        meta: {
                            title: BASE_TITLE + ' | Admin Quotes'
                        },
                    },
                    {
                        path: `${RECEIPTS}`,
                        name: `${ADMIN}-${DASHBOARD}-${RECEIPTS}`,
                        component: AdminReceipts,
                        meta: {
                            title: BASE_TITLE + ' | Admin Receipts'
                        },
                    },
                ]
            },
        ]
    },
    [`${ADMIN_CATCH_ALL}`]: {
        path: `/admin*`,
        name: ADMIN_CATCH_ALL,
        redirect: `/${ADMIN}`,
        meta: {
            title: BASE_TITLE + ' | Admin'
        },
    }
} 

export default routes
