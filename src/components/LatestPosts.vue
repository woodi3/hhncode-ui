<template>
    <zen-flex class="latest-posts" align="center" justify="center">
        <zen-box f="0 0 50%" pl="1rem" pr="1rem" responsive>
            <zen-flex align="center" justify="space-between">
                <zen-text header="h5">Latest Posts</zen-text>
            </zen-flex>
            <template v-if="loading">
                <horizontal-post-skeleton v-for="n in 3"
                    :key="n"/>
            </template>
            <zen-box v-else>
                <horizontal-post-thumbnail v-for="post in posts" 
                    :post="post" 
                    :key="post._id" 
                    :isAuthenticated="isAuthenticated"
                    :bookmarked="bookmarked(post)"
                    @click="goToDetail(post)"
                    @enterPressed="goToDetail(post)"/>
            </zen-box>
        </zen-box>
    </zen-flex>
</template>

<script>
// import Logo from './Logo'
import HorizontalPostThumbnail from './HorizontalPostThumbnail'
import HorizontalPostSkeleton from './HorizontalPostSkeleton'

export default {
    props: {
        posts: {
            type: Array,
        },
        isAuthenticated: {
            type: Boolean,
        },
        loading: {
            type: Boolean,
        },
    },
    computed: {
        user () {
            return this.$store.state.user
        },
    },
    methods: {
        bookmarked (post) {
            return this.user && this.user.bookmarks && this.user.bookmarks.indexOf(post._id) > -1
        },
        goToDetail(post) {
            this.$router.push({name: 'detail', query: {title: post.title, _id: post._id}})
        },
    },
    components: {
        // Logo,
        HorizontalPostThumbnail,
        HorizontalPostSkeleton,
    },
}
</script>

<style scoped>
</style>