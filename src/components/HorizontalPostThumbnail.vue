<template>
    <zen-box
        class="horizontal-post mt-4 mb-4"
        position="relative"
        tabIndex="0"
        @keydown.native="handleKeydown"
        @click.native="handleClick">
        <zen-flex class="horizontal-post-container">
            <zen-box f="0 0 33%" class="text-center post-img-container">
                <img :src="post.headerImg" :alt="headerImgAltText">
            </zen-box>
            <zen-box f="0 0 67%" class="post-content pl-2 pt-4">
                <zen-text class="post-title" header="h7">{{post.title}}</zen-text>
                <zen-text v-if="post.meta && post.meta.subtitle" 
                    class="subtitle mt-2 mb-2"
                    italic>
                    {{post.meta.subtitle}}
                </zen-text>
                <badge v-for="tag in post.tags"
                    class="ml-1 mt-3 mb-3 mr-1" 
                    :key="tag._id"
                    :text="tag.text"
                    :color="tag.color" />
            </zen-box>
        </zen-flex>
        <zen-box v-if="isAuthenticated && bookmarked" 
            class="bookmark"
            title="Post is bookmarked">
            <span class="sr-only">Bookmark icon</span>
            <v-icon class="text-accent" :icon="[ 'fas', 'bookmark']"/>
        </zen-box>
    </zen-box>
</template>
<script>
import Badge from './Badge'

export default {
    components: {
        Badge,
    },
    props: {
        isAuthenticated: {
            type: Boolean,
        },
        bookmarked: {
            type: Boolean,
        },
        post: {
            type: Object,
        },
        maxHeight: {
            type: String,
            default: ""
        },
    },
    computed: {
        headerImgAltText () {
            return `${this.post.title} header image`
        },
    },
    methods: {
        handleKeydown ({ key, keyCode }) {
            if (key === 'Enter' || keyCode === 13) {
                this.$emit('enterPressed')
            }
        },
        handleClick () {
            this.$emit('click')
        },
        timeAgo (date) {
            const a = this.$dayjs()
            const b = this.$dayjs(date)
            return b.from(a)
        },
    },
}
</script>

<style scoped>
.horizontal-post {
    max-height: 200px;
    max-width: 600px;
}
.horizontal-post > .horizontal-post-container > .post-img-container > img {
    width: 100%;
    height: 100%;
}
.horizontal-post:hover {
    cursor: pointer;
    box-shadow: 0 calc(var(--spacing-rem) / 2) var(--spacing-rem) 0 var(--shadow-rgb);
}
.horizontal-post:focus {
    box-shadow: 0 calc(var(--spacing-rem) / 2) var(--spacing-rem) 0 var(--shadow-rgb);
    outline: none;
}
.bookmark {
    position: absolute;
    bottom: calc(var(--spacing-rem) * 3);
    right: calc(var(--spacing-rem) * 3);
}
</style>