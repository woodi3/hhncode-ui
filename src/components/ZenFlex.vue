<template>
    <zen-box
        :id="id"
        :d="'flex'"
        :alignItems="align"
        :flexDirection="direction"
        :justifyContent="justify"
        :flexWrap="wrap"
    >
        <slot></slot>
    </zen-box>
</template>

<script>
import ZenBox from './ZenBox'

export default {
    name: "z-flex",
    components: {
        ZenBox
    },
    props: {
        /**
         * Abbreviated for alignItems
         */
        align: {
            type: String,
            required: false,
        },
        /**
         * Abbreviated for flexDirection
         */
        direction: {
            type: String,
            required: false
        },
        /**
         * Abbreviated for justifyContent
         */
        justify: {
            type: String,
            required: false
        },
        /**
         * Abbreviated for flexWrap
         */
        wrap: {
            type: String,
            required: false
        },
    },
    data () {
        return {
            id: null
        }
    },
    mounted () {
        this.id = `zen${this._uid}`
    }
}
</script>