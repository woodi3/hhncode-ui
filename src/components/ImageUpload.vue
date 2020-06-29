<template>
    <zen-dialog :isOpen="isOpen" :closeOnOverlayClick="false">
        <zen-dialog-header @close="close">
            Image Upload
        </zen-dialog-header>
        <zen-dialog-body>
            <vue-dropzone ref="dropzone" 
                id="dropzone" 
                :options="dropzoneOptions"
                @vdropzone-success="handleUpload"
                @vdropzone-error="handleError"
            />
            <zen-box mt=".5rem" class="container" v-if="url">
                <img class="header" :src="url" />
            </zen-box>
        </zen-dialog-body>
        <zen-dialog-footer>
            <zen-button color="plain" class="ml-2 mr-2" @click="close">Cancel</zen-button>
            <zen-button @click="notify" :disabled="!url || sameUrl">Save</zen-button>
        </zen-dialog-footer>
    </zen-dialog>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import {ApiService} from '../services/api.service'

export default {
    components: {
        vueDropzone: vue2Dropzone,
    },
    props: {
        isOpen: {
            type: Boolean,
        },
        endpoint: {
            type: String,
            required: true,
        },
        item: {
            type: Object,
        },
        imgProp: {
            type: String,
        },
    },
    data () {
        return {
            dropzoneOptions: {
                thumbnailWidth: 150,
                maxFilesize: 5,
            },
            dropzone: null,
            image: null,
        }
    },
    mounted () {
        this.dropzoneOptions.url = ApiService.getUrl(this.endpoint)
        this.dropzoneOptions.headers = {
            'Authorization': this.token
        }
        
    },
    computed: {
        token () {
            return this.$store.state.token
        },
        url () {
            if (!this.image) {
                if (this.item && this.imgProp) {
                    return this.item[this.imgProp]
                }
            }
            else {
                return this.image.url
            }
            return null
        },
        sameUrl () {
            if (this.item && this.imgProp) {
                return this.url === this.item[this.imgProp]
            }
            return false
        },
    },
    methods: {
        close () {
            this.$emit('close')
            this.image = null
        },
        handleUpload(_, response) {
            const { success, image } = response 
            if (success) {
                this.image = image
            }
            else {
                this.$toast({
                    type: "error",
                    title: "Error",
                    message: "Error uploading, check logs!"
                })
            }
        },
        handleError(file, message, xhr) {
            console.log(`File: `, file)
            if (xhr) {
                console.log(`XHR: `, xhr)
            }
            this.$toast({
                type: "error",
                title: "Upload error",
                message,
            })
        },
        notify () {
            this.$emit('upload', this.image)
        }
    },
}
</script>

<style scoped>
.header {
    height: 300px;
    width: 300px;
}
</style>