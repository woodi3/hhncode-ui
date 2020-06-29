<template>
    <zen-box class="snapshot pt-10 pb-10" 
        position="relative">
        <zen-box v-if="skew" class="snapshot-background skew" 
            position="absolute" 
            w="100%" 
            h="100%" 
            :bg="bg"></zen-box>
        <zen-box class="snapshot-content container">
            <zen-text class="uppercase text-center title" 
                header="h7"
                letterSpacing="2px"
                :class="[titleColorClass]">
                {{title}}
            </zen-text>
            <divider mt="32px" mb="32px" :color="dividerColor"/>
            <zen-grid spacing="40"
                minChildWidth="300px">
                <template v-if="loading">
                    <post-skeleton v-for="n in 3" 
                        class="post-thumbnail"
                        :key="n"/>
                </template>
                <template v-else>
                    <post-thumbnail v-for="post in posts"
                        class="post-thumbnail" 
                        :key="post._id"
                        :post="post" 
                        @click.native="goToDetail(post)"
                        @enterPressed="goToDetail(post)"/>
                </template>
            </zen-grid>
        </zen-box>
    </zen-box>
</template>

<script>
import PostThumbnail from './PostThumbnail'
import PostSkeleton from './PostSkeleton'
import Divider from './Divider'

export default {
    components: {
        PostThumbnail,
        Divider,
        PostSkeleton,
    },
    props: {
        posts: {
            type: Array,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        bg: {
            type: String
        },
        dividerColor: {
            type: String,
            default: "primary-dark",
        },
        loading: {
            type: Boolean,
        },
        titleColorClass: {
            type: String,
            default: 'text-white'
        },
        skew: {
            type: Boolean,
        }
    },
    methods: {
        goToDetail(post) {
            this.$router.push({name: 'detail', query: {title: post.title, _id: post._id}})
        }
    }
}
</script>
<style scoped>
.snapshot-background {
    top: 0;
    left: 0;
    z-index: -1;
}
.snapshot .container {
    min-width: 0;
}
.post-thumbnail {
    margin: 0 auto;
}
</style>