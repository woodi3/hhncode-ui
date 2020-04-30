<template>
    <input 
        :aria-label="ariaLabel"
        :aria-describedby="ariaDescribedBy"
        :class="classes"
        :disabled="disabled"
        :id="customId"
        :aria-invalid="invalid"
        :name="name"
        :placeholder="placeholder"
        :required="required"
        :readonly="readonly"
        :ref="'zenInput'"
        :title="title"
        :type="type"
        :value="value"
        @input="updateInput()"
    />
</template>

<script>
export default {
    name: "zen-input",
    props: {
        ariaLabel: {
            type: String,
            default: ''
        },
        ariaDescribedBy: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean
        },
        focusBorderColor: {
            type: String,
            default: 'primary'
        },
        id: {
            type: String,
        },
        invalid: {
            type: Boolean
        },
        name: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean
        },
        readonly: {
            type: Boolean
        },
        size: {
            type: String,
            default: "md"
        },
        title: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: "text",
        },
        variant: {
            type: String,
            default: "outline"
        },
        value: {
            required: false
        },
    },
    computed: {
        classes () {
            return [
                `zen-input`,
                this.variantClass,
                this.focusBorderColorClass
            ]
        },
        customId () {
           return this.id !== undefined ? this.id : `zen${this._uid}`
        },
        focusBorderColorClass () {
            switch (this.focusBorderColor.toLowerCase()) {
                case `accent`:
                    return `focus-border-color-accent`
                case `primary`:
                    return `focus-border-color-primary`
                default:
                    return `focus-border-color-primary`
            }
        },
        variantClass () {
            switch (this.variant.toLowerCase()) {
                case `flushed`:
                    return `zen-input-flushed`
                case `outline`:
                    return `zen-input-outline`
                default:
                    return `zen-input-outline`
            }
        },
    },
    methods: {
        updateInput() {
            this.$emit('input', this.$refs.zenInput.value)
        }
    }
}
</script>
<style scoped>
.zen-input {
    width: 100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    -webkit-appearance: none;
    font-size: var(--font-size);
    padding-left: 1rem;
    padding-right: 1rem;
    height: 2.5rem;
    background-color: var(--white-color);
    transition: all 0.2s ease 0s;
    outline: none;
    border-style: solid;
    border-image: initial;
    border-color: var(--gray-lighter-color);
}
.zen-input:disabled, .zen-form-control.disabled {
    opacity: .65;
    cursor: not-allowed;
}
.zen-input-sm {
    height: calc(var(--input-height) * .75);
    font-size: var(--font-size-sm);
}
.zen-input-lg {
    height: calc(var(--input-height) * 1.25);
    font-size: var(--font-size-lg);
}

.zen-input-outline {
    border-radius: var(--spacing-rem);
    border-width: 2px;
}
.zen-input-flushed {
    border-width: 0px 0px 2px 0px;
}
.zen-input.zen-input-element-left-sm {
    padding-left: calc(var(--font-size) * 2);
}
.zen-input.zen-input-element-right-sm {
    padding-right: calc(var(--font-size) * 2);
}
.zen-input.zen-input-element-left-md {
    padding-left: calc(var(--font-size) * 2.5);
}
.zen-input.zen-input-element-right-md {
    padding-right: calc(var(--font-size) * 2.5);
}
.zen-input.zen-input-element-left-lg {
    padding-left: calc(var(--font-size) * 3);
}
.zen-input.zen-input-element-right-lg {
    padding-right: calc(var(--font-size) * 3);
}
.zen-input[aria-invalid="true"], .zen-textarea[aria-invalid="true"] {
    border-color: var(--danger-color) !important;
}
</style>