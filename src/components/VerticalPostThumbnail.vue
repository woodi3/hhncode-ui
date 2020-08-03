<template>
    <card :width="width"
        class="post-thumbnail text-center text-black"
        @keydown.native="handleKeydown"
        @click.native="handleClick">
        <img class="post-thumbnail-img" 
            :src="post.headerImg" 
            :alt="getAltTextForHeaderImg(post)"
            :title="getAltTextForHeaderImg(post)"/>
        <zen-flex justify="center">
            <badge v-for="tag in post.tags"
            class="ml-1 mt-3 mb-3 mr-1" 
            :key="tag._id"
            :text="tag.text"
            :color="tag.color"/>
        </zen-flex>
        <h3 class="mt-3 mb-3 post-title">{{post.title}}</h3>
        <zen-text v-if="post.meta && post.meta.subtitle" 
            class="post-subtitle mt-2 mb-2"
            italic>
            {{post.meta.subtitle}}
        </zen-text>
        <zen-text class="created" fontSize="sm">
            {{timeAgo(post.createdAt)}}
        </zen-text>
        <zen-box v-if="showTrend && post.isTrending" class="trend">
            <v-icon class="text-accent" :icon="['fas', 'poll-h']" />
        </zen-box>
        <zen-box v-if="post.isDraft" class="draft">
            <v-icon class="text-primary" :icon="['fas', 'pencil-ruler']" />
        </zen-box>
        <zen-box v-if="isAuthenticated && bookmarked" 
            class="bookmark"
            title="Post is bookmarked">
            <span class="sr-only">Bookmark icon</span>
            <v-icon class="text-accent" :icon="[ 'fas', 'bookmark']"/>
        </zen-box>
    </card>
</template>

<script>
import Badge from './Badge'
import Card from './Card'

export default {
    props: {
        post: {
            type: Object,
            required: true
        },
        width: {
            type: String,
            default: "300px"
        },
        showTrend: {
            type: Boolean,
        },
        isAuthenticated: {
            type: Boolean,
        },
        bookmarked: {
            type: Boolean
        },
    },
    components: {
        Badge,
        Card,
    },
    methods: {
        timeAgo (date) {
            const a = this.$dayjs()
            const b = this.$dayjs(date)
            return b.from(a)
        },
        handleKeydown ({ key, keyCode }) {
            if (key === 'Enter' || keyCode === 13) {
                this.$emit('enterPressed')
            }
        },
        handleClick () {
            this.$emit('click')
        },
        getAltTextForHeaderImg (post) {
            return `Header image for post titled: ${post.title}`
        },
    }
}
</script>

<style scoped>
.post-thumbnail {
    margin: 0 auto;
    position: relative;
}
.post-thumbnail:hover {
    cursor:pointer;
    box-shadow: 0 calc(var(--spacing-rem) / 2) var(--spacing-rem) 0 var(--shadow-rgb);
}
.post-thumbnail:focus {
    cursor:pointer;
    box-shadow: 0 calc(var(--spacing-rem) / 2) var(--spacing-rem) 0 var(--shadow-rgb);
    outline: none;
}
.post-thumbnail-img {
    width: 100%;
    max-height: 200px;
}
.draft {
    position: absolute;
    bottom: calc(var(--spacing-rem) * 3);
    right: calc(var(--spacing-rem) * 3);
}
.trend {
    position: absolute;
    bottom: calc(var(--spacing-rem) * 3);
    left: calc(var(--spacing-rem) * 3);
}
.bookmark {
    position: absolute;
    bottom: calc(var(--spacing-rem) * 3);
    right: calc(var(--spacing-rem) * 3);
}
</style>