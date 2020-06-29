<template>
    <div class="bookmarks" 
        ref="bookmarks" 
        tabindex="0">
        <zen-box class="bookmarks-container bg-white"
            ref="bookmarkContainer" 
            :class="{show: isOpen}">
            <zen-box class="close-btn" v-if="!loading">
                <zen-button color="plain-grey" @click="close">
                    <span class="sr-only">Close</span>
                    <v-icon :icon="['fas', 'times']"/>
                </zen-button>
            </zen-box>
            
            <zen-box class="mt-4">
                <zen-box class="bookmark-header pl-10 pt-2 pb-2">
                    <zen-text header="h6">
                        Bookmarks
                    </zen-text>
                </zen-box>
                <app-loader v-if="loading" height="100%"/>
                <zen-flex v-else class="posts pt-2 pb-2" direction="row" wrap="wrap">
                    <zen-box
                        f="0 0 33%"
                        p=".25rem"
                        responsive
                        v-for="post in posts"
                        :key="post._id">
                        <post-thumbnail :post="post" 
                            @click.native="goToDetail(post)"
                            @enterPressed="goToDetail(post)"/>
                    </zen-box>
                </zen-flex>
            </zen-box>
        </zen-box>
    </div>
</template>

<script>
import PostThumbnail from './PostThumbnail'
import AppLoader from './AppLoader'

const focusableElementStr = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'

export default {
    props: {
        posts: {
            type: Array,
        },
        isOpen: {
            type: Boolean,
        },
        loading: {
            type: Boolean,
        },
    },
    components: {
        PostThumbnail,
        AppLoader,
    },
    data () {
        return {
            elementThatTriggered: null,
        }
    },
    watch: {
        isOpen (newVal) {
            if (newVal === true) {
                document.body.classList.add('no-scroll')
                this.$nextTick(() => {
                    this.elementThatTriggered = document.activeElement
                    this.setAriaHidden()
                    if (this.$refs.bookmarks) {
                        this.$refs.bookmarks.focus()
                        this.$refs.bookmarks.addEventListener('keydown', this.listenForEscape)
                    }
                })
            }
            else {
                document.body.classList.remove('no-scroll')
                this.$nextTick(() => {
                    this.removeAriaHidden()
                    if (this.elementThatTriggered) {
                        this.elementThatTriggered.focus()
                    }
                })
            }
        }
    },
    beforeDestroy () {
        this.$refs.bookmarks.removeEventListener('keydown', this.listenForEscape)
    },
    methods: {
       goToDetail(post) {
            this.close()
            this.$nextTick(() => 
                this.$router.push({name: 'detail', query: {title: post.title, _id: post._id}})
            )
        }, 
        close () {
            this.$emit('close')
        },
        listenForEscape (event) {
            if (event.code && event.code.toLowerCase() === `escape`) {
                this.close()
            }
        },
        getElementsOutsideBookmark () {
            const allTabbableElements = this.getArrayFromNodeList(document.querySelectorAll(focusableElementStr))
            const bookmarkContent = this.$refs.bookmarkContainer.$el
            const bookmarkFocusableElements = this.getArrayFromNodeList(bookmarkContent.querySelectorAll(focusableElementStr))
            return allTabbableElements.filter(el => bookmarkFocusableElements.findIndex(el2 => el2.isEqualNode(el)) < 0)
        },
        setAriaHidden () {
            const outsideBookmark = this.getElementsOutsideBookmark()
            if (outsideBookmark.length > 0) {
                outsideBookmark.forEach(el => el.setAttribute('aria-hidden', true))
            }
        },
        removeAriaHidden () {
            const allTabbableElements = this.getArrayFromNodeList(document.querySelectorAll(focusableElementStr))
            if (allTabbableElements.length > 0) {
                allTabbableElements.forEach(el => el.setAttribute('aria-hidden', false))
            }
        },
        getArrayFromNodeList (list) {
            return Array.prototype.slice.call(list)
        },
    },
}
</script>

<style>
.bookmarks-container {
    position: fixed;
    bottom: 0;
    left: 0;
    max-height: 0px;
    width: 100%;
    z-index: 6;
    display: flex;
    flex-direction: column;
    transition: max-height .7s;
}
.bookmarks-container.show {
    max-height: 100vh;
    height: 100vh;
}
.bookmarks-container .posts {
    max-height: 799px;
    overflow-y: auto;
    padding-bottom: 5rem !important;
}
.close-btn {
    position: absolute;
    top: 1.5rem;
    right: 1rem;
}
.overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 5;
}
</style>