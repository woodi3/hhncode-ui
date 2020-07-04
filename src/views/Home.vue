<template>
    <zen-box>

        <latest-posts :posts="latestPosts" 
            :loading="loading"
            :isAuthenticated="isAuthenticated" />

        <trending-posts :posts="trendingPosts" 
            :loading="loading" />

        <code-preview :posts="codePosts" 
            :loading="loading" 
            :isAuthenticated="isAuthenticated" />
        <!-- Trending posts -->
        <!-- <snapshot title="Trending" 
            bg="primary-dark"
            skew
            titleColorClass="text-white"
            dividerColor="primary-light" 
            :posts="trendingPosts" 
            :loading="loading"/> -->

        <!-- Album review for desktop -->
        <!-- <album-reviews class="hide-on-mobile hide-on-ipad" 
            :albumReviews="albumReviews" 
            :loading="loading"/> -->
        <!-- Album reviews for mobile and ipad -->
        <!-- <snapshot class="hide-on-desktop" 
            title="Recent Album Reviews"
            titleColorClass="text-black" 
            :posts="albumReviews"  
            :loading="loading" /> -->
        
        <!-- Tutorial snap shots for ipad and desktop -->
        <!-- <tutorial-snapshot 
            class="hide-on-mobile" 
            :tutorials="tutorials" 
            :loading="loading"/> -->
        
        <!-- Tutorial snap shot for mobile -->
        <!-- <snapshot class="hide-on-ipad hide-on-desktop"
            title="Recent Tutorials" 
            titleColorClass="text-black"
            :posts="tutorials" 
            :loading="loading"/> -->
    </zen-box>
</template>

<script>
import LatestPosts from '../components/LatestPosts'
import TrendingPosts from '../components/TrendingPosts'
import CodePreview from '../components/CodePreview'

// import Snapshot from '../components/Snapshot'
// import AlbumReviews from '../components/AlbumReviews'
// import TutorialSnapshot from '../components/TutorialSnapshot'

const LIMIT = 4

export default {
    components: {
        // Snapshot,
        // AlbumReviews,
        // TutorialSnapshot,
        LatestPosts,
        TrendingPosts,
        CodePreview,
    },
    data () {
        return {
            loading: true,
            trendingPosts: [],
            albumReviews: [],
            codePosts: [],
            latestPosts: [],
        }
    },
    mounted () {
        this.load()
    },
    computed: {
        isAuthenticated () {
            return this.$store.state.isAuthenticated
        },
    },
    methods: {
        async load () {
            try {
                this.loading = true

                const postResults = await Promise.all([
                    this.loadLatestPosts(),
                    this.loadTrendingPosts(), 
                    this.loadReviewPosts(), 
                    this.loadCodePosts(),
                    this.loadTutorialPosts(),
                ])

                this.latestPosts = [...postResults[0]]
                this.trendingPosts = [...postResults[1]]
                this.albumReviews = [...postResults[2]]
                this.codePosts = [...postResults[3], ...postResults[4]]
                
                this.loading = false
            } catch (err) {
                console.error(err)
            }
        },
        async loadLatestPosts () {
            const isAdmin = false
            const { success, posts } = await this.$postService.getPosts(isAdmin, { limit: 3 })
            return success ? posts : []
        },
        async loadCodePosts () {
            const isAdmin = false
            const { success, posts } = await this.$postService.getPosts(isAdmin, {limit: 3, isCode: true, isTutorial: false})
            return success ? posts : []
        },
        async loadTutorialPosts () {
            const isAdmin = false
            const { success, posts } = await this.$postService.getPosts(isAdmin, {limit: 3, isCode: true, isTutorial: true})
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