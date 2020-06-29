<template>
    <zen-box class="preview">
        <app-loader v-if="loading" />
        <zen-box v-else-if="post" class="post container">
            <h1 class="title">{{post.title}}</h1>
            <h3 class="subtitle">{{post.meta.subtitle}}</h3>
            
            <author :date="post.createdAt" class="mt-8"/>
            
            <img class="header-img" :src="post.headerImg" />
            
            <zen-box v-html="html" class="content mt-8">
            </zen-box>

            <zen-flex class="badges mt-4" wrap="wrap">
                <zen-box :f="`0 0 33%`">
                    <badge v-for="tag in post.tags"
                        class="ml-1 mt-3 mb-3 mr-1" 
                        :key="tag._id"
                        :text="tag.text"
                        :color="tag.color" />
                </zen-box>
            </zen-flex>

            <author-tag />
        </zen-box>
    </zen-box>
</template>

<script>
import AuthorTag from '../components/AuthorTag'
import Author from '../components/Author'
import Badge from '../components/Badge'
import AppLoader from '../components/AppLoader'

import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; 

const STATES = {
    LOADING: 'loading',
    NONE: 'none',
}

export default {
    components: {
        AppLoader,
        Author,
        AuthorTag,
        Badge,
    },
    data () {
        return {
            post: null,
            converter: null,
            html: '',
            state: STATES.NONE,
        }
    },
    async mounted () {
        await this.loadPost(this.$route.params.id)
        this.converter = this.createQuillConverter(this.post.content.ops, {})
        this.html = this.converter.convert()
    },
    computed: {
        token () {
            return this.$store.state.token
        },
        loading () {
            return this.state === STATES.LOADING
        },
    },
    methods: {
        createQuillConverter (deltaOps, config) {
            const converter = new QuillDeltaToHtmlConverter(deltaOps, config);
            return converter
        },
        setState (state) {
            this.state = state
        },
        async loadPost (_id) {
            try {
                this.setState(STATES.LOADING)
                const { success, post} = await this.$postService.getPost({_id}, this.token)
                if (success) {
                    this.post = post
                    this.post.content = JSON.parse(post.content)
                }
                return this.post
            } catch (err) { 
                console.log(err)
            } finally {
                this.setState(STATES.NONE)
            }
        },
    },
}
</script>

<style>
.title {
    font-size: 40px;
    line-height: 48px;
    margin: 0px;
}
.post {
    max-width: 700px;
}
.header-img {
    width: 100%;
    /* max-height: 380px; */
    margin-top: calc(var(--spacing-rem) * 14);
}
</style>