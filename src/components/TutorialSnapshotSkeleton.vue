<template>
    <zen-box
        class="mt-4 mb-4 pt-2 pb-2"
        w="80%"
        mr="auto"
        ml="auto">
        <zen-flex align="center">
            <zen-box w="33%">
                <zen-box m="0 auto" w="100px" h="100px" class="tutorial-skeleton-thumbnail"></zen-box>
            </zen-box>
            <zen-box w="67%" class="content">
                <zen-box h="42px" w="100%" class="tutorial-skeleton-title"></zen-box>
                <zen-flex class="mt-1 mb-1">
                    <zen-box v-for="n in 3" :key="n" h="32px" w="96px" class="tutorial-skeleton-badge ml-1 mr-1">
                    </zen-box>
                </zen-flex>
                <zen-box h="16px" w="100%" class="tutorial-skeleton-timestamp"></zen-box>
            </zen-box>
        </zen-flex>
    </zen-box>
</template>

<style scoped>
div[class^="tutorial-skeleton"] {
    animation: pulse-bg 1s infinite;
}
@keyframes pulse-bg {
    0% { background-color: #ddd; }
    50% { background-color: #d0d0d0; }
    100% { background-color: #ddd; }
}
</style>