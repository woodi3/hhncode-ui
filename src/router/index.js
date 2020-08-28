import Vue from 'vue'
import VueRouter from 'vue-router'
import routeDefs, {ADMIN, DETAIL, BASE_TITLE } from './routes'
import { HIDE_NAV_KEY, CURRENT_ROUTE_KEY, LAST_ROUTE_KEY } from '../store/nav'
import store from '../store'
import NotFoundRoute from '../views/404.vue'

Vue.use(VueRouter)

// root route
const rootRoute = {
  path: '/',
  title: BASE_TITLE,
  redirect: routeDefs.home.path
}

//route array
const routes = []
routes.push(rootRoute)

// add the routes
Object.keys(routeDefs).forEach(routeKey => {
  routes.push(routeDefs[routeKey])
})

const notFoundRoute = {
  path: '/*',
  name: '404',
  component: NotFoundRoute
}
routes.push(notFoundRoute)

// create the router
const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return desired position
    if (to.name === DETAIL) {
      return { x: 0, y: 0 }
    }
    return savedPosition
  }
})

// if route is admin route, hide the client nav
router.beforeEach((to, from, next) => {
  if (to.name.indexOf(ADMIN) > -1) {
    store.dispatch(HIDE_NAV_KEY, true)
  }
  store.dispatch(CURRENT_ROUTE_KEY, to)
  store.dispatch(LAST_ROUTE_KEY, from)
  if (to.meta && !to.meta.setTitleOnLoad) {
    Vue.nextTick(() => {
      document.title = to.meta.title || BASE_TITLE;
    });
  }

  next()
})

export default router
