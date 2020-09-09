<template>
    <zen-flex class="unsubscribe container" 
        align="center" 
        justify="center"
        wrap="wrap">
        <zen-box f="0 0 100%" class="text-center">
            <h2>Unsubscribe from all email notifications</h2>
            <zen-text italic class="mt-2">
                By unsubscribing, you will not receive anymore email notificaitons.
            </zen-text>
        </zen-box>
        <zen-box f="0 0 100%" mr="auto" ml="auto">
            <zen-input-group>
                <zen-input-element>
                    <span class="sr-only">Email icon</span>
                    <v-icon :class="emailIsValid ? 'text-primary' : 'text-danger'" :icon="['fas', 'envelope']"/>
                </zen-input-element>
                <zen-input
                    v-model="email"
                    variant="flushed" 
                    class="name mt-3 mb-1" 
                    name="user-emai" 
                    placeholder="Enter your email..." 
                    type="email"
                    :invalid="!emailIsValid"
                    :disabled="unsubscribing"
                    @input="typing()"
                />
            </zen-input-group>
        </zen-box>
        <zen-flex style="flex: 0 0 75%" justify="center">
            <zen-button color="plain" 
                class="mr-2" 
                @click="goHome">Stay Subscribed</zen-button>
            <zen-button color="danger"
                :disabled="unsubscribing || !emailIsValid"
                :isLoading="unsubscribing" 
                @click="unsubscribe">Unsubscribe</zen-button>
        </zen-flex>
    </zen-flex>
</template>

<script>
import { HIDE_FOOTER_KEY } from '../store/nav'
import { INPUT_STATES, hasValue, validEmail } from '../utils'

const STATES = {
    NONE: 'none',
    UNSUBSCRIBING: 'unsubscribing',
}

export default {
    props: {
        e: {
            type: String,
        },
    },
    data () {
        return {
            state: STATES.NONE,
            email: '',
            inputStates: {
                email: INPUT_STATES.NONE,
            },
        }
    },
    mounted () {
        this.hideFooter()
        if (this.e !== undefined && this.e.trim() !== '') {
            this.email = this.e
        }
    },
    beforeDestroy () {
        this.showFooter()
    },
    computed: {
        unsubscribing () {
            return this.state === STATES.UNSUBSCRIBING
        },
        emailIsValid () {
            return hasValue(this.email) && validEmail(this.email)
        },
        emailStarted () {
            return this.inputStates.email === INPUT_STATES.STARTED
        },
    },
    methods: {
        hideFooter () {
            this.$store.dispatch(HIDE_FOOTER_KEY, true)
        },
        showFooter () {
            this.$store.dispatch(HIDE_FOOTER_KEY, false)  
        },
        typing () {
            this.inputStates.email = INPUT_STATES.STARTED
        },
        goHome () {
            this.$router.replace('/')
        },
        async unsubscribe () {
            try {
                this.state = STATES.UNSUBSCRIBING
                const { success } = await this.$userService.unsubscribe({ email: this.email })
                if (success) {
                    this.$toast({
                        title: 'Unsubscribed',
                        message: 'You have unsubscribed successfully.',
                        position: 'top',
                        duration: 4000,
                    })
                    this.$router.replace({name: 'home'})
                }
                else {
                    this.$toast({
                        type: 'error',
                        title: 'Error',
                        message: 'There was an error deleting unsubscribing. Please try again.',
                        position: 'top'
                    })
                }
            } catch (err) {
                this.$toast({
                    type: 'error',
                    title: 'Error',
                    message: 'There was an error deleting unsubscribing. Please try again.',
                    position: 'top'
                })
            } finally {
                this.state = STATES.NONE
                this.inputStates.email = INPUT_STATES.NONE
            }
        },
    }
}
</script>

<style scoped>
h2 {
    margin: 0;
}
</style>