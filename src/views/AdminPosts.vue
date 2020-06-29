<template>
    <zen-box class="posts">
        <zen-spinner class="spinner" v-if="loading" />

        <zen-box v-else>
            <zen-flex
            wrap="wrap"
            direction="row">
                <zen-box f="0 0 33%"
                    pl=".25rem"
                    pr=".25rem"
                    mt=".25rem"
                    mb=".25rem"
                    v-for="post of posts"
                    :key="post._id">
                    <post-thumbnail :post="post" @click.native="edit(post)" showTrend/>
                </zen-box>
                <zen-box v-if="posts.length === 0" f="0 0 100%">
                    <h3 class="text-center">No Posts</h3>
                </zen-box>
            </zen-flex>
        </zen-box>

        
    </zen-box>
</template>

<script>
import PostThumbnail from '../components/PostThumbnail'
import { INIT_POST_KEY } from '../store/create'

export default {
    components: {
        PostThumbnail,
    },
    data () {
        return {
            loading: false,
            posts: []
        }
    },
    mounted () {
        this.loadPosts()
    },
    computed: {
        token () {
            return this.$store.state.token
        }
    },
    methods: {
        edit (post) {
            this.$store.dispatch(INIT_POST_KEY, post)
            this.$router.push('/admin/dashboard/create')
        },
        async loadPosts() {
            try {
                this.loading = true
                const {success, posts} = await this.$postService.getPosts(true, {}, this.token)
                if (success) {
                    this.posts = posts.filter(p => !p.isTutorial)
                }
                this.loading = false
            } catch (err) {
                this.loading = false
            }
        }
    }
}
</script>

<style scoped>
.posts {
    max-height: 700px;
    overflow-y: auto;
}
.posts > .spinner {
    margin: 0 auto;
}
</style>