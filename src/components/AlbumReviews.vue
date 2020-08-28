<template>
    <zen-box class="album-reviews pt-8 pb-8" v-if="albumReviews">
        <zen-box class="container" m="0 auto">
            <zen-text class="album-review-header mb-2" 
                header="h5" 
                transform="uppercase">Album Reviews</zen-text>
            <zen-flex wrap="wrap">
                <zen-box class="album-review"
                    d="flex" 
                    f="0 0 23%"
                    flexWrap="wrap"
                    justifyContent="center"
                    mt=".5rem"
                    mb=".5rem"
                    position="relative"
                    responsive
                    v-for="albumReview in albumReviews"
                    :key="albumReview._id">
                    <img class="br-md" 
                        :src="albumReview.headerImg" 
                        :alt="getImageAltText(albumReview)"/>
                    <zen-text class="album-review-title pl-2 pt-2"
                        align="center" 
                        fontSize="lg" 
                        bold>
                        {{albumReview.title}}
                    </zen-text>
                    <zen-button ariaLabel="Read button"
                        class="detail-btn mt-2"
                        @click="goToDetail(albumReview)">
                        <span class="mr-2">Read</span>
                        <v-icon :icon="['fas', 'chevron-right']"/>
                    </zen-button>
                </zen-box>
            </zen-flex>
        </zen-box>
    </zen-box>
</template>

<script>
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
.album-reviews > .container > .album-review-header {
    padding-left: 3rem;
}
.album-review {
    height: 300px;
    margin-right: 1rem;
}
.album-review > .album-review-title {
    flex: 0 0 100%;
}
.album-review > img {
    height: 100%;
    width: 100%;
    max-height: 225px;
    max-width: 225px;
    flex: 0 0 100%;
}
</style>