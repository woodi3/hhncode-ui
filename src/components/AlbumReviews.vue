<template>
    <zen-box class="album-reviews pt-8 pb-8" v-if="albumReviews">
        <zen-box class="container">
            <zen-text class="uppercase text-center title" 
                header="h7"
                letterSpacing="2px">
                Recent Album Reviews
            </zen-text>
            <divider mt="32px" mb="32px"/>
            <zen-flex align="center">
                <zen-box w="40%" class="mr-4">
                    <zen-box v-if="loading">
                        <album-review-skeleton v-for="n in 3" :key="n"/>
                    </zen-box>
                    <zen-box v-else>
                        <album-review v-for="albumReview in albumReviews"
                            :key="albumReview._id" 
                            :albumReview="albumReview"
                            :isActive="isActive(albumReview)"
                            @mouseover="setActive(albumReview)"
                            @click="goToDetail(albumReview)"
                        />
                    </zen-box>
                </zen-box>
                <zen-box w="60%">
                    <zen-box v-if="loading" class="post-skeleton-img" h="600px" w="100%"></zen-box>
                    <img v-else-if="activeReview" 
                        class="post-img" 
                        :src="activeReview.headerImg"
                        :alt="getImageAltText(activeReview)" 
                        @click="goToDetail(activeReview)"/>
                </zen-box>
            </zen-flex>
        </zen-box>
    </zen-box>
</template>

<script>
import Divider from './Divider'
import AlbumReview from './AlbumReview'
import AlbumReviewSkeleton from './AlbumReviewSkeleton'

export default {
    props: {
        albumReviews: {
            type: Array,
            required: true
        },
        loading: {
            type: Boolean,
        },
    },
    components: {
        Divider,
        AlbumReviewSkeleton,
        AlbumReview,
    },
    data () {
        return {
            activeReview: null
        }
    },
    watch: {
        albumReviews (newVal) {
            if (!this.activeReview) {
                this.setActive(newVal[0])
            }
        }
    },
    methods: {
        setActive(albumReview) {
            this.activeReview = albumReview
        },
        isActive(albumReview) {
            if (!this.activeReview) return false
            return this.activeReview._id === albumReview._id
        },
        goToDetail(post) {
            this.$router.push({name: 'detail', query: {title: post.title, _id: post._id}})
        },
        getImageAltText (review) {
            return `Album cover for ${review.title}`
        },
    },
}
</script>

<style scoped>

.album-reviews h2 {
    margin: 0;
}
.album-reviews h4 {
    margin: 0px;
    padding-top: calc(var(--spacing-rem) * 4);
}

.post-img {
    width: 100%;
    max-height: 600px;
}
.post-img:hover {
    cursor: pointer;
}
</style>