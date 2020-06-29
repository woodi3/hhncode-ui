<template>
    <zen-box class="newQuote-form">
        <zen-box mt=".75rem" mb=".75rem">
                <zen-input v-model="newQuote.author"
                    variant="flushed" 
                    class="text mt-3 mb-3" 
                    name="newQuote-author" 
                    placeholder="Author" 
                    type="text" 
                    required
                    :disabled="isLoading"
                    @blur.native="notify"
                />
            </zen-box>
            <zen-box mt=".75rem" mb=".75rem">
                <zen-input v-model="newQuote.text"
                    variant="flushed" 
                    class="newQuote-text mt-3 mb-3" 
                    name="newQuote-text" 
                    placeholder="Text" 
                    type="text" 
                    required
                    :disabled="isLoading"
                    @blur.native="notify"
                />
            </zen-box>
            <zen-box mt=".75rem" mb=".75rem">
                <zen-flex>
                    <zen-label>
                        Active
                    </zen-label>
                    <zen-checkbox v-model="newQuote.active" 
                        :disabled="isLoading"
                        @nativeChange="notify"/>
                </zen-flex>
            </zen-box>
    </zen-box>
</template>

<script>
// TODO
// Add validation for fields

export default {
    props: {
        isLoading: {
            type: Boolean
        },
        quote: {
            type: Object
        },
        quotes: {
            type: Array
        }
    },
    data () {
        return {
            newQuote: {},
        }
    },
    mounted () {
        if (this.quote) {
            this.newQuote = {...this.quote}
        }
    },
    methods: {
        notify () {
            const quotes = this.quotes
                .filter(q => q.active && q.text.toLowerCase() !== this.newQuote.text.toLowerCase())
            if (quotes.length > 0 && this.newQuote.active) {
                this.$toast({
                    type: 'warning',
                    title: 'Active already',
                    message: 'Only one quote can be active at a time.',
                    position: 'top'
                })
                return
            }
            if (this.newQuote.text.length >= 50) {
                this.$toast({
                    type: 'warning',
                    title: 'Text too long',
                    message: 'Keep the quote text less than 50 characters. Current length: '+this.newQuote.text.length,
                    position: 'top'
                })
                return
            }
            this.$emit('blur', this.newQuote)
        }
    }
}
</script>