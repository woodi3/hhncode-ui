<template>
    <zen-box class="hip-hop">
        <zen-box class="headline" h="600">
            <img class="img" src="https://picsum.photos/seed/rand40/1000/600" alt="Background image for hip hop"/>
            <zen-box class="quote absolute center text-center" v-if="quote">
                <h1 class="text-white">
                    {{quote.text}}
                </h1>
                <p class="text-white">
                    - {{quote.author}}
                </p>
            </zen-box>
        </zen-box>

       <filter-posts 
        v-model="searchVal"
        searchName="hiphop-search"
        :tags="tags"
        :selectedTags="selectedTags"
        :posts="filteredPosts"
        :invalidSearch="invalidSearch"
        :searchLoading="isSearching"
        :loading="loading"
        :isAuthenticated="isAuthenticated"
        @toggleTag="toggleTag"
        @search="startSearch"
       />

    </zen-box>
</template>

<script>
import FilterPosts from '../components/FilterPosts'
import { HIDE_FOOTER_KEY } from '../store/nav'

// minimum search characters
const MIN_SEARCH = 2
const LIMIT = 15

export default {
    components: {
        FilterPosts
    },
    data () {
        return {
            quote: null,
            isSearching: false,
            startedSearching: false,
            loading: false,
            searchVal: '',
            tags: [],
            default: [
                {
                    _id: 'all',
                    text: 'All',
                    color: 'gray'
                },
            ],
            selectedTags: [
                {
                    _id: 'all',
                    text: 'All',
                    color: 'gray'
                },
            ],
            hiphopPosts: [],
        }
    },
    mounted () {
        this.hideFooter()
        this.load()
    },
    beforeDestroy () {
        this.showFooter()
    },
    computed: {
        filteredPosts () {
            const hasAll = this.enabled({_id: "all"})
            const posts = hasAll ? this.hiphopPosts :
                this.hiphopPosts.filter(p => 
                    p.tags.some(this.enabled)
                )
            
            if (this.invalidSearch.invalid) {
                return posts
            }
            return this.filterBySearch(posts)
        },
        invalidSearch () {
            return {
                invalid: this.searchVal.length < MIN_SEARCH && this.startedSearching,
                message: `Search needs at least 2 characters`
            }
        },
        isAuthenticated () {
            return this.$store.state.isAuthenticated
        },
    },
    methods: {
        hideFooter () {
            this.$store.dispatch(HIDE_FOOTER_KEY, true)
        },
        showFooter () {
            this.$store.dispatch(HIDE_FOOTER_KEY, false)  
        },
        toggleTag (tag) {
            // find tag
            const idx = this.getIdx(tag)
            if (idx > -1) {
                // deselct
                this.disableTag(idx)
                if (this.selectedTags.length === 0) {
                    this.resetTags()
                }
            }
            else {
                if (tag._id !== "all") {
                    const all = {_id: "all"}
                    
                    if (this.enabled(all)) {
                        const allIdx = this.getIdx(all)
                        this.disableTag(allIdx)
                    }
                     // select
                    this.selectedTags.push(tag)
                }
                else {
                    this.resetTags()
                }
            }
        },
        resetTags () {
            this.selectedTags = [
                {
                    _id: 'all',
                    text: 'All',
                    color: 'gray'
                }
            ]
        },
        disableTag (idx) {
            // deselct
            this.selectedTags.splice(idx, 1)
        },
        getIdx (tag) {
            return this.selectedTags.findIndex(t => t._id === tag._id)
        },
        enabled (tag) {
            return this.getIdx(tag) > -1
        },
        startSearch () {
            this.startedSearching = true
        },
        filterBySearch (posts) {
            const search = this.searchVal.toLowerCase()
            if (search.length > 0) {
                return posts.filter(p => 
                    (p.title.toLowerCase().indexOf(search) > -1 )
                    || (this.hasSubtitle(p) && p.meta.subtitle.toLowerCase().indexOf(search) > -1)
                )
            }
            return posts
        },
        hasSubtitle (post) {
            return post.meta && post.meta.subtitle
        },
        async load () {
            try {
                this.loading = true
                const results = await Promise.all([
                    this.loadQuote(), 
                    this.loadPosts(), 
                    this.loadTags()
                ])
                this.quote = results[0]
                this.hiphopPosts = results[1]
                this.tags = results[2]
                this.loading = false
            } catch (err) {
                console.log(err)
            }
        },
        async loadTags () {
            const {success, tags} = await this.$tagService.getTags()
            return success ? [...this.default,...tags] : []
        },
        async loadPosts () {
            const { success, posts } = await this.$postService.getPosts(false, { isHipHop: true, limit: LIMIT })
            return success ? posts : []
        },
        async loadQuote () {
            const { success, quotes } = await this.$quoteService.getQuotes({active: true})
            return success ? quotes[0] : null
        },
    },
    
}
</script>

<style scoped>
.hip-hop .headline > .img {
    width: 100%;
    height: 600px;
}
.hip-hop > .posts {
    width: 100%;
    max-height: 500px;
    overflow-y: auto;
}
.headline {
    position: relative;
}
.quote > h1 {
    font-size: 64px;
}
.quote > p {
    font-size: 32px;
    font-style: italic;
    font-weight: bold;
}
@media screen and (max-width: 800px) {
    .quote > h1 {
        font-size: 3em;
    }
    .quote > p {
        font-size: 1.25rem;
        font-style: italic;
        font-weight: bold;
    }
}
</style>