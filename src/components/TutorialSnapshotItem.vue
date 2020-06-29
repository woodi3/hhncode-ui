<template>
    <zen-box
        class="tutorial mt-4 mb-4 pt-4 pb-4"
        w="80%"
        mr="auto"
        ml="auto"
        position="relative"
        @keydown.native="handleKeydown">
        <zen-flex align="center">
            <zen-box w="33%" class="text-center img-container">
                <img :src="tutorial.headerImg" alt="Code thumbnail">
            </zen-box>
            <zen-box w="67%" class="snapshot-content">
                <h2>{{tutorial.title}}</h2>
                <zen-text v-if="tutorial.meta && tutorial.meta.subtitle" 
                    class="subtitle mt-2 mb-2"
                    italic>
                    {{tutorial.meta.subtitle}}
                </zen-text>
                <badge v-for="tag in tutorial.tags"
                    class="ml-1 mt-3 mb-3 mr-1" 
                    :key="tag._id"
                    :text="tag.text"
                    :color="tag.color" />
                <zen-text class="created" fontSize="sm">
                    {{timeAgo(tutorial.createdAt)}}
                </zen-text>
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
        tutorial: {
            type: Object,
            required: true
        }
    },
    computed: {
        user () {
            return this.$store.state.user
        },
        isAuthenticated () {
            return this.$store.state.isAuthenticated
        },
        bookmarked () {
            return this.user.bookmarks && this.user.bookmarks.indexOf(this.tutorial._id) > -1
        },
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
    }
}
</script>

<style scoped>
.tutorial img {
    width: 100px;
    height: 100px;
}
.tutorial h2 {
    margin: 0;
}
.tutorial:hover {
    cursor: pointer;
    box-shadow: 0 calc(var(--spacing-rem) / 2) var(--spacing-rem) 0 var(--shadow-rgb);
}
.bookmark {
    position: absolute;
    bottom: calc(var(--spacing-rem) * 3);
    right: calc(var(--spacing-rem) * 3);
}
</style>