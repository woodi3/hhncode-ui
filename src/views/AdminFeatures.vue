<template>
    <zen-box class="container features">
        <zen-flex justify="space-between">
            <zen-button v-if="!showForm"
                class="ml-1 mr-1 mt-3" 
                aria-label="Add feature"
                :color="showForm ? 'plain' : 'outline-primary'"
                @click="toggleForm">
                {{showForm ? 'Cancel' : 'Add Feature'}}
            </zen-button>
        </zen-flex>
        <!-- TODO extract to its own component -->
        <zen-dialog :isOpen="showForm" :closeOnOverlayClick="false">
            <zen-dialog-header @close="showForm = false;">
                Add Feature
            </zen-dialog-header>
            <zen-dialog-body>
                <new-feature-form 
                    :isLoading="isCreating"
                    :feature="newFeature"
                    :features="features"
                    @blur="handleBlur"
                />
            </zen-dialog-body>
            <zen-dialog-footer>
                <zen-button class="ml-2 mr-2" 
                    color="plain"
                    @click="toggleForm">
                    Cancel
                </zen-button>
                <zen-button ariaLabel="Save feature"
                    :disabled="addFeatureBtnDisabled"
                    @click="addFeature">
                    Add
                </zen-button>
            </zen-dialog-footer>
        </zen-dialog>
        <zen-flex class="header" justify="space-between">
            <h3>Feature Label</h3>
            <h3>Description</h3>
            <h3>Actions</h3>
        </zen-flex>
        <zen-spinner class="spinner" v-if="loading" />
        <zen-box class="feature-list" v-else>
            <zen-flex class="feature-item"
                justify="space-between"
                align="center"
                v-for="feature of features" :key="feature._id">
                <zen-text italic>{{feature.label}}</zen-text>
                <zen-text>{{feature.description}}</zen-text>
                <zen-box>
                    <zen-button color="plain" @click="toggle(feature)">
                        <v-icon v-if="feature.enabled" :icon="['fas', 'check-square']" />
                        <v-icon v-else :icon="['far', 'square']" />
                    </zen-button>
                    <zen-button color="plain-danger" @click="deleteFeature(feature)">
                        <zen-spinner v-if="isDeleting" color="danger" size="sm"/>
                        <v-icon v-else :icon="['fas', 'trash']" />
                    </zen-button>
                </zen-box>
            </zen-flex>
        </zen-box>
    </zen-box>
</template>

<script>
import NewFeatureForm from '../components/NewFeatureForm'

const DEFAULT_FEATURE = {
    label: '',
    description: '',
    enabled: false,
    deleted: false,
}

export default {
    components: {
        NewFeatureForm,
    },
    data () {
        return {
            showForm: false,
            loading: false,
            isCreating: false,
            isDeleting: false,
            newFeature: {...DEFAULT_FEATURE},
            features: [],
        }
    },
    mounted () {
        this.loadFeatures()
    },
    computed: {
        token () {
            return this.$store.state.token
        },
        addFeatureBtnDisabled () {
            return this.newFeature.label === '' || this.newFeature.description === ''
        },
    },
    methods: {
        toggleForm () {
            this.showForm = !this.showForm

            if (!this.showForm) {
                this.newFeature = {...DEFAULT_FEATURE}
            }
        },
        handleBlur (feature) {
            this.newFeature = {...feature}
        },
        async toggle (feature) {
            feature.enabled = !feature.enabled
            this.newFeature = {...feature}
            await this.addFeature()
            this.newFeature = {...DEFAULT_FEATURE}
        },
        async loadFeatures () {
            try {
                this.loading = true
                const {success, features} = await this.$featureService.getFeatures()
                if (success) {
                    this.features = features
                }
                this.loading = false
            } catch (err) {
                this.loading = false
            }
        },
        async addFeature () {
            try {
                this.isCreating = true
                const { success } = await this.$featureService.createFeature(this.newFeature, this.token)
                
                if (this.showForm) {
                    this.toggleForm()
                }

                this.isCreating = false

                if (success) {
                    await this.loadFeatures()
                }

                this.$toast({
                    type: 'success', 
                    position: 'top', 
                    title: 'Created feature!', 
                    message: 'Created a new feature.'
                })

            } catch (err) {
                console.log(err)
                this.$toast({
                    type: 'error',
                    position: 'top',
                    title: 'Error creating feature',
                    message: 'Error creating new feature'
                })
            }
        },
        async deleteFeature (feature) {
            try {
                if (confirm('Are you sure you want to delete?')) {
                    this.isDeleting = true
                    feature.deleted = true
                    const { success } = await this.$featureService.createFeature(feature, this.token)

                    this.isDeleting = false
                    if (success) {
                        await this.loadFeatures()
                    }
                    else {
                        this.$toast({
                            type: 'error',
                            position: 'top',
                            title: 'Error deleting feature',
                            message: 'Error deleting new feature'
                        })
                    }
                }
            } catch (err) {
                console.log(err) 
                this.isDeleting = false
                this.$toast({
                    type: 'error',
                    position: 'top',
                    title: 'Error deleting feature',
                    message: 'Error deleting new feature'
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
.feature-list {
    max-height: 700px;
    overflow-y: auto;
}
.feature-list > .feature-item {
    padding: calc(var(--spacing-rem) * 4) 0;
    border-bottom: 1px solid var(--gray-rgb-light);
}
.header > h3 {
    margin-top: calc(var(--spacing-rem) * 4);
    margin-bottom: calc(var(--spacing-rem) * 2);
}
.features > .spinner {
    margin: 0 auto;
}
</style>