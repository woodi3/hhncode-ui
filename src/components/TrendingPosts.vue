<template>
    <zen-box v-if="!loading"
        class="trending-posts-container" 
        position="relative"
        mt="4rem"
        h="600px"
        tabIndex="0"
        @keydown.native="handleKeydown">
        <zen-box class="trending-post-info" 
            bg="gray-light" 
            w="700px"
            h="500px"
            position="absolute"
            v-if="currentPost">
            <zen-box class="trending-text-container" 
                w="300px"
                pl="2rem"
                pt="4rem"
                position="relative">
                <zen-box class="text-header-container">
                    <zen-text 
                        class="z-inline bg-white pl-4 pr-4 pt-2 pb-2" 
                        header="h7"
                        letterSpacing="2px">
                        Trending
                    </zen-text>
                </zen-box>
                <zen-box class="trending-post-info"
                    position="absolute"
                    @click.native="goToDetail(currentPost)">
                    <zen-box class="trending-post-info-container">
                        <zen-text class="post-title" header="h4">{{currentPost.title}}</zen-text>
                        <zen-box v-if="currentPost.meta" 
                            w="75%"
                            mt="1rem">
                            <zen-text class="post-subtitle" italic>{{currentPost.meta.subtitle}}</zen-text>
                        </zen-box>
                        <zen-box w="50%" mt="1rem">
                            <zen-flex class="badge-container">
                                <badge v-for="tag in currentPost.tags"
                                    class="ml-1 mt-3 mb-3 mr-1" 
                                    :key="tag._id"
                                    :text="tag.text"
                                    :color="tag.color"/>
                            </zen-flex>
                        </zen-box>
                    </zen-box>
                </zen-box>
            </zen-box>
        </zen-box>
        <zen-box v-if="currentPost" 
            position="relative" 
            w="700px" 
            h="500px"
            ml="15%">
            <zen-box class="arrows" 
                d="flex" 
                w="33%" 
                mt="1rem" 
                position="absolute">
                <zen-button color="plain-black"
                    @click="back">
                    <v-icon :icon="['fas', 'chevron-left']"/>
                </zen-button>
                <zen-button color="plain-black"
                    @click="next">
                    <v-icon :icon="['fas', 'chevron-right']"/>
                </zen-button>
            </zen-box> 
        </zen-box>   
        <zen-box v-if="currentPost"
            class="trending-post-header-img"
            position="absolute"
            h="400px"
            w="450px"
            @click.native="goToDetail(currentPost)">
            <img :src="currentPost.headerImg"/>
        </zen-box>
    </zen-box>
</template>

<script>
import { gsap } from "gsap";

import Badge from './Badge'

const SLIDE_TIMEOUT = 6000

export default {
    components: {
        Badge,
    },
    props: {
        posts: {
            type: Array,
        },
        loading: {
            type: Boolean,
        },
    },
    watch: {
        loading (newVal) {
            if (!newVal) {
                if (this.posts.length > 0) {
                    this.setCurrentIndex(0)
                }
            }
        },
    },
    data () {
        return {
            currentIndex: 0,
            intervalTimer: null,
        }
    },
    mounted () {
        this.intervalTimer = setInterval(this.next, SLIDE_TIMEOUT)
    },
    beforeDestroy () {
        clearInterval(this.intervalTimer)
    },
    computed: {
        currentPost () {
            return this.posts[this.currentIndex]
        },
        isAnimating () {
            return gsap.isTweening('.trending-post-header-img') 
            || gsap.isTweening('.trending-post-info-container')
        },
        maxLength () {
            return this.posts.length
        },
    },
    methods: {
        setCurrentIndex (index) {
            if (index > this.maxLength-1) {
                index = 0
            } else if (index < 0) {
                index = this.maxLength - 1
            }
            this.currentIndex = index
        },
        back () {
            if (!this.isAnimating) {
                this.setCurrentIndex(this.currentIndex - 1)
                this.slideOut()
            }
        },
        next () {
            if (!this.isAnimating) {
                this.setCurrentIndex(this.currentIndex + 1)
                this.slideIn()
            }
        },
        slideIn () {
            gsap.from('.trending-post-header-img', {
                x: 100,
                ease: 'sine.out',
                duration: .75,
            })

            gsap.fromTo('.trending-post-info-container', {
                y: -50,
                opacity: 0,
                duration: .8
            }, {
                y: 0,
                opacity: 1,
                duration: .8
            })
        },
        slideOut () {
            gsap.from('.trending-post-header-img', {
                x: -100,
                ease: 'sine.out',
                duration: .75,
            })

            gsap.from('.trending-post-info-container', {
                y: -50,
                opacity: 0,
                duration: .8
            }, {
                y: 0,
                opacity: 1,
                duration: .8
            })
        },
        handleKeydown ({ key, keyCode }) {
            if (key === 'ArrowLeft' && keyCode === 37) {
                if (!this.disableBack) {
                    this.back()
                }
            } else if (key === 'ArrowRight' && keyCode === 39) {
                if (!this.disableNext) {
                    this.next()
                }
            }
        },
        goToDetail(post) {
            this.$router.push({name: 'detail', query: {title: post.title, _id: post._id}})
        },
    },
}
</script>

<style scoped>
.trending-posts-container:focus {
    outline: none;
}
.trending-posts-container > .trending-post-info {
    left: 15%;
    top: 0;
}
.trending-posts-container > .trending-post-header-img {
    left: 50%;
    top: 10%;
}
.trending-posts-container > 
.trending-post-info > 
.trending-text-container > 
.trending-post-info {
    z-index: 2;
    top: calc(var(--spacing-rem) * 32);
    left: calc(var(--spacing-rem) * 8);
    width: 475px;
}
.trending-posts-container > .trending-post-header-img > img {
    width: 100%;
    height: 100%;
}
.arrows {
    left: 2rem;
    bottom: 2rem;
}
.trending-post-info:hover {
    cursor: pointer;
}
.trending-post-header-img:hover {
    cursor: pointer;
}
</style>