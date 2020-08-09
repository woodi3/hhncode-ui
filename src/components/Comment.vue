<template>
    <zen-box class="comment">
        <zen-flex class="author mb-2" align="center">
            <zen-text bold class="name">
                {{comment.name}}
            </zen-text>
            <zen-text class="ml-2" color="dark-gray" fontSize="sm">
                {{updatedAt}}
            </zen-text>
        </zen-flex>
        <zen-flex class="content pt-2 pb-2" :style="contentStyles">
            {{comment.content}}
        </zen-flex>
        <zen-flex v-if="showViewMore" 
            class="view-more pt-2 pb-2" 
            justify="center">
            <zen-button class="view-more-btn text-dark-gray" 
                color="plain"
                :ariaLabel="viewMore ? 'Show less' : 'View more'"
                @click="toggleViewMore">
                {{viewMore ? 'Show less' : 'View more'}}
            </zen-button>
        </zen-flex>
        <zen-flex class="actions pt-1 pb-1">
            <!-- <zen-button v-if="isUser" 
                class="edit" 
                color="plain"
                ariaLabel="Edit comment"
                title="Edit comment"
                @click="edit">
                <v-icon :icon="['fas', 'pen']"/>
                <span class="sr-only">Edit comment</span>
            </zen-button> -->
            <zen-button v-if="isUser" 
                class="mr-2 delete" 
                color="plain-danger"
                ariaLabel="Delete comment"
                title="Delete comment"
                @click="deleteComment">
                <v-icon :icon="['fas', 'trash']"/>
                <span class="sr-only">Delete comment</span>
            </zen-button>
            <zen-button v-if="!isUser"
                class="report text-dark-gray" 
                color="plain"
                ariaLabel="Report comment"
                title="Report comment"
                @click="report">
                report
            </zen-button>
        </zen-flex>
        <divider width="100%" height="1px" color="gray-light"/>
    </zen-box>
</template>

<script>
import Divider from './Divider'

export default {
    components: {
        Divider,
    },
    props: {
        comment: {
            type: Object,
            required: true,
        },
        isUser: {
            type: Boolean,
        },
    },
    data () {
        return {
            viewMore: false,
        }
    },
    computed: {
        updatedAt () {
            const a = this.$dayjs()
            const b = this.$dayjs(this.comment.updatedAt)
            return b.from(a)
        },
        showViewMore () {
            return this.comment.content.length >= 600
        },
        contentStyles () {
            return {
                overflow: this.viewMore ? 'auto' : 'hidden', 
                maxHeight: this.viewMore ? '300px' : '150px',
            }
        }
    },
    methods: {
        edit () {
            this.$emit('edit', this.comment)
        },
        deleteComment () {
            this.$emit('delete', this.comment)
        },
        report () {
            this.$emit('report', this.comment)
        },
        toggleViewMore () {
            this.viewMore = !this.viewMore
        },
    },
}
</script>

<style scoped>
/* .comment > .actions > .report {
    margin-left: auto !important;
} */
</style>