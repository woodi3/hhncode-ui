<template>
    <zen-box
    :w="width"
    :h="height"
    :bg="color"
    :mt="mt"
    :mb="mb"
    mr="auto"
    ml="auto"></zen-box>
</template>

<script>
export default {
    props: {
        width: {
            default: "33%"
        },
        height: {
            default: "4px"
        },
        color: {
            default: "primary-dark"
        },
        mt: {
            default: "16px"
        },
        mb: {
            default: "16px"
        },
    }
}
</script>