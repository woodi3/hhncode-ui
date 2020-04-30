<template>
    <zen-box class="zen-form-control"
        :class="{disabled: disabled}"
        :id="id"
        :ref="'zenFormControl'">
        <slot></slot>
        <zen-error-message v-if="invalid && errorMessage && errorMessage !== ''">
            {{errorMessage}}
        </zen-error-message>
    </zen-box>
</template>

<script>
/**
 * TODO
 * Create Form components
 * - Input
 *      - Have setting for loading
 * - Textarea
 * - Checkbox
 *      - Make the checkbox able to turn into a switch
 * - Radio Button
 */
import ZenBox from '../ZenBox'
import ZenErrorMessage from '../ZenErrorMessage'

export default {
    name: "zen-form-control",
    components: {
        ZenBox,
        ZenErrorMessage,
    },
    props: {
        errorMessage: {
            type: String,
        },
        invalid: {
            type: Boolean
        },
        required: {
            type: Boolean
        },
        disabled: {
            type: Boolean
        },
        readonly: {
            type: Boolean
        }
    },
    data () {
        return {
            id: null,
        }
    },
    mounted () {
        this.id = `zen${this._uid}`
        this.setChildProps()
    },
    methods: {
        setChildProps () {
            const formControl = this.$refs.zenFormControl
            const vueChildren = formControl.$children
            vueChildren.forEach(child => {
                const el = child.$el
                const props = child.$props;
                if (props) {
                    if (props.required !== undefined) {
                        el.required = this.required
                    }
                    if (props.invalid !== undefined) {
                        el.setAttribute('aria-invalid', this.invalid)
                    }
                    if (props.disabled !== undefined) {
                        el.disabled = this.disabled
                    }
                    if (props.readonly !== undefined) {
                        el.readOnly = this.readonly
                    }
                    if (this.required && el.tagName === `LABEL`) {
                        el.classList.add('required')
                    }
                }
            })
        }
    }
}
</script>