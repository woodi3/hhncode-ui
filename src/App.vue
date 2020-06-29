<template>
  <div id="app">
    <app-loader v-if="loading"/>
    <template v-else-if="error">
      <h3>Some error</h3>
    </template>
    <template v-else>
      <client-nav v-if="!hideNav && !isAdmin && !mobile" class="hide-on-mobile"/>
      <zen-box v-if="!isAdmin && !mobile" mt="84px" class="hide-on-mobile">
        <transition name="fade">
          <router-view />
        </transition>
      </zen-box>
      <zen-box v-else-if="isAdmin" mt="16px" ref="admin">
        <router-view />
      </zen-box>
      <zen-drawer
        v-if="!isAdmin && !tablet && !desktop" 
        class="hide-on-ipad hide-on-desktop"
        :isOpen="sideNavOpen"
        overlay>
        <zen-drawer-nav class="text-center uppercase">
          <drawer-nav :links="links" 
            :isAuthenticated="isAuthenticated"
            actionButtonText="Join Us"
            :hideActionButton="isAuthenticated" 
            :currentRoute="currentRoute"
            @close="toggleNav" 
            @navigate="toggleNav"
            @actionClicked="navigateTo('/new-account')"/>
        </zen-drawer-nav>
        <zen-drawer-content>
          <mobile-nav @toggle="toggleNav" @searchClicked="navigateTo({name: 'search'}, false)"/>
          <transition name="fade">
            <router-view />
          </transition>
        </zen-drawer-content>
      </zen-drawer>
      <footer-component v-if="!hideFooter && !isAdmin"/>
    </template>
  </div>
</template>

<script>
import Nav from './components/Nav'
import MobileNav from './components/MobileNav'
import DrawerNav from './components/DrawerNav'
import FooterComponent from './components/FooterComponent'
import AppLoader from './components/AppLoader'

// import MusicPlayer from './components/MusicPlayer'

import {OPEN_NAV_KEY} from './store/nav'
import { IS_AUTHENTICATED_KEY } from './store/auth'

import { getDevice, DEVICE_ENUM } from './services/resize.service'
import { USER_KEY } from './store/user'
import { DEVICE_KEY } from './store/device'
import { FEATURES_KEY } from './store/features'
// import { MUSIC_INSTANCE_KEY } from './store/music'

const STATES = {
  LOADING: 'loading',
  NONE: 'none',
  ERROR: 'error',
}

export default {
  components: {
    "client-nav": Nav,
    MobileNav,
    DrawerNav,
    FooterComponent,
    AppLoader,
    // MusicPlayer,
  },
  data () {
    return {
      state: STATES.LOADING,
    }
  },
  async mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.handleDeviceSize)
      this.handleDeviceSize()
    })
    await this.load()
    
  },
  computed: {
    hideNav () {
      return this.$store.state.hideNav
    },
    hideFooter () {
      return this.$store.state.hideFooter
    },
    sideNavOpen () {
      return this.$store.state.sideNavOpen
    },
    currentRoute () {
      return this.$store.state.currentRoute ? this.$store.state.currentRoute : {path: ''}
    },
    isAuthenticated () {
      return this.$store.state.isAuthenticated
    },
    links () {
      return this.$store.state.links
    },
    isAdmin () {
      return this.currentRoute.path.indexOf('admin') > -1
    },
    loading () {
      return this.state === STATES.LOADING
    },
    error () {
      return this.state === STATES.ERROR
    },
    token () {
      return this.$store.state.token
    },
    device () {
      return this.$store.state.device
    },
    mobile () {
      return this.device === DEVICE_ENUM.MOBILE
    },
    tablet () {
      return this.device === DEVICE_ENUM.TABLET
    },
    desktop () {
      return this.device === DEVICE_ENUM.DESKTOP
    },
    user () {
      return this.$store.state.user
    },
  },
  methods: {
    toggleNav () {
      this.$store.dispatch(OPEN_NAV_KEY, !this.sideNavOpen)
    },
    navigateTo (path, toggle=true) {
      this.$router.push(path)
      if (toggle) {
        this.toggleNav()
      }
    },
    handleDeviceSize () {
      const device = getDevice()
      this.$store.dispatch(DEVICE_KEY, device)
    },
    setState (state) {
      this.state = state
    },
    async load () {
      try {
        this.setState(STATES.LOADING)

        await this.setAuthentication()
        // await this.loadAppleMusicDeveloperToken()
        await this.loadFeatures()

        setTimeout(() => this.setState(STATES.NONE), 1500)

      } catch (err) {
        this.setState(STATES.NONE) 
        // this.state = STATES.ERROR
      }
    },
    async setAuthentication () {
      try {
        let isAuthenticated;
        if (this.isAdmin) {
          isAuthenticated = await this.$adminService.checkToken(this.token)
        } 
        else {
          const { success, user } = await this.$userService.checkToken(this.token)
          isAuthenticated = success
          this.$store.dispatch(USER_KEY, user)
        }
        
        this.$store.dispatch(IS_AUTHENTICATED_KEY, isAuthenticated)
      } catch (err) {
        //console.log(err)
      }
    },
    async loadFeatures () {
      const {success, features} = await this.$featureService.getFeatures()
      if (success) {
          this.$store.dispatch(FEATURES_KEY, features)
      }
    },
    
    // async loadAppleMusicDeveloperToken () {
    //   const { success, token } = await this.$musicService.getDeveloperToken()
    //   if (success) {
    //      const appleMusicConfig = {
    //       developerToken: token,
    //       app: {
    //         name: 'Hip Hop and Code Apple Music Access',
    //         build: '2020.06.09'
    //       }
    //     }
    //     const didConfigure = this.$musicService.configure(appleMusicConfig)
    //     if (didConfigure) {
    //       this.$musicService.setMusicInstance(this.$musicService.getMusicInstance())
    //     }
    //   }
    // },
    axeRun (querySelector) {
      if (this.$axe) {
        this.$axe.run({
          element: querySelector ? document.querySelector(querySelector) : document,
          clearConsole: true,
        })
      }
    },
  }
}
</script>

<style>

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease-in;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}

@media screen and (max-width: 800px) {
  .hide-on-mobile {
    display: none;
  }
}
@media screen and (min-width: 800px) and (max-width: 1023px) {
  .hide-on-ipad {
    display: none;
  }
}
@media screen and (min-width: 1024px) {
  .hide-on-desktop {
    display: none;
  }
}
</style>
