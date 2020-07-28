<template>
    <zen-box class="album-reviews pt-8 pb-8" v-if="albumReviews">
        <zen-flex class="container" wrap="wrap">
            <zen-box f="0 0 50%"
                bg="accent-light" 
                class="title-box"
                pt="8rem"
                pl="2rem" 
                responsive>
                <zen-text color="white" 
                    header="h1"
                    lineHeight="1"
                    transform="uppercase">Album Reviews</zen-text>
                <zen-button>
                    View More
                </zen-button>
            </zen-box>
            <zen-box f="0 0 50%" 
                d="flex" 
                flexDirection="row"
                flexWrap="wrap" 
                responsive>
                <zen-box f="0 0 50%"
                    v-for="albumReview in albumReviews"
                    :key="albumReview._id"
                    responsive
                    class="album-review"
                    position="relative">
                    <img :src="albumReview.headerImg" />
                    <zen-box class="album-review-title-container">
                        <zen-box class="text"
                            w="100%" 
                            h="100%"
                            position="relative">
                            <zen-text header="h6" class="album-review-title" bold color="black">
                                {{albumReview.title}}
                            </zen-text>
                        </zen-box>
                    </zen-box>
                </zen-box>
            </zen-box>
        </zen-flex>
        <!-- <zen-box class="container">
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
        </zen-box> -->
    </zen-box>
</template>

<script>
// import Divider from './Divider'
// import AlbumReview from './AlbumReview'
// import AlbumReviewSkeleton from './AlbumReviewSkeleton'

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
        // Divider,
        // AlbumReviewSkeleton,
        // AlbumReview,
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

.album-reviews .container {
    padding: .5rem;
}
.album-reviews > .container > .title-box {
    min-height: 600px;
}
.album-review {
    height: 300px;
}
.album-review:hover > .album-review-title-container {
    display: block;
    top: 0;
    left: 0;
    background-color: var(--gray-lighter-color);
    opacity: .75;
    cursor: pointer;
}
.album-review-title-container {
    display: none;
    position: absolute;
    height: 100%;
    width: 100%;
    
}
.album-review-title {
    position: absolute;
    bottom: calc(var(--spacing-rem) * 4);
    left: calc(var(--spacing-rem) * 2);
}
.album-review > img {
    height: 100%;
    width: 100%;
}
</style>