<template>
    <zen-box>
        <template v-if="loading">
            <app-loader height="75%"/>
        </template>
        <template v-else-if="error">
            <h4>Server error</h4>
        </template>
        <zen-box v-else class="post container">
            <h1 class="title">{{post.title}}</h1>
            <zen-text class="subtitle mt-2 mb-2" header="h6" bold>{{post.meta.subtitle}}</zen-text>
            
            <author :date="post.createdAt" 
                :bookmarked="bookmarked" 
                :showBookmark="isAuthenticated"
                class="mt-8"
                @toggleBookmark="toggleBookmark"/>
            
            <img class="header-img" 
                :src="post.headerImg" 
                :alt="getAltTextForHeaderImg(post)"
                :title="getAltTextForHeaderImg(post)"/>
            
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
            
            <zen-box class="comments">
                <zen-flex justify="center p-6 mb-4">
                    <zen-button v-if="hideTextarea"
                        outline
                        size="block"
                        class="comment-hider" 
                        @click="toggleTextarea">
                        {{comments.length > 0 ? 'Write a response' : 'Write the first response'}}
                    </zen-button>
                </zen-flex>

                <zen-textarea v-if="!hideTextarea"
                    class="comment-area mt-6 mb-4" 
                    :placeholder="comments.length > 0 ? 'Write a response' : 'Write the first response'" 
                    v-model="newComment.content" />
                
                <zen-flex class="mb-4" justify="flex-end">
                    <zen-button v-if="!hideTextarea"
                        class="text-dark-gray mr-2"
                        color="plain"
                        :disabled="commenting"
                        @click="toggleTextarea">
                        Cancel
                    </zen-button>
                    <zen-button v-if="!hideTextarea"
                        :disabled="newComment.content.trim() === '' || commenting"
                        :isLoading="commenting"
                        @click="comment">
                        Post
                    </zen-button>
                </zen-flex>

                <zen-flex class="mt-8" 
                    v-if="sortedComments.length > 0"
                    :justify="mobile ? 'center' : null">
                    <zen-flex class="sort-order-items" 
                        align="center">
                        <zen-text class="mr-2" fontSize="sm">Sort by</zen-text>
                        <zen-box :w="mobile ? '100%' : null">
                            <v-select v-model="selectedSort"
                                label="sortName"
                                placeholder="Order" 
                                :options="sortOrderItems"
                                :clearable="false"
                                @search:blur="sortSelected"></v-select>
                        </zen-box>
                    </zen-flex>
                    
                    <zen-flex v-if="!mobile" 
                        class="sort-user-items" 
                        justify="flex-end">
                        <zen-box w="75%">
                            <v-select v-model="selectedUser"
                                placeholder="Sort by user" 
                                label="sortName" 
                                :options="sortUserItems"
                                :clearable="false"
                                @search:blur="userSortSelected"></v-select>
                        </zen-box>
                    </zen-flex>
                </zen-flex>
                <zen-box pb="2rem" pt="2rem" v-if="sortedComments.length > 0 && !commentsLoading">
                    <comment v-for="comment in sortedComments" 
                        :key="comment._id"
                        :isUser="user && comment.email === user.email"
                        :comment="comment"
                        @edit="edit"
                        @delete="deleteComment"
                        @report="setCommentForReport"
                        />
                </zen-box>
            </zen-box>
        </zen-box>
        <zen-dialog :isOpen="showReport" @close="setReportModalVisibility(false)">
            <zen-dialog-header @close="setReportModalVisibility(false)">
                Report
            </zen-dialog-header>
            <zen-dialog-body>
                <zen-box mt=".75rem" mb=".75rem">
                    <zen-input v-model="newReport.name"
                        variant="flushed" 
                        class="name mt-3 mb-3" 
                        name="newReport-name" 
                        placeholder="Your name" 
                        type="text" 
                        required
                        :disabled="reporting"
                        :invalid="!nameIsValid"
                    />
                </zen-box>
                <zen-box mt=".75rem" mb=".75rem">
                    <zen-input v-model="newReport.email"
                        variant="flushed" 
                        class="email mt-3 mb-3" 
                        name="newReport-email" 
                        placeholder="Your email" 
                        type="email" 
                        required
                        :disabled="reporting"
                        :invalid="!emailIsValid"
                    />
                </zen-box>
                <zen-box mt=".75rem" mb=".75rem">
                    <zen-textarea class="message"
                        placeholder="Write your message"
                        :disabled="reporting"
                        :invalid="!messageIsValid"
                        v-model="newReport.message" 
                    />
                </zen-box>
            </zen-dialog-body>
            <zen-dialog-footer>
                <zen-button 
                    class="mr-2 text-dark-gray" 
                    color="plain"
                    @click="setReportModalVisibility(false)">Cancel</zen-button>
                <zen-button color="accent" 
                    :isLoading="reporting" 
                    :disabled="reporting || reportBtnDisabled"
                    @click="report">
                    Report
                </zen-button>
            </zen-dialog-footer>
        </zen-dialog>
    </zen-box>
</template>

<script>

import AppLoader from '../components/AppLoader'
import Author from '../components/Author'
import AuthorTag from '../components/AuthorTag'
import Badge from '../components/Badge'
import Comment from '../components/Comment'

import debounce from 'lodash.debounce'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; 
import readingTime from 'reading-time'

import { unique, hasValue, validEmail } from '../utils'
import { DEVICE_ENUM } from '../services/resize.service'
import { USER_KEY } from '../store/user'
import { BASE_TITLE } from '../router/routes'

const STATES = {
    LOADING: 'loading',
    NONE: 'none',
    ERROR: 'error',
    COMMENTING: 'commenting',
    'COMMENTS_LOADING': 'comments_loading',
    REPORTING: 'reporting',
}

const DEFAULT_COMMENT = {
    content: '',
    name: '',
    email: '',
    postId: '',
    updatedAt: '',
    userId: '',
}

const DEFAULT_REPORT = {
    message: '',
    name: '',
    email: '',
    commentId: '',
}

const METRIC_KEYS = {
    TOTAL_READS: 'totalReads',
    TOTAL_VIEWS: 'totalViews',
}

export default {
    components: {
        AppLoader,
        Author,
        AuthorTag,
        Badge,
        Comment,
    },
    props: {
        t: { //title
            type: String,
            default: ''
        },
        i: { //_id
            type: String,
            default: ''
        },
    },
    data () {
        return {
            query: {
                title: '',
                _id: '',
            },
            state: STATES.LOADING,
            post: null,
            converter: null,
            html: '',
            newComment: {...DEFAULT_COMMENT},
            newReport: {...DEFAULT_REPORT},
            comments: [],
            hideTextarea: true,
            showReport: false,
            sortOrderItems: [
                {
                    sortKey: 'NEWEST',
                    sortName: 'Newest',
                },
                {
                    sortKey: 'OLDEST',
                    sortName: 'Oldest',
                },
            ],
            defaultUserItem: {
                sortKey: 'ALL',
                sortName: 'All'
            },
            selectedUser: {
                sortKey: 'ALL',
                sortName: 'All'
            },
            selectedSort: {
                sortKey: 'NEWEST',
                sortName: 'Newest',
            },
            sortUserItems: [],
            intervalId: null,
        }
    },
    async mounted () {
        this.setTitle()
        this.setId()
        await this.load()
        this.setBrowserTabTitle()
        this.converter = this.createQuillConverter(this.post.content.ops, {encodeHtml: true})
        this.html = this.converter.convert()
        this.incrementTotalViews()
        this.startTimer(Math.floor(this.timeToRead.time))
    },
    beforeDestroy () {
      this.endTimer()  
    },
    computed: {
        loading () {
            return this.state === STATES.LOADING
        },
        error () {
            return this.state === STATES.ERROR
        },
        commenting () {
            return this.state === STATES.COMMENTING
        },
        commentsLoading () {
            return this.state === STATES.COMMENTS_LOADING
        },
        reporting () {
            return this.state === STATES.REPORTING
        },
        isAuthenticated () {
            return this.$store.state.isAuthenticated
        },
        token () {
            return this.$store.state.token
        },
        user () {
            return this.$store.state.user
        },
        bookmarked () {
            return this.user && this.user.bookmarks && this.user.bookmarks.indexOf(this.post._id) > -1
        },
        nameIsValid () {
            return hasValue(this.newReport.name)
        },
        emailIsValid () {
            return hasValue(this.newReport.email) && validEmail(this.newReport.email)
        },
        messageIsValid () {
            return hasValue(this.newReport.message) && this.newReport.message.length < 280
        },
        reportBtnDisabled () {
            return !this.emailIsValid || !this.messageIsValid || !this.nameIsValid
        },
        device () {
            return this.$store.state.device
        },
        mobile () {
            return this.device === DEVICE_ENUM.MOBILE
        },
        timeToRead () {
            return readingTime(this.html)
        },
        sortedComments () {
            let comments = [...this.comments]
            const isUserAll = this.selectedUser.sortKey === 'ALL'
            if (this.selectedUser && !isUserAll) {
                // filter the comments
                comments = comments.filter(c => c.email === this.selectedUser.sortKey)
            }
            comments.sort((cA, cB) => {
                if (this.selectedSort.sortKey === 'NEWEST') {
                    if (this.$dayjs(cB.updatedAt).isBefore(this.$dayjs(cA.updateAt))) {
                        return -1
                    }
                    return 1
                }

                if (this.$dayjs(cB.updatedAt).isBefore(this.$dayjs(cA.updateAt))) {
                        return 1
                    }
                return -1

            })
            return comments
        },
    },
    methods: {
        cleanComment () {
            this.newComment = {...DEFAULT_COMMENT}
        },
        cleanReport () {
            this.newReport = {...DEFAULT_REPORT}
        },
        createQuillConverter (deltaOps, config) {
            const converter = new QuillDeltaToHtmlConverter(deltaOps, config);
            return converter
        },
        setState (state) {
            this.state = state
        },
        setTitle () {
            if (this.props && this.props.t !== '') {
                this.query.title = this.props.t
            } else if(this.$route.query && this.$route.query.title) {
                this.query.title = this.$route.query.title
            }
        },
        setBrowserTabTitle () {
            this.$nextTick(() => document.title = `${BASE_TITLE} | ${this.post.title}` || BASE_TITLE)
        },
        setId () {
            if (this.props && this.props.i !== '') {
                this.query._id = this.props.i
            } else if(this.$route.query && this.$route.query._id) {
                this.query._id = this.$route.query._id
            }
        },
        toggleTextarea () {
            if (this.isAuthenticated) {
                this.hideTextarea = !this.hideTextarea
            } else {
                this.$store.dispatch('setRedirect', {name: this.$route.name, query: this.$route.query})
                this.$router.push({name: 'new-account'})
            }
        },
        sortSelected () {
            alert('TODO sortSelected method')
        },
        userSortSelected () {
            alert('TODO userSortSelected method')
        },
        getAltTextForHeaderImg (post) {
            return `Header image for post titled: ${post.title}`
        },
        startTimer (timeToRead) {
            const now = this.$dayjs()
            this.intervalId = setInterval(() => {
                const current = this.$dayjs()
                if (current.diff(now) >= timeToRead) {
                    // user has viewed the article for the alotted time
                    this.incrementTotalReads()
                    this.endTimer()
                }
            }, 1000)
        },
        endTimer () {
            clearInterval(this.intervalId)
            this.intervalId = null
        },
        setReportModalVisibility (val) {
            this.showReport = val
            if (!this.showReport) {
                this.cleanReport()
            }
        },
        async load () {
            try {
                this.setState(STATES.LOADING)

                await this.loadPost(this.query)
                await this.loadComments(this.post)

                this.setState(STATES.NONE)

            } catch (err) {
                console.log(err)
            }
        },
        async loadPost (query) {
            const { success, post} = await this.$postService.getPostForClient(query)
            if (success) {
                this.post = post
                this.post.content = JSON.parse(post.content)
            }
            return this.post
        },
        async loadComments (post) {
            const { success, comments } = await this.$commentService.getComments(post)
            if (success) {
                this.comments = comments
                const users = unique(this.comments.map(comment => {
                    return {
                        sortKey: comment.email,
                        sortName: comment.name
                    }
                }), 'sortKey')

                this.sortUserItems = [this.defaultUserItem, ...users]
            }
            return this.comments
        },
        async comment () {
            try {
                this.newComment.name = this.user.name
                this.newComment.email = this.user.email
                this.newComment.reported = false
                this.newComment.postId = this.post._id
                this.newComment.userId = this.user._id

                const { success } = await this.$commentService.createComment(this.newComment, this.token)

                if (success) {
                    this.cleanComment()
                    await this.loadComments(this.post)
                }
                else {
                    this.$toast({
                        type: 'error',
                        position: 'top',
                        title: 'Error Commenting',
                        message: 'There was an error creating your comment.'
                    })
                }

            } catch (err) {
                console.log(err)
                this.$toast({
                    type: 'error',
                    position: 'top',
                    title: 'Error Commenting',
                    message: 'There was an error creating your comment.'
                })
            }
        },
        async edit (comment) {
            try {
                console.log('Editing: ', comment)
            } catch(err) {
                console.log(err)
            }
        },
        async deleteComment (comment) {
            try {
                if (confirm('Are you sure you want to delete this comment?')){
                    this.setState(STATES.COMMENTS_LOADING)
                    const { success } = await this.$commentService.deleteComment(comment, this.token)
                    if (success) {
                        this.$toast({
                            title: 'Comment Deleted',
                            message: 'Your comment was deleted.',
                            position: 'top'
                        })
                    } else {
                        this.$toast({
                            title: 'Error deleting',
                            type: 'error',
                            message: 'There was an error deleting your comment please try again.',
                            position: 'top'
                        })
                    }
                    this.setState(STATES.NONE)
                    await this.loadComments(this.post)
                }
            } catch(err) {
                this.$toast({
                    title: 'Error deleting',
                    type: 'error',
                    message: 'There was an error deleting your comment please try again.',
                    position: 'top'
                })
                this.setState(STATES.NONE)
            }
        },
        setCommentForReport(comment) {
            this.newReport.commentId = comment._id

            if (this.user && this.isAuthenticated) {
                this.newReport.name = this.user.name
                this.newReport.email = this.user.email
            }
            this.setReportModalVisibility(true)
        },
        async report () {
            try {
                this.setState(STATES.REPORTING)
                const {success} = await this.$reportService.report(this.newReport)
                if (success) {
                    this.setReportModalVisibility(false)
                    this.$toast({
                        title: 'Report received!',
                        message: 'Your report will be reviewed in the next 72 hours.',
                        position: 'bottom-right'
                    })
                } else {
                    this.$toast({
                        title: 'Error',
                        message: 'There was an error creating your report. Please try again.',
                        position: 'bottom-right',
                        type: 'error'
                    })
                }
            } catch(err) {
                console.log(err)
                this.$toast({
                    title: 'Error',
                    message: 'There was an error creating your report. Please try again.',
                    position: 'bottom-right',
                    type: 'error'
                })
            } finally {
                this.setState(STATES.NONE)
            }
        },
        toggleBookmark: debounce(function () {
            this._toggleBookmark()
        }, 300),
        async _toggleBookmark () {
            try {
                const copyUser = {...this.user}
                if (!copyUser.bookmarks) {
                    copyUser.bookmarks = []
                }
                const idx = copyUser.bookmarks.indexOf(this.post._id)
                let adding = false
                if (idx > -1) {
                    // we're removing the bookmark
                    copyUser.bookmarks.splice(idx, 1)
                } else {
                    // we're adding the bookmark
                    copyUser.bookmarks.push(this.post._id)
                    adding = true
                }

                const { success, user } = await this.$userService.updateUser(copyUser, this.token)
                if (success) {
                    this.$store.dispatch(USER_KEY, user)
                    this.$toast({
                        title: adding ? 'Post bookmarked!' : 'Bookmark removed!',
                        message: adding ? 'The post was saved to your bookmarks.' : 'The post was removed from your bookmarks.',
                        position: 'bottom-right',
                    })
                } else {
                    this.$toast({
                        title: 'Bookmark error!',
                        type: 'error',
                        message: 'There was an error removing or adding the bookmark.',
                        position: 'bottom-right',
                    })
                }
            } catch (err) {
                this.$toast({
                    title: 'Bookmark error!',
                    type: 'error',
                    message: 'There was an error removing or adding the bookmark.',
                    position: 'bottom-right',
                })
            }
        },
        incrementTotalReads () {
            try {
                this.$postService.incrementMetric({ _id: this.post._id }, METRIC_KEYS.TOTAL_READS)
            } catch (err) {
                console.log(err)
            }
        },
        incrementTotalViews () {
            try {
                this.$postService.incrementMetric({ _id: this.post._id }, METRIC_KEYS.TOTAL_VIEWS)
            } catch (err) {
                console.log(err)
            }
        },
    }
}
</script>

<style scoped>
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
.comment-hider {
    height: 80px;
    font-weight: bold;
    font-size: calc(var(--font-size) * 1.05);
}
.sort-order-items {
    flex: 0 0 60%;
}
.sort-user-items {
    flex: 0 0 40%;
}
</style>