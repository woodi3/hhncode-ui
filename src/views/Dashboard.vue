<template>
    <zen-drawer
      :isOpen="navOpen">
      <zen-drawer-nav class="text-center uppercase">
        <drawer-nav :links="links"
          :currentRoute="currentRoute"
          :hideActionButton="currentRoute.name === 'admin-dashboard-create'"
          actionButtonText="New Post"
          @close="toggleNav"
          @actionClicked="create" />
      </zen-drawer-nav>
      <zen-drawer-content>
        <mobile-nav @toggle="toggleNav" hideSearch/>
        <router-view />
      </zen-drawer-content>
    </zen-drawer>
</template>

<script>
import DrawerNav from '../components/DrawerNav'
import MobileNav from '../components/MobileNav'
import { INIT_POST_KEY, defaultPost } from '../store/create'

export default {
    components: {
        DrawerNav,
        MobileNav,
    },
    data () {
        return {
            navOpen: true,
            links: [
                {
                    label: 'Posts',
                    to: '/admin/dashboard/posts',
                },
                {
                    label: 'Tutorials',
                    to: '/admin/dashboard/code',
                },
                {
                    label: 'Tags',
                    to: '/admin/dashboard/tags',
                },
                {
                    label: 'Users',
                    to: '/admin/dashboard/users',
                },
                {
                    label: 'Receipts',
                    to: '/admin/dashboard/receipts',
                },
                {
                    label: 'Features',
                    to: '/admin/dashboard/features',
                },
                {
                    label: 'Quotes',
                    to: '/admin/dashboard/quotes',
                },
                
            ]
        }
    },
    computed: {
        currentRoute () {
            return this.$store.state.currentRoute
        },
    },
    methods: {
        toggleNav () {
            this.navOpen = !this.navOpen
        },
        create () {
            this.$store.dispatch(INIT_POST_KEY, defaultPost)
            this.navigateTo('/admin/dashboard/create')
        },
        navigateTo (path) {
            this.$router.push(path)
        }
    }
}
</script>