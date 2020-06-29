<template>
    <zen-box class="new-newTag-form">
        <zen-box mt=".75rem" mb=".75rem">
                <zen-input v-model="newTag.text"
                    variant="flushed" 
                    class="text mt-3 mb-3" 
                    name="newTag-text" 
                    placeholder="Text" 
                    type="text" 
                    required
                    :disabled="isLoading"
                    @blur.native="notify"
                />
            </zen-box>
            <zen-box mt=".75rem" mb=".75rem">
                <zen-input-group>
                    <zen-input-element position="right">
                        <v-icon :style="{color: newTag.color}" :icon="['fas', 'box']"/>
                    </zen-input-element>
                    <zen-input v-model="newTag.color"
                        variant="flushed" 
                        class="newTag-color mt-3 mb-3" 
                        name="newTag-color" 
                        placeholder="Color" 
                        type="text" 
                        required
                        :disabled="isLoading"
                        @blur.native="notify"
                    />
                </zen-input-group>
            </zen-box>
            <zen-box mt=".75rem" mb=".75rem">
                <zen-input v-model="newTag.description"
                    variant="flushed" 
                    class="newTag-description" 
                    name="newTag-description" 
                    placeholder="Description" 
                    type="text" 
                    required
                    :disabled="isLoading" 
                    @blur.native="notify" />
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
        tag: {
            type: Object
        },
        tags: {
            type: Array
        }
    },
    data () {
        return {
            newTag: {},
        }
    },
    mounted () {
        if (this.tag) {
            this.newTag = {...this.tag}
        }
    },
    methods: {
        notify () {
            const colors = this.tags.map(t => t.color.toLowerCase())
            const labels = this.tags.map(t => t.text.toLowerCase())
            if (colors.indexOf(this.newTag.color.toLowerCase()) > -1 
            || labels.indexOf(this.newTag.text.toLowerCase()) > -1) {
                this.$toast({
                    type: 'warning',
                    title: 'Duplicate',
                    message: 'This tag exists already',
                    position: 'top'
                })
                return
            }
            this.$emit('blur', this.newTag)
        }
    }
}
</script>