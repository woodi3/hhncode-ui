<template>
    <zen-box :d="'flex'" :mt="'.5rem'" alignItems="center" class="text-danger">
        <v-icon :icon="['fas', 'exclamation-circle']" style="margin-right: .25rem;"/>
        <slot></slot>
    </zen-box>
</template>

<script>
import ZenBox from './ZenBox'
export default {
    name: 'zen-error-message',
    components: {
        ZenBox
    }
}
</script>