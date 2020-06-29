import Vue from 'vue'
import Vuex from 'vuex'
import authStore from './auth'
import userStore from './user'
import navStore from './nav'
import createStore from './create'
import deviceStore from './device'
import featuresStore from './features'
// import musicStore from './music'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...navStore.state,
    ...userStore.state,
    ...authStore.state,
    ...createStore.state,
    ...deviceStore.state,
    ...featuresStore.state,
    // ...musicStore.state,
  },
  mutations: {
    ...navStore.mutations,
    ...authStore.mutations,
    ...userStore.mutations,
    ...createStore.mutations,
    ...deviceStore.mutations,
    ...featuresStore.mutations,
    // ...musicStore.mutations,
  },
  actions: {
    ...authStore.actions,
    ...userStore.actions,
    ...navStore.actions,
    ...createStore.actions,
    ...deviceStore.actions,
    ...featuresStore.actions,
    // ...musicStore.actions,
  },
  modules: {
    ...authStore.modules,
    ...userStore.modules,
    ...navStore.modules,
    ...createStore.modules,
    ...deviceStore.modules,
    ...featuresStore.modules,
    // ...musicStore.modules,
  }
})
