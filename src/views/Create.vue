<template>
    <zen-box class="create" h="700px">
        <zen-flex v-if="loading"
            align="center"
            justify="center"
            style="height: 100%">
            <zen-spinner />
        </zen-flex>

        <zen-box v-else class="container" h="100%">
            <zen-flex class="mr-5 ml-5" 
                justify="space-between"
                align="center"
                wrap="wrap">
                <zen-box f="0 0 75%">
                    <zen-input v-model="newPost.title"
                        variant="flushed" 
                        class="title mt-3 mb-3" 
                        name="post-title" 
                        placeholder="Title" 
                        type="text" 
                        required
                        :disabled="!newPost.isDraft"
                    />
                </zen-box>
                <zen-box f="0 0 25%" class="text-center">
                    <zen-button class="ml-2 mr-2" 
                        color="accent"
                        :disabled="disableSave || !newPost._id" 
                        @click="preview">
                        Preview
                    </zen-button>
                    <zen-button :disabled="disableSave || !newPost.isDraft" 
                        @click="savePost(true)">
                        Save
                    </zen-button>
                </zen-box>
            </zen-flex>
            <zen-flex class="mr-5 ml-5" align="center" wrap="wrap">
                <zen-box f="0 0 20%">
                    <zen-checkbox v-model="newPost.isTutorial" :disabled="!newPost.isDraft"/>
                    <zen-label>
                        Create tutorial
                    </zen-label>
                </zen-box>
                <zen-box f="0 0 20%">
                    <zen-checkbox v-model="newPost.isReview" :disabled="!newPost.isDraft"/>
                    <zen-label>
                        Review
                    </zen-label>
                </zen-box>
                <zen-box f="0 0 20%">
                    <zen-checkbox v-model="newPost.isTrending" :disabled="!newPost.isDraft"/>
                    <zen-label>
                        Trending
                    </zen-label>
                </zen-box>
                <zen-box f="0 0 20%">
                    <zen-checkbox v-model="newPost.isHipHop" :disabled="!newPost.isDraft"/>
                    <zen-label>
                        Hip Hop
                    </zen-label>
                </zen-box>
                <zen-box f="0 0 20%">
                    <zen-checkbox v-model="newPost.isCode" :disabled="!newPost.isDraft"/>
                    <zen-label>
                        Code
                    </zen-label>
                </zen-box>
                <zen-box f="0 0 15%">
                    <zen-button color="plain" 
                        :disabled="!newPost.isDraft"
                        @click="openHeader">
                        {{hasHeader ? 'Edit Header' : 'Add Header'}}
                    </zen-button>
                </zen-box>
                <zen-box f="0 0 15%">
                    <zen-button color="plain" 
                        :disabled="!newPost.isDraft"
                        @click="showMeta = true">
                        {{newPost.meta ? 'Edit Meta' : 'Add Meta'}}
                    </zen-button>
                </zen-box>
                <zen-box f="0 0 15%" v-if="newPost._id">
                    <zen-button color="plain-accent"
                        :disabled="disableSave"
                        @click="togglePublish">
                        {{newPost.isDraft ? `Publish` : `Revert`}}
                    </zen-button>
                </zen-box>
                <zen-box f="0 0 15%" v-if="newPost._id">
                    <zen-button color="plain-danger"
                        @click="deletePost">
                        <zen-spinner v-if="isDeleting" color="danger"/>
                        <span v-else>Delete</span>
                    </zen-button>
                </zen-box>
            </zen-flex>

            <badge-selection flexBasis="100%"
                :items="tags" 
                :selection="newPost.tags" 
                @toggle="toggleTag"/>

            <zen-box h="100%">
                <div id="editor">
                </div>
            </zen-box>
        </zen-box>


        <!-- Abstract to its own component (MetaDialog) -->
        <zen-dialog :closeOnOverlayClick="false"
            :isOpen="showMeta">
            <zen-dialog-header @close="showMeta = false;">Add Meta Data</zen-dialog-header>
            <zen-dialog-body>
                <meta-form 
                    :meta="newMeta"
                    @blur="handleMeta"
                />
            </zen-dialog-body>
            <zen-dialog-footer>
                <zen-button color="plain" class="ml-2 mr-2" @click="closeMeta">Cancel</zen-button>
                <!-- TODO make a save endpoint? -->
                <zen-button @click="showMeta = false">Save</zen-button>
            </zen-dialog-footer>
        </zen-dialog>

        <image-upload
            endpoint="post/upload"
            :isOpen="openHeaderModal" 
            :item="newPost"
            :imgProp="'headerImg'"
            @close="openHeaderModal = false"
            @upload="handleUpload"/>

    </zen-box>
</template>

<script>
import Quill from 'quill'
import { quillConfig } from '../utils'
import { defaultPost } from '../store/create'

import ImageUpload from '../components/ImageUpload'
import BadgeSelection from '../components/BadgeSelection'
import MetaForm from '../components/MetaForm'

const LOADING_STATES = {
    DELETING: 'DELETING',
    CREATING: 'CREATING',
    LOADING: 'LOADING',
    NONE: 'NONE'
}

export default {
    components: {
        BadgeSelection,
        MetaForm,
        ImageUpload,
    },
    data () {
        return {
            quill: null,
            showMeta: false,
            newMeta: {},
            loadingState: LOADING_STATES.NONE,
            newPost: defaultPost,
            openHeaderModal: false,
            headerImg: '',
            tags: [],
        }
    },
    async mounted () {

        await this.load()
        this.handleMeta(this.newPost.meta)
        this.setupQuill()
    },
    beforeDestroy () {
        this.cleanUp()
    },
    computed: {
        hasHeader () {
            return this.newPost.headerImg !== ''
        },
        post () {
            return this.$store.state.post
        },
        content () {
            return this.newPost.content.length > 0 ? JSON.parse(this.newPost.content) : []
        },
        disableSave () {
            return (
                this.newPost.title === '' 
                || !this.newPost.content 
                || this.newPost.content.length === 0
                || this.newPost.tags.length === 0
            )
        },
        token () {
            return this.$store.state.token
        },
        loading () {
            return this.loadingState === LOADING_STATES.LOADING
        },
        creating () {
            return this.loadingState === LOADING_STATES.CREATING
        },
        isDeleting () {
            return this.loadingState === LOADING_STATES.DELETING
        },
    },
    methods: {
        reset () {
            this.newPost = {...this.post}
        },
        cleanUp () {
            this.newPost = defaultPost
            this.quill = null
            this.headerImg = '',
            this.tags = []
        },
        setEditable (isDraftState) {
            if (this.quill) {
                if (isDraftState) {
                    this.quill.enable()
                } else {
                    this.quill.disable()
                }
            }
        },
        openHeader () {
            this.headerImg = this.newPost.headerImg
            this.openHeaderModal = true
        },
        setupQuill () {
            this.quill = new Quill('#editor', quillConfig)
        
            // set the custom image handler
            this.quill.getModule('toolbar')
                .addHandler('image', () => this.imageHandler())
        
            this.quill.on('text-change', () => this.handleEditorChange());

            this.setContents()

            this.setEditable(this.newPost.isDraft)
        },
        setContents () {
            this.quill.setContents(this.content)
        },
        toggleTag (tag) {
            if (!this.newPost.isDraft) {
                alert ('Post is published! Revert to a draft to make changes.')
                return
            }
            const tagIdx = this.newPost.tags.findIndex(t => t._id === tag._id)
            if (tagIdx > -1) {
                this.newPost.tags.splice(tagIdx, 1)
            }
            else {
                this.newPost.tags.push(tag)
            }
        },
        handleEditorChange () {
            this.newPost.content = JSON.stringify(this.quill.getContents())
        },
        closeMeta () {
            this.handleMeta(this.newPost.meta)
            this.showMeta = false
        },
        handleMeta (meta) {
            this.newMeta = {...meta}
        },
        async preview () {
            try {
                await this.savePost()
                this.$router.push({name: 'admin-dashboard-preview', params: {id: this.newPost._id}})
            } catch (err) {
                console.log(err)
            }
        },
        togglePublish () {
            this.newPost.isDraft = !this.newPost.isDraft
            this.savePost(false)
        },
        handleUpload (image) {
            this.newPost.headerImg = image.url
            this.openHeaderModal = false
        },
        imageHandler () {
            // create the input element for uploading
            const input = document.createElement('input')

            input.setAttribute('type', 'file')
            input.setAttribute(
                'accept',
                'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
            )

            input.onchange = async () =>  {
                const file = input.files && input.files[0] ? input.files[0] : null
                if (file) {
                    const formData = new FormData()
                    formData.append('file', file)
                    
                    const { success, image } = await this.$postService.uploadImg(formData, this.token)

                    if (success) {
                        const range = this.quill.getSelection(true)
                        this.quill.insertEmbed(range.index, 'image', image.url)
                    }
                }
            }

            // open file picker
            input.click()
        },
        async savePost (goBack) {
            try {
                this.loadingState = LOADING_STATES.CREATING
                this.newPost.meta = this.newMeta
                this.newPost.tags = this.newPost.tags.map(t => t._id)

                const { success } = await this.$postService.createPost(this.newPost, this.token)

                this.loadingState = LOADING_STATES.NONE

                if (success) {
                    if (goBack) {
                        this.$router.go(-1)
                    }
                    else {
                        await this.load()
                        this.setupQuill()
                    }
                }

            } catch (err) {
                console.log(err)
                this.loadingState = LOADING_STATES.NONE
                this.$toast({
                    type: "error",
                    title: "Error creating post",
                    message: "Error creating post"
                })
            }
        },
        async load () {
            try {
                this.loadingState = LOADING_STATES.LOADING
                this.tags = await this.loadTags()
                
                // if post has an id, then we need to load it
                if (this.post._id) {
                   this.newPost = await this.loadPost()
                } else {
                    this.newPost = {...this.post}
                }
                this.loadingState = LOADING_STATES.NONE
            } catch (err) {
                console.log(err)
                this.loadingState = LOADING_STATES.NONE
            }
        },
        async loadTags () {
            const {success, tags} = await this.$tagService.getTags()
            if (success) {
                return tags
            }
            return []
        },
        async loadPost () {
            // TODO Load post
            const { success, post } = await this.$postService.getPost(this.post, this.token)
            if (success) {
                return {...post}
            }
            return {...this.post}
        },
        async deletePost () {
            if (confirm('Are you sure?')) {
                try {
                    this.loadingState = LOADING_STATES.PUBLISHING
                    const { success } = await this.$postService.deletePost(this.newPost, this.token)
                    if (success) {
                        this.$router.go(-1)
                    } else {
                    this.$toast({
                            type: "error",
                            title: "Error deleting post",
                            message: "Error deleting post"
                        }) 
                    }

                    this.loadingState = LOADING_STATES.NONE

                } catch (err) {
                    this.loadingState = LOADING_STATES.NONE
                    this.$toast({
                        type: "error",
                        title: "Error deleting post",
                        message: "Error deleting post"
                    })
                }
            }
        }
    }
}
</script>

<style scoped>
.create {
    overflow-y: auto;
}
.create >>> .ql-toolbar {
    border-left: none !important;
    border-right: none !important;
    border-top: none !important;
}
</style>