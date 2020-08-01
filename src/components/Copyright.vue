<template>
    <zen-flex class="copyright bg-black pl-6 pr-6" align="center" justify="space-between">
        <zen-text color="lightgray" fontSize="sm">
            &copy; {{copyright.year}} {{copyright.name}}. All rights reserved
        </zen-text>
        <zen-button color="plain" size="sm" 
            @click="open" 
            @mouseover.native="setPrivacyPolicyHover(true)" 
            @mouseleave.native="setPrivacyPolicyHover(false)">
            <zen-text :color="privacyPolicyHover ? 'dark-primary' : 'gray'" fontSize="sm">Privacy Policy</zen-text>
        </zen-button>
        <zen-dialog class="text-black" :isOpen="privacyPolicyOpen" @close="close">
            <zen-dialog-header @close="close">
                Privacy Policy
            </zen-dialog-header>
            <zen-dialog-body style="padding-bottom: 100px;">
                <app-loader v-if="loading" height="50%" />
                <privacy-policy v-else :privacyPolicy="privacyPolicy"/>
            </zen-dialog-body>
            <zen-dialog-footer>
                <zen-button color="plain" @click="close">Close</zen-button>
            </zen-dialog-footer>
        </zen-dialog>
      </zen-flex>
</template>

<script>
import AppLoader from './AppLoader'
import PrivacyPolicy from './PrivacyPolicy'

export default {
    components: {
        PrivacyPolicy,
        AppLoader,
    },
    data () {
        return {
            privacyPolicyOpen: false,
            privacyPolicy: '',
            loading: true,
            privacyPolicyHover: false,
        }
    },
    computed: {
        copyright () {
            return {
                year: this.$dayjs().format('YYYY'),
                name: 'Hip Hop and Code',
            }
        }
    },
    methods: {
        close () {
            this.privacyPolicyOpen = false
        },
        open () {
            this.getPrivacyPolicy()
            this.privacyPolicyOpen = true
        },
        setPrivacyPolicyHover (val) {
            this.privacyPolicyHover = val
        },
        async getPrivacyPolicy () {
            try {
                this.loading = true
                const { success, privacyPolicy } = await this.$privacyPolicyService.get()
                if (success) {
                    this.privacyPolicy = privacyPolicy
                }
            } catch (err) {
                console.log(err)
            } finally {
                this.loading = false
            }
        },
    }
}
</script>

<style scoped>
.copyright {
    /* background-color: #003c27; */
    height: 52px;
}
</style>