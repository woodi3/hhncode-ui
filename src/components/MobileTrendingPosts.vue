<template>
    <zen-box v-if="!loading"
        class="mobile-trending-post"
        mt="2rem"
        mb="5rem"
        d="flex" 
        justifyContent="center"
        :h="height">
        <zen-box v-if="currentPost" :w="containerWidth" position="relative">
            <zen-box :w="containerWidth" 
                :h="imgHeight"
                ref="currentPostImg"
                class="bg-white mobile-trending-post-img"
                @click.native="goToDetail(currentPost)">
                <img :src="currentPost.headerImg" />
            </zen-box>
            <zen-box class="mobile-trending-post-info bg-gray-light p-2"
                h="100%">
                <zen-box v-if="!hideTrending"
                    class="text-header-container pl-4 pt-8 mb-4">
                    <zen-text 
                        class="z-inline bg-white pl-4 pr-4 pt-2 pb-2"
                        letterSpacing="2px">
                        Trending
                    </zen-text>
                </zen-box>
                <zen-box class="mobile-trending-post-info-container" 
                    pl="1rem">
                    <zen-text class="post-title" header="h7" @click.native="goToDetail(currentPost)">{{currentPost.title}}</zen-text>
                    <zen-box v-if="currentPost.meta" mt="1rem" @click.native="goToDetail(currentPost)">
                        <zen-text class="post-subtitle" italic>{{currentPost.meta.subtitle}}</zen-text>
                    </zen-box>
                    <zen-box v-if="posts.length > 1"
                        class="arrows" 
                        d="flex"
                        mt="1rem"
                        mb="1rem"
                        ml=".5rem"
                        justifyContent="flex-end">
                        <zen-button class="prev-btn"
                            color="plain-black"
                            @click="back">
                            <v-icon :icon="['fas', 'chevron-left']"/>
                        </zen-button>
                        <zen-button class="next-btn"
                            color="plain-black"
                            @click="next">
                            <v-icon :icon="['fas', 'chevron-right']"/>
                        </zen-button>
                    </zen-box> 
                </zen-box>
            </zen-box>
        </zen-box>
    </zen-box>
</template>

<script>
import { gsap } from 'gsap'

export default {
    props: {
        posts: {
            type: Array,
        },
        loading: {
            type: Boolean,
        },
        hideTrending: {
            type: Boolean,
        },
        height: {
            type: String,
            default: "600px"
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
            currentIndex: 0
        }
    },
    computed: {
        currentPost () {
            return this.posts[this.currentIndex]
        },
        isAnimating () {
            return gsap.isTweening(this.$refs.currentPostImg.$el)
        },
        maxLength () {
            return this.posts.length
        },
        imgHeight () {
            return (parseInt(this.height, 10) / 2) + 'px'
        },
        containerWidth () {
            return (parseInt(this.height, 10) * 0.47) + 'px'
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
            gsap.from(this.$refs.currentPostImg.$el, {
                x: 100,
                ease: 'sine.out',
                duration: .75,
            })
        },
        slideOut () {
            gsap.from(this.$refs.currentPostImg.$el, {
                x: -100,
                ease: 'sine.out',
                duration: .75,
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
            if (!this.isAnimating) {
                this.$router.push({name: 'detail', query: {title: post.title, _id: post._id}})
            }
        },
    },
}
</script>

<style scoped>
.mobile-trending-post-img > img {
    width: 100%;
    height: 100%;
}
.mobile-trending-post-info {
    max-height: 300px;
}
.arrows {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
}
</style>