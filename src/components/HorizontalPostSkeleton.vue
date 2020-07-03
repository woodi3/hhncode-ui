<template>
    <zen-box
        class="mt-4 mb-4 pt-2 pb-2">
        <zen-flex align="center">
            <zen-box f="0 0 33%">
                <zen-box w="150px" h="150px" class="horizontal-skeleton-thumbnail"></zen-box>
            </zen-box>
            <zen-box f="0 0 67%" class="pl-2">
                <zen-box h="42px" w="100%" class="horizontal-skeleton-title"></zen-box>
                <zen-flex class="mt-1 mb-1">
                    <zen-box v-for="n in 3" :key="n" h="32px" w="96px" class="horizontal-skeleton-badge mr-1">
                    </zen-box>
                </zen-flex>
                <zen-box h="16px" w="100%" class="horizontal-skeleton-timestamp"></zen-box>
            </zen-box>
        </zen-flex>
    </zen-box>
</template>

<style scoped>
div[class^="horizontal-skeleton"] {
    animation: pulse-bg 1s infinite;
}
@keyframes pulse-bg {
    0% { background-color: #ddd; }
    50% { background-color: #d0d0d0; }
    100% { background-color: #ddd; }
}
</style>