<template>
    <zen-box class="tutorials">
        <zen-spinner class="spinner" v-if="loading" />
        <zen-flex v-else
            wrap="wrap"
            direction="row">
            <zen-box f="0 0 33%"
                pl=".25rem"
                pr=".25rem"
                mt=".25rem"
                mb=".25rem"
                v-for="post of tutorials"
                :key="post._id">
                <post-thumbnail :post="post" @click.native="edit(post)"/>
            </zen-box>
            <zen-box v-if="tutorials.length === 0" f="0 0 100%">
                <h3 class="text-center">No Tutorials</h3>
            </zen-box>
        </zen-flex>
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
            tutorials: []
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
        edit (tutorial) {
            this.$store.dispatch(INIT_POST_KEY, tutorial)
            this.$router.push('/admin/dashboard/create')
        },
        async loadPosts() {
            try {
                this.loading = true
                const {success, posts} = await this.$postService.getPosts(true, {isTutorial: true}, this.token)
                if (success) {
                    this.tutorials = [...posts]
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
.tutorials {
    max-height: 700px;
    overflow-y: auto;
}
.tutorials > .spinner {
    margin: 0 auto;
}
</style>