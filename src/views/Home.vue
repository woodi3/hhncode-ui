<template>
    <zen-box>
        <!-- Trending posts -->
        <snapshot title="Trending" 
            bg="primary-dark"
            skew
            titleColorClass="text-white"
            dividerColor="primary-light" 
            :posts="trendingPosts" 
            :loading="loading"/>

        <!-- Album review for desktop -->
        <album-reviews class="hide-on-mobile hide-on-ipad" 
            :albumReviews="albumReviews" 
            :loading="loading"/>
        <!-- Album reviews for mobile and ipad -->
        <snapshot class="hide-on-desktop" 
            title="Recent Album Reviews"
            titleColorClass="text-black" 
            :posts="albumReviews"  
            :loading="loading" />
        
        <!-- Tutorial snap shots for ipad and desktop -->
        <tutorial-snapshot 
            class="hide-on-mobile" 
            :tutorials="tutorials" 
            :loading="loading"/>
        
        <!-- Tutorial snap shot for mobile -->
        <snapshot class="hide-on-ipad hide-on-desktop"
            title="Recent Tutorials" 
            titleColorClass="text-black"
            :posts="tutorials" 
            :loading="loading"/>
    </zen-box>
</template>

<script>
import Snapshot from '../components/Snapshot'
import AlbumReviews from '../components/AlbumReviews'
import TutorialSnapshot from '../components/TutorialSnapshot'

const LIMIT = 4

export default {
    components: {
        Snapshot,
        AlbumReviews,
        TutorialSnapshot,
    },
    data () {
        return {
            loading: true,
            trendingPosts: [],
            albumReviews: [],
            tutorials: [],
        }
    },
    mounted () {
        this.load()
    },
    methods: {
        async load () {
            try {
                this.loading = true

                const postResults = await Promise.all([this.loadTrendingPosts(), this.loadReviewPosts(), this.loadTutorialPosts()])

                this.trendingPosts = [...postResults[0]]
                this.albumReviews = [...postResults[1]]
                this.tutorials = [...postResults[2]]

                this.loading = false
            } catch (err) {
                console.error(err)
            }
        },
        async loadTutorialPosts () {
            const isAdmin = false
            const { success, posts } = await this.$postService.getPosts(isAdmin, {limit: LIMIT, isTutorial: true})
            return success ? posts : []
        },
        async loadReviewPosts () {
            const isAdmin = false
            const { success, posts } = await this.$postService.getPosts(isAdmin, {limit: LIMIT, isReview: true})
            return success ? posts : []
        },
        async loadTrendingPosts () {
            const isAdmin = false
            const { success, posts } = await this.$postService.getPosts(isAdmin, {limit: LIMIT, isTrending: true})
            return success ? posts : []
        },
    }
    
}
</script>