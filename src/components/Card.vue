<template>
    <zen-box class="card border-light" 
        d="flex" 
        flexDirection="column"
        bg="white"
        tabIndex="0"
        :w="width">
        <zen-box class="card-body"
            p="1.25rem">
            <slot></slot>
        </zen-box>
    </zen-box>
</template>

<script>
export default {
    name: "card",
    props: {
        width: {
            default: "75%"
        }
    },
}
</script>

<style scoped>
.card {
    /* position: relative; */
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    /* border-radius: .25rem; */
}
.card:focus {
    outline: none;
}
.card-body {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
}
</style>