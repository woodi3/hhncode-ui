<template>
    <card :width="width"
        class="post-skeleton">
        <zen-box class="post-skeleton-img" h="200px" w="100%">
        </zen-box>
        <zen-flex justify="center">
            <zen-box v-for="n in 3" :key="n" h="32px" w="96px" class="post-skeleton-badge">
            </zen-box>
        </zen-flex>
        <zen-box class="post-skeleton-title mt-3 mb-3"
            h="48px" w="100%"></zen-box>
        <zen-box class="post-skeleton-timestamp" h="24px" w="100%">
        </zen-box>
    </card>
</template>

<script>
import Card from './Card'

export default {
    components: {
        Card,
    },
    props: {
        width: {
            type: String,
            default: "300px",
        },
    }
}
</script>

<style scoped>
.post-skeleton div[class^="post-skeleton"] {
    animation: pulse-bg 1s infinite;
}

@keyframes pulse-bg {
    0% { background-color: #ddd; }
    50% { background-color: #d0d0d0; }
    100% { background-color: #ddd; }
}
</style>