<template>
    <zen-box class="search">
        <zen-flex justify="center">
            <h2>Search all posts</h2>
        </zen-flex>
        <zen-flex class="search-container" justify="center" align="center">
            <zen-box f="0 0 50%">
                <zen-input-group class="mt-3">
                    <zen-input-element>
                        <span class="sr-only">Search</span>
                        <v-icon class="text-primary" :icon="['fas', 'search']"/>
                    </zen-input-element>
                    <zen-input
                        v-model="searchText"
                        variant="flushed" 
                        class="search-input" 
                        name="search" 
                        placeholder="Search content" 
                        type="text"
                        @input="handleSearch"
                    />
                    <zen-input-element position="right" v-if="searching">
                        <span class="sr-only">Searching</span>
                        <zen-spinner size="sm"/>
                    </zen-input-element>
                </zen-input-group>
            </zen-box>
        </zen-flex>

        <zen-flex justify="center" v-if="searchText.length > 0">
            <zen-text color="dark-gray">
                {{filteredPosts.length}} results returned
            </zen-text>
        </zen-flex>

        <filter-posts hideSearch
            :tags="tags"
            :selectedTags="selectedTags"
            :posts="filteredPosts"
            :tagsLoading="loadingTags"
            @toggleTag="toggleTag"
        />
    </zen-box>
</template>

<script>
import debounce from 'lodash.debounce'
import { HIDE_FOOTER_KEY } from '../store/nav'
import FilterPosts from '../components/FilterPosts'

const STATES = {
    TAGS: 'tags',
    SEARCHING: 'searching',
    NONE: 'none',
}

export default {
    components: {
        FilterPosts,
    },
    props: {
        search: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            searchText: '',
            state: STATES.NONE,
            posts: [],
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

        }
    },
    async mounted () {
        this.hideFooter()
        this.loadTags()
        if (this.search !== undefined && this.search.trim() !== '') {
            this.searchText = this.search
        }
        this._searchPosts()
    },
    beforeDestroy () {
        this.showFooter()
    },
    computed: {
        searching () {
            return this.state === STATES.SEARCHING
        },
        loadingTags () {
            return this.state === STATES.TAGS
        },
        filteredPosts () {
            const hasAll = this.enabled({_id: "all"})
            const posts = hasAll ? this.posts :
                this.posts.filter(p => 
                    p.tags.some(this.enabled)
                )
            
            return posts
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
        setState (val) {
            this.state = val
        },
        goToDetail(post) {
            this.$router.push({name: 'detail', query: {title: post.title, _id: post._id}})
        },
        handleSearch: debounce(function() {
            this._searchPosts()
        }, 300),
        async _searchPosts () {
            try {
                this.setState(STATES.SEARCHING)
                const {success, posts} = await this.$postService.search(this.searchText)
                if (success) {
                    this.posts = [...posts]
                }
                setTimeout(() => this.setState(STATES.NONE), 2500)
            } catch (err) {
                console.error(err)
            }
        },
        async loadTags () {
            try {
                this.setState(STATES.TAGS)
                const {success, tags} = await this.$tagService.getTags()
                this.tags =  success ? [...this.default,...tags] : []
                this.setState(STATES.NONE)
            } catch (err) {
                console.error(err)
            }
        },
    }
}
</script>
<style scoped>
</style>