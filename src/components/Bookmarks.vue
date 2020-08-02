<template>
    <bottom-sheet :isOpen="isOpen" 
        :loading="loading" 
        @close="close">
        <zen-box>
            <zen-box class="bookmark-header pl-10 pt-2 pb-2">
                <zen-text header="h6">
                    Bookmarks
                </zen-text>
            </zen-box>
            <app-loader v-if="loading" height="100%"/>
            <zen-flex v-else class="posts pt-2 pb-2" direction="row" wrap="wrap">
                <zen-box
                    f="0 0 33%"
                    p=".25rem"
                    responsive
                    v-for="post in posts"
                    :key="post._id">
                    <post-thumbnail :post="post" 
                        @click.native="goToDetail(post)"
                        @enterPressed="goToDetail(post)"/>
                </zen-box>
            </zen-flex>
        </zen-box>
    </bottom-sheet>
</template>

<script>
import PostThumbnail from './PostThumbnail'
import AppLoader from './AppLoader'
import BottomSheet from './BottomSheet'

export default {
    props: {
        posts: {
            type: Array,
        },
        isOpen: {
            type: Boolean,
        },
        loading: {
            type: Boolean,
        },
    },
    components: {
        PostThumbnail,
        AppLoader,
        BottomSheet,
    },
    methods: {
       goToDetail(post) {
            this.close()
            this.$nextTick(() => 
                this.$router.push({name: 'detail', query: {title: post.title, _id: post._id}})
            )
        }, 
        close () {
            this.$emit('close')
        },
    },
}
</script>

<style>
.posts {
    max-height: 799px;
    overflow-y: auto;
    padding-bottom: 5rem !important;
}
</style>