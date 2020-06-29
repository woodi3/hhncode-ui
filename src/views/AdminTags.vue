<template>
    <zen-box class="container tags">
        <zen-flex justify="space-between">
            <zen-button v-if="!showForm"
                class="ml-1 mr-1 mt-3" 
                aria-label="Add tag"
                :color="showForm ? 'plain' : 'outline-primary'"
                @click="toggleForm">
                {{showForm ? 'Cancel' : 'Add Tag'}}
            </zen-button>
        </zen-flex>
        <!-- TODO extract to its own component -->
        <zen-dialog :isOpen="showForm" :closeOnOverlayClick="false">
            <zen-dialog-header @close="showForm = false;">
                Add Tag
            </zen-dialog-header>
            <zen-dialog-body>
                <new-tag-form 
                    :isLoading="isCreating"
                    :tag="newTag"
                    :tags="tags"
                    @blur="handleBlur"
                />
            </zen-dialog-body>
            <zen-dialog-footer>
                <zen-button class="ml-2 mr-2" 
                    color="plain"
                    @click="toggleForm">
                    Cancel
                </zen-button>
                <zen-button ariaLabel="Save tag"
                    :disabled="addTagBtnDisabled"
                    @click="addTag">
                    Add
                </zen-button>
            </zen-dialog-footer>
        </zen-dialog>
        <zen-flex class="header" justify="space-between">
            <h3>Tag Name</h3>
            <h3>Color</h3>
            <h3>Actions</h3>
        </zen-flex>
        <zen-spinner class="spinner" v-if="loading" />
        <zen-box class="tag-list" v-else>
            <zen-flex class="tag-item"
                justify="space-between"
                align="center"
                v-for="tag of tags" :key="tag._id">
                <zen-text italic>{{tag.text}}</zen-text>
                <badge :text="tag.color" :color="tag.color"/>
                <zen-box>
                    <zen-button color="plain" @click="edit(tag)">
                        <v-icon :icon="['fas', 'pen']" />
                    </zen-button>
                    <zen-button color="plain-danger" @click="deleteTag(tag)">
                        <zen-spinner v-if="isDeleting" color="danger" size="sm"/>
                        <v-icon v-else :icon="['fas', 'trash']" />
                    </zen-button>
                </zen-box>
            </zen-flex>
        </zen-box>
    </zen-box>
</template>

<script>
import Badge from '../components/Badge'
import NewTagForm from '../components/NewTagForm'

export default {
    components: {
        Badge,
        NewTagForm,
    },
    data () {
        return {
            showForm: false,
            loading: false,
            isCreating: false,
            isDeleting: false,
            newTag: {
                text: '',
                description: '',
                color: '',
            },
            tags: [],
        }
    },
    mounted () {
        this.loadTags()
    },
    computed: {
        token () {
            return this.$store.state.token
        },
        addTagBtnDisabled () {
            return this.newTag.text === '' || this.newTag.color === ''
        }
    },
    methods: {
        toggleForm () {
            this.showForm = !this.showForm

            if (!this.showForm) {
                this.newTag = {
                    text: '',
                    description: '',
                    color: '',
                }
            }
        },
        handleBlur (tag) {
            this.newTag = {...tag}
        },
        edit (tag) {
            this.newTag = {...tag}
            this.toggleForm()
        },
        async loadTags () {
            try {
                this.loading = true
                const {success, tags} = await this.$tagService.getTags()
                if (success) {
                    this.tags = tags
                }
                this.loading = false
            } catch (err) {
                this.loading = false
            }
        },
        async addTag () {
            try {
                this.isCreating = true
                const { success } = await this.$tagService.createTag(this.newTag, this.token)
                
                if (this.showForm) {
                    this.toggleForm()
                }

                this.isCreating = false

                if (success) {
                    await this.loadTags()
                }

                this.$toast({
                    type: 'success', 
                    position: 'top', 
                    title: 'Created tag!', 
                    message: 'Created a new tag.'
                })

            } catch (err) {
                console.log(err)
                this.$toast({
                    type: 'error',
                    position: 'top',
                    title: 'Error creating tag',
                    message: 'Error creating new tag'
                })
            }
        },
        async deleteTag (tag) {
            try {
                this.isDeleting = true
                const { success } = await this.$tagService.deleteTag(tag, this.token)

                this.isDeleting = false
                if (success) {
                    await this.loadTags()
                }
                else {
                    this.$toast({
                        type: 'error',
                        position: 'top',
                        title: 'Error deleting tag',
                        message: 'Error deleting new tag'
                    })
                }

            } catch (err) {
                console.log(err) 
                this.isDeleting = false
                this.$toast({
                    type: 'error',
                    position: 'top',
                    title: 'Error deleting tag',
                    message: 'Error deleting new tag'
                })
            }
        }
    }
}
</script>

<style scoped>
.header {
    border-bottom: 1px solid var(--gray-rgb-light);
}
.tag-list {
    max-height: 700px;
    overflow-y: auto;
}
.tag-list > .tag-item {
    padding: calc(var(--spacing-rem) * 4) 0;
    border-bottom: 1px solid var(--gray-rgb-light);
}
.header > h3 {
    margin-top: calc(var(--spacing-rem) * 4);
    margin-bottom: calc(var(--spacing-rem) * 2);
}
.tags > .spinner {
    margin: 0 auto;
}
</style>