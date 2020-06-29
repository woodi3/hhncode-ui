<template>
    <div class="checkbox">
        <input class="bg-primary" 
            type="checkbox" 
            :value="value" 
            :checked="shouldBeChecked"
            :aria-label="ariaLabel"
            :disabled="disabled" 
            @change="updateInput">
    </div>
</template>
<script>
export default {
    model: {
        prop: 'modelValue',
        event: 'change'
    },
    props: {
        value: [String, Boolean],
        modelValue: {
            default: false
        },
        trueValue: {
            default: true
        },
        falseValue: {
            default: false
        },
        disabled: {
            type: Boolean
        },
        ariaLabel: {
            type: String,
        }
    },
    computed: {
        shouldBeChecked() {
            // Note that `true-value` and `false-value` are camelCase in the JS
            return this.modelValue === this.trueValue
        }
    },
    methods: {
        updateInput(event) {
            let isChecked = event.target.checked
            this.$emit('change', isChecked ? this.trueValue : this.falseValue)
            this.$emit('nativeChange', isChecked ? this.trueValue : this.falseValue)
        }
    }
}
</script>

<style scoped>
.checkbox {
    position: relative;
    display: inline-block;
    padding-left: 1.25rem;
}
.checkbox > input {
    /* position: absolute; */
    margin-top: .3rem;
    margin-left: -1.25rem;
}
.checkbox > input:disabled {
    opacity: .65;
    cursor: not-allowed;
}
</style>