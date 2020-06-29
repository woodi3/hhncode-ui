<template>
    <zen-box class="newFeature-form">
        <zen-box mt=".75rem" mb=".75rem">
                <zen-input v-model="newFeature.label"
                    variant="flushed" 
                    class="text mt-3 mb-3" 
                    name="newFeature-label" 
                    placeholder="Label" 
                    type="text" 
                    required
                    :disabled="isLoading"
                    @blur.native="notify"
                />
            </zen-box>
            <zen-box mt=".75rem" mb=".75rem">
                <zen-input v-model="newFeature.description"
                    variant="flushed" 
                    class="newFeature-description mt-3 mb-3" 
                    name="newFeature-description" 
                    placeholder="Description" 
                    type="text" 
                    required
                    :disabled="isLoading"
                    @blur.native="notify"
                />
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
        feature: {
            type: Object
        },
        features: {
            type: Array
        }
    },
    data () {
        return {
            newFeature: {},
        }
    },
    mounted () {
        if (this.feature) {
            this.newFeature = {...this.feature}
        }
    },
    methods: {
        notify () {
            const labels = this.features.map(t => t.label.toLowerCase())
            if (labels.indexOf(this.newFeature.label.toLowerCase()) > -1) {
                this.$toast({
                    type: 'warning',
                    title: 'Duplicate',
                    message: 'This feature exists already',
                    position: 'top'
                })
                return
            }
            this.$emit('blur', this.newFeature)
        }
    }
}
</script>