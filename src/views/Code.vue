<template>
    <zen-box class="code">
        <zen-box class="headline" h="600">
            <zen-box class="quote absolute center text-center">
                <h1 class="text-white">
                    {{quote.text}}
                </h1>
            </zen-box>
            
            <ripple-background />
        </zen-box>
        
        <filter-posts 
            v-model="searchVal"
            searchName="code-search"
            :tags="tags"
            :selectedTags="selectedTags"
            :posts="filteredPosts"
            :loading="loading"
            :invalidSearch="invalidSearch"
            :searchLoading="isSearching"
            @toggleTag="toggleTag"
            @search="startSearch"
       />


    </zen-box>
</template>

<script>
import FilterPosts from '../components/FilterPosts'
import RippleBackground from '../components/RippleBackground'
import { HIDE_FOOTER_KEY } from '../store/nav'

// minimum search characters
const MIN_SEARCH = 2

const LIMIT = 15

export default {
    components: {
        FilterPosts,
        RippleBackground,
    },
    data () {
        return {
            quote: {
                text: `Coding should be like a breath of fresh air.`
            },
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
            tutorialPosts: [],
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
            const posts = hasAll ? this.tutorialPosts :
                this.tutorialPosts.filter(p => 
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
        }
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
                )
            }
            return posts
        },
        async load () {
            try {
                this.loading = true
                this.tags = await this.loadTags()
                this.tutorialPosts = await this.loadPosts()
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
            const { success, posts } = await this.$postService.getPosts(false, { isTutorial: true, isCode: true, or: true, limit: LIMIT})
            return success ? posts : []
        },
    },
    
}
</script>

<style scoped>
.code > .headline {
    overflow: hidden;
    background-color: var(--twitter);
}
.code .headline > .img {
    width: 100%;
    height: 600px;
}
.code > .posts {
    width: 100%;
}
.quote > h1 {
    font-size: 64px;
}
.quote > p {
    font-size: 32px;
    font-style: italic;
    font-weight: bold;
}
.headline {
    position: relative;
}

@media screen and (max-width: 800px) {
    .quote > h1 {
        font-size: 3em;
    }
}
</style>