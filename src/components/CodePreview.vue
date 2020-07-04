<template>
    <zen-box class="code-preview container" 
        position="relative">
        <zen-flex class="action-bar brtc bg-primary pl-2" 
            align="center">
            <zen-box class="action-circle"></zen-box>
            <zen-box class="action-circle"></zen-box>
            <zen-box class="action-circle"></zen-box>
        </zen-flex>
        <zen-box class="side-bar brbl"
            position="absolute"
            w="70px"
            bg="gray-dark">
            <zen-flex class="side-bar-items" 
                direction="column" 
                align="center"
                justify="flex-end">
                <zen-box v-for="(tab, idx) in tabs"
                    :key="tab.key"
                    class="side-bar-item border-3x"
                    pb="1.5rem"
                    pt="1.5rem"
                    :class="[active(tab) ? [...activeClasses] : '', idx === tabs.length - 1 ? 'last' : '']"
                    @click.native="toggleTab(tab)">
                    <zen-text bold
                        align="center" 
                        :color="active(tab) ? 'white' : 'gray'">
                        {{tab.text}}
                    </zen-text>
                </zen-box>
                <zen-box class="text-center brbl view-more" 
                    bg="primary" 
                    w="100%"
                    pt="1rem"
                    pb="1rem"
                    d="flex"
                    alignItems="center"
                    justifyContent="center"
                    @click.native="navigateToCode">
                    More
                </zen-box>
            </zen-flex>
        </zen-box>
        <zen-box class="container bg-black border brbc br-md" 
            pt="30px" 
            pl="70px" 
            ml="1rem"
            h="800px"
            d="flex"
            flexDirection="column"
            position="relative">
            <zen-box class="pusher" f="0 0 25%" h="1px">
            </zen-box>
            <zen-box class="code-preview-header" 
                f="0 0 25%"
                width="60%">
                <zen-text class="animated-text" 
                    header="h2" 
                    color="white" 
                    ref="codeHeaderText">
                    <span class="sr-only">{{animatedText}}</span>
                </zen-text>
            </zen-box>
            <zen-box class="code-preview-content"
                position="absolute">
                <zen-flex>
                    <zen-box f="0 0 33%"
                        pl=".5rem" 
                        pr=".5rem" 
                        v-for="post in displayPosts" 
                        :key="post._id">
                        <vertical-post-thumbnail 
                            :post="post" 
                            :isAuthenticated="isAuthenticated"
                            :bookmarked="bookmarked(post)"
                            @click="goToDetail(post)"
                            @enterPressed="goToDetail(post)"/>
                    </zen-box>
                </zen-flex>
            </zen-box>
        </zen-box>
    </zen-box>
</template>

<script>
import Typewriter from 'typewriter-effect/dist/core';

import VerticalPostThumbnail from './VerticalPostThumbnail'

const TABS = [
    {
        key: 'POSTS',
        text: 'Posts',
        computedKey: 'showingPosts',
    },
    {
        key: 'TUTORIALS',
        text: 'Tutorials',
        computedKey: 'showingTutorials',
    },
]

export default {
    components: {
        VerticalPostThumbnail,
    },
    props: {
        posts: {
            type: Array,
        },
        loading: {
            type: Boolean,
        },
        isAuthenticated: {
            type: Boolean,
        },
    },
    data () {
        return {
            tabs: [...TABS],
            activeTab: {...TABS[0]},
            animatedText: `Coding should be like a breath of fresh air.`,
            typeWriter: null,
        }
    },
    mounted () {
        this.typeWriter = new Typewriter('.animated-text', {
            strings: this.animatedText,
            delay: 100,
            autoStart: true,
            // loop: true,
        });
    },
    computed: {
        activeClasses() {
            return ['border-white-bottom']
        },
        codePosts () {
            return this.posts.filter(p => p.isCode && !p.isTutorial)
        },
        tutorialPosts () {
            return this.posts.filter(p => p.isTutorial)
        },
        displayPosts () {
            return this.activeTab.key === 'POSTS' ? this.codePosts : this.tutorialPosts
        },
        user () {
            return this.$store.state.user
        },
    },  
    methods: {
        active (tab) {
            return tab.key === this.activeTab.key
        },
        toggleTab (tab) {
            this.activeTab = {...tab}
        },
        navigateToCode () {
            this.$router.push('/code')
        },
        bookmarked (post) {
            return this.user && this.user.bookmarks && this.user.bookmarks.indexOf(post._id) > -1
        },
        goToDetail(post) {
            this.$router.push({name: 'detail', query: {title: post.title, _id: post._id}})
        },
    },
}
</script>

<style scoped>
.code-preview {
    height: 1000px;
}
.code-preview > .action-bar {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 30px;
    z-index: 2;
}
.code-preview > .side-bar {
    top: 30px;
    left: 0;
    height: calc(800px - 30px);
    z-index: 2;
}
.code-preview > .side-bar > .side-bar-items {
    height: 100%;
}
.code-preview > .side-bar > .side-bar-items > .side-bar-item {
    transform: rotate(-90deg);
}
.code-preview > .side-bar > .side-bar-items > .side-bar-item:hover {
    cursor: pointer;
}
.code-preview > .side-bar > .side-bar-items > .side-bar-item.last {
    margin-bottom: 8rem;
}
.code-preview > .action-bar > .action-circles {
    margin-left: .5rem;
}
.code-preview > .action-bar > .action-circle {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: white;
    margin: .5rem .25rem;
}
.code-preview-content {
    top: 60%;
    left: 70px;
    right: 0;
}
.view-more:hover {
    cursor: pointer;
    background-color: var(--primary-darker-color) !important;
    border-color: var(--primary-darker-color) !important;
}
</style>