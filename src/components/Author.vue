<template>
    <zen-flex class="author" align="center">
        <img class="avatar" :src="'https://via.placeholder.com/500'" alt="author avatar"/>
        <zen-box ml=".75rem">
            <zen-text class="name">
                Alex Wood
            </zen-text>
            <zen-text class="created" color="#747474">
                {{created}}
            </zen-text>
        </zen-box>
        <zen-flex class="icons">
            <zen-box pl=".5rem" pr=".5rem" class="icon">
                <zen-button color="plain-gray" @click="twitter">
                    <span class="sr-only">Twitter</span>
                    <v-icon class="twitter" :icon="['fab', 'twitter']" size="lg"/>
                </zen-button>
            </zen-box>
            <zen-box pl=".5rem" pr=".5rem" class="icon">
                <zen-button color="plain-gray" @click="instagram">
                    <span class="sr-only">Instagram</span>
                    <v-icon class="instagram" :icon="['fab', 'instagram']" size="lg"/>
                </zen-button>
            </zen-box>
            <zen-box pl=".5rem" pr=".5rem" class="icon" v-if="showBookmark">
                <zen-button color="plain" @click="toggleBookmark">
                    <span class="sr-only">{{bookmarked ? 'Remove Bookmark' : 'Bookmark'}}</span>
                    <v-icon :class="[bookmarked ? 'text-primary' : '']" :icon="[ bookmarked ? 'fas' : 'far', 'bookmark']" size="lg"/>
                </zen-button>
            </zen-box>
        </zen-flex>
    </zen-flex>
</template>

<script>
export default {
    props: {
        date: {
            type: String
        },
        showBookmark: {
            type: Boolean,
        },
        bookmarked: {
            type: Boolean
        },
    },
    computed: {
        created () {
            return this.$dayjs(this.date).format('MMM D')
        }
    },
    methods: {
        twitter () {
            // TODO change to HHnCode account
            window.location.href = 'https://twitter.com/W2ODi'
        },
        instagram () {
            // TODO change to HHnCode account
            window.location.href = 'https://www.instagram.com/woodi_3/'
        },
        toggleBookmark () {
            this.$emit('toggleBookmark')
        },
    }
}
</script>

<style scoped>
.author {
    width: 100%;
}
.avatar {
    border-radius: 50%;
    height: 48px;
    width: 48px;
}
.name {
    line-height: 20px;
    font-size: 1rem;
    font-weight: 300;
}
.icons {
    flex: 0 0 25%;
    justify-content: flex-end;
    margin-left: auto;
}
</style>