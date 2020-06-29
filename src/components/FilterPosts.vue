<template>
    <zen-box class="filter-posts">
        <zen-flex class="mt-6" justify="center" v-if="!hideSearch">
            <search 
                width="400px"
                v-model="searchVal"
                placeholder="Search"
                :name="searchName"
                :variant="searchVariant"
                :errorMessage="invalidSearch.message"
                :invalid="invalidSearch.invalid"
                :loading="searchLoading"
                @input="startSearch"
                />
        </zen-flex>

        <zen-flex style="width: 400px; margin: 0 auto;" v-if="tagsLoading" justify="center" wrap="wrap">
            <zen-box v-for="n in 6" :key="n" h="32px" w="96px" class="skeleton-badge m-1">
            </zen-box>
        </zen-flex>
        <badge-selection v-else
            flexBasis="50%"
            :items="tags" 
            :selection="selectedTags" 
            @toggle="toggleTag" />
        
        <zen-flex class="container posts mt-2 mb-2" direction="row" wrap="wrap">
            <template v-if="posts.length > 0">
                <zen-box
                    f="0 0 33%"
                    w="33%"
                    p=".25rem"
                    responsive
                    v-for="post in posts"
                    :key="post._id">
                    <post-thumbnail :post="post" @click.native="goToDetail(post)" @enterPressed="goToDetail(post)"/>
                </zen-box>
            </template>
            
            <zen-box f="0 0 100%" v-else>
                <h3 class="text-center">Nothing to show here!</h3>
            </zen-box>
        </zen-flex>
    </zen-box>
</template>

<script>
import Search from './Search'
import BadgeSelection from './BadgeSelection'
import PostThumbnail from './PostThumbnail'

export default {
    components: {
        Search,
        BadgeSelection,
        PostThumbnail,
    },
    props: {
        tags: {
            type: Array,
            required: true
        },
        selectedTags: {
            type: Array,
            default: () => []
        },
        posts: {
            type: Array,
            required: true
        },
        invalidSearch: {
            type: Object,
        },
        value: {
            required: false
        },
        searchName: {
            type: String,
            default: "search",
        },
        searchPlaceholder: {
            type: String,
            default: "Search",
        },
        searchWidth: {
            type: String,
            default: "400px"
        },
        searchVariant: {
            type: String,
            default: "flushed",
        },
        searchLoading: {
            type: Boolean,
        },
        postLoading: {
            type: Boolean,
        },
        tagsLoading: {
            type: Boolean,
        },
        hideSearch: {
            type: Boolean,
        },
    },
    data () {
        return {
            searchVal: '',
        }
    },
    methods: {
        toggleTag (tag) {
            this.$emit('toggleTag', tag)
        },
        startSearch (val) {
            this.$emit('input', val)
            this.$emit('search', val)
        },
        goToDetail(post) {
            this.$router.push({name: 'detail', query: {title: post.title, _id: post._id}})
        }
    }
}
</script>

<style scoped>
.skeleton-badge {
    animation: pulse-bg 1s infinite;
}

@keyframes pulse-bg {
    0% { background-color: #ddd; }
    50% { background-color: #d0d0d0; }
    100% { background-color: #ddd; }
}
</style>