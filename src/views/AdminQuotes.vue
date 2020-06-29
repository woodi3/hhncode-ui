<template>
    <zen-box class="container quotes">
        <zen-flex justify="space-between">
            <zen-button v-if="!showForm"
                class="ml-1 mr-1 mt-3" 
                aria-label="Add Quote"
                :color="showForm ? 'plain' : 'outline-primary'"
                @click="toggleForm">
                {{showForm ? 'Cancel' : 'Add Quote'}}
            </zen-button>
        </zen-flex>
        <!-- TODO extract to its own component -->
        <zen-dialog :isOpen="showForm" :closeOnOverlayClick="false">
            <zen-dialog-header @close="showForm = false;">
                Add Quote
            </zen-dialog-header>
            <zen-dialog-body>
                <new-quote-form 
                    :isLoading="isCreating"
                    :quote="newQuote"
                    :quotes="quotes"
                    @blur="handleBlur"
                />
            </zen-dialog-body>
            <zen-dialog-footer>
                <zen-button class="ml-2 mr-2" 
                    color="plain"
                    @click="toggleForm">
                    Cancel
                </zen-button>
                <zen-button ariaLabel="Save quote"
                    :disabled="addQuoteBtnDisabled"
                    @click="addQuote">
                    Add
                </zen-button>
            </zen-dialog-footer>
        </zen-dialog>
        <zen-flex class="header" justify="space-between">
            <h3>Author</h3>
            <h3>Text</h3>
            <h3>Actions</h3>
        </zen-flex>
        <zen-spinner class="spinner" v-if="loading" />
        <zen-box class="quote-list" v-else>
            <zen-flex class="quote-item pt-2 pb-2 pl-1 pr-1"
                justify="space-between"
                align="center"
                v-for="quote of quotes" :key="quote._id"
                :class="{'bg-primary-light': quote.active }">
                <zen-text italic>{{quote.author}}</zen-text>
                <zen-text>{{quote.text}}</zen-text>
                <zen-box>
                    <zen-button color="plain" @click="edit(quote)">
                        <v-icon :icon="['fas', 'pen']" />
                    </zen-button>
                    <zen-button color="plain-danger" @click="deleteQuote(quote)">
                        <zen-spinner v-if="isDeleting" color="danger" size="sm"/>
                        <v-icon v-else :icon="['fas', 'trash']" />
                    </zen-button>
                </zen-box>
            </zen-flex>
        </zen-box>
    </zen-box>
</template>

<script>
import NewQuoteForm from '../components/NewQuoteForm'

const DEFAULT_QUOTE = {
    text: '',
    author: '',
    active: false,
}

export default {
    components: {
        NewQuoteForm,
    },
    data () {
        return {
            showForm: false,
            loading: false,
            isCreating: false,
            isDeleting: false,
            newQuote: {...DEFAULT_QUOTE},
            quotes: [],
        }
    },
    mounted () {
        this.loadQuotes()
    },
    computed: {
        token () {
            return this.$store.state.token
        },
        addQuoteBtnDisabled () {
            return this.newQuote.text === '' || this.newQuote.author === ''
        }
    },
    methods: {
        toggleForm () {
            this.showForm = !this.showForm

            if (!this.showForm) {
                this.newQuote = {...DEFAULT_QUOTE}
            }
        },
        handleBlur (quote) {
            this.newQuote = {...quote}
        },
        edit (quote) {
            this.newQuote = {...quote}
            this.toggleForm()
        },
        async loadQuotes () {
            try {
                this.loading = true
                const {success, quotes} = await this.$quoteService.getQuotes()
                if (success) {
                    this.quotes = quotes
                }
                this.loading = false
            } catch (err) {
                this.loading = false
            }
        },
        async addQuote () {
            try {
                this.isCreating = true
                const { success } = await this.$quoteService.createQuote(this.newQuote, this.token)
                
                if (this.showForm) {
                    this.toggleForm()
                }

                this.isCreating = false

                if (success) {
                    await this.loadQuotes()
                }

                this.$toast({
                    type: 'success', 
                    position: 'top', 
                    title: 'Created quote!', 
                    message: 'Created a new quote.'
                })

            } catch (err) {
                console.log(err)
                this.$toast({
                    type: 'error',
                    position: 'top',
                    title: 'Error creating quote',
                    message: 'Error creating new quote'
                })
            }
        },
        async deleteQuote (quote) {
            try {
                this.isDeleting = true
                const { success } = await this.$quoteService.deleteQuote(quote, this.token)

                this.isDeleting = false
                if (success) {
                    await this.loadQuotes()
                }
                else {
                    this.$toast({
                        type: 'error',
                        position: 'top',
                        title: 'Error deleting quote',
                        message: 'Error deleting new quote'
                    })
                }

            } catch (err) {
                console.log(err) 
                this.isDeleting = false
                this.$toast({
                    type: 'error',
                    position: 'top',
                    title: 'Error deleting quote',
                    message: 'Error deleting new quote'
                })
            }
        }
    }
}
</script>