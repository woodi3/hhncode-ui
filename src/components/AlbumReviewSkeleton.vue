<template>
    <zen-box class="mt-4 mb-4">
        <zen-flex wrap="wrap">
            <zen-box v-for="n in 3" :key="n" h="32px" w="96px" class="post-skeleton-badge ml-1 mr-1">
            </zen-box>
        </zen-flex>
        <zen-box class="post-skeleton-title mt-3 mb-3"
            h="48px" w="100%">
        </zen-box>
    </zen-box>
</template>

<style scoped>
div[class^="post-skeleton"] {
    animation: pulse-bg 1s infinite;
}
@keyframes pulse-bg {
    0% { background-color: #ddd; }
    50% { background-color: #d0d0d0; }
    100% { background-color: #ddd; }
}
</style>