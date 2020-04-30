<template>
    <label class="zen-label" :for="htmlFor">
        <slot></slot>
    </label>
</template>

<script>
export default {
    name: 'zen-label',
    props: {
        htmlFor: {
            type: String,
            default: ''
        }
    }
}
</script>
<style scoped>
.zen-label {
    padding-right: calc(var(--spacing-rem) * 4);
    padding-bottom: var(--spacing-rem);
    opacity: 1;
    font-weight: 500;
    text-align: left;
    vertical-align: middle;
    display: inline-block;
}
.zen-label.required::after{
   content:"*" ;
   color:red;
   padding-left: var(--spacing-rem);
}
</style>