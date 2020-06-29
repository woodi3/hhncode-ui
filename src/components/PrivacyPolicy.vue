<template>
    <zen-box class="privacy-policy" v-html="privacyPolicy">
    </zen-box>
</template>

<script>
export default {
    props: {
        privacyPolicy: {
            type: String,
        }
    }
}
</script>