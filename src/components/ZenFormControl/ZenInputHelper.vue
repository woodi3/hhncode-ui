<template>
    <p :id="customId" class="zen-input-helper-text">
        <slot></slot>
    </p>
</template>

<script>
export default {
    name: 'zen-input-helper',
    props: {
        id: {
            type: String
        }
    },
    computed: {
        customId () {
            return this.id !== undefined ? this.id : `zen${this._uid}`
        }
    }
}
</script>
<style scoped>
.zen-input-helper-text {
    margin-top: 0.5rem;
    color: var(--gray-darker-color);
    line-height: normal;
    font-size: 0.875rem;
}
</style>