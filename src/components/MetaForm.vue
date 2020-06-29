<template>
    <zen-box class="newMeta-form">
        <zen-box mt=".75rem" mb=".75rem">
                <zen-input v-model="newMeta.subtitle"
                    variant="flushed" 
                    class="artist mt-3 mb-3" 
                    name="newMeta-subtitle" 
                    placeholder="Subtitle" 
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
        meta: {
            type: Object
        }
    },
    data () {
        return {
            newMeta: {},
        }
    },
    mounted () {
        if (this.meta) {
            this.newMeta = {...this.meta}
        }
    },
    methods: {
        notify () {
            this.$emit('blur', this.newMeta)
        }
    }
}
</script>