<template>
    <zen-dialog :height="height"
        :isOpen="isOpen" 
        :closeOnOverlayClick="false">
        <zen-dialog-header :showCloseBtn="showCloseBtn">
            <h3>{{title}}</h3>
        </zen-dialog-header>
        <zen-dialog-body>
            <template v-if="loading">
                <zen-box h="400px">
                    <app-loader h="100%" />
                </zen-box>
            </template>
            <zen-box v-else>
                <h3>{{prompt}}</h3>
                <p>
                    {{description}}
                </p>
            </zen-box>
        </zen-dialog-body>
        <zen-dialog-footer>
            <zen-button color="plain" 
                class="ml-2 mr-2" 
                :disabled="loading" 
                @click="notifyCancel">{{cancelText}}</zen-button>
            <zen-button :color="confirmBtnType" 
                :disabled="loading" 
                :isLoading="loading" 
                @click="notifyConfirm">
                {{confirmText}}
            </zen-button>
        </zen-dialog-footer>
    </zen-dialog>
</template>

<script>
import AppLoader from './AppLoader'

export default {
    components: {
        AppLoader,
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        prompt: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        loading: {
            type: Boolean,
            required: false,
        },
        cancelText: {
            type: String,
            default: 'Cancel',
        },
        confirmText: {
            type: String,
            default: 'Confirm',
        },
        confirmBtnType: {
            type: String,
            default: 'primary',
        },
        showCloseBtn: {
            type: Boolean,
        },
        height: {
            type: String,
            default: "350px",
        },
    },
    methods: {
        notifyCancel () {
            this.$emit('cancel')
        },
        notifyConfirm () {
            this.$emit('confirm')
        },
    },
}
</script>

<style scoped>

</style>