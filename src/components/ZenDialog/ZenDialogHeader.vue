<template>
    <header class="zen-dialog-header pt-4 pb-4 pl-6 pr-6 font-lg">
        <zen-box>
            <slot></slot>
        </zen-box>
        <zen-button 
            v-if="showCloseBtn"
            class="zen-dialog-close-btn"
            :color="closeBtnColor" 
            @click="close">
            <span class="sr-only">Close</span>
            <v-icon :icon="['fas', 'times']" />
        </zen-button>
    </header>
</template>

<script>
import ZenButton from '../ZenButton'
import ZenBox from '../ZenBox'

export default {
    name: `zen-dialog-header`,
    components: {
        ZenButton,
        ZenBox,
    },
    props: {
        showCloseBtn: {
            type: Boolean,
            default: true
        },
        closeBtnColor: {
            type: String,
            default: 'plain-danger',
        }
    },
    methods: {
        close () {
            this.$emit('close')
        }
    }
}
</script>
<style scoped>
.zen-dialog-header {
    font-weight: bold;
    position: relative;
}
.zen-dialog-close-btn {
    position: absolute;
    top: calc(var(--spacing-rem) * 2);
    right: calc(var(--spacing-rem) * 2);
}
</style>