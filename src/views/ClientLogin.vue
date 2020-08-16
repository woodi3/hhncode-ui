<template>
    <zen-flex class="login"
        justify="center"
        align="center">
        <card width="75%">
            <h2 class="header">
                Login to continue
            </h2>
            <zen-box mt=".75rem" mb=".75rem">
                <zen-input v-model="user.email"
                variant="flushed" 
                class="user-email mt-3 mb-3" 
                name="user-email" 
                placeholder="Email" 
                type="email" 
                required 
                :invalid="!emailIsValid"
                :disabled="isLoading"
                @input="typing('email')"
                @submit="login"
                />
                <zen-error-message v-if="!emailIsValid && emailStarted">
                    <span>
                        {{emailErrorMessage}}
                    </span>
                </zen-error-message>
            </zen-box>
            <zen-box mt=".75rem" mb=".75rem">
                <zen-input v-model="user.password"
                variant="flushed" 
                class="user-password" 
                name="user-password" 
                placeholder="Password" 
                type="password" 
                required 
                :invalid="!passwordIsValid" 
                :disabled="isLoading" 
                @input="typing('password')"
                @submit="login"/>
                <zen-error-message v-if="!passwordIsValid && passwordStarted">
                    <span>
                        {{passwordErrorMessage}}
                    </span>
                </zen-error-message>
            </zen-box>

            <zen-flex class="actions" direction="row" justify="center">
                <zen-button class="login-btn"
                size="block" 
                :disabled="disableLogin" 
                @click="login"
                :isLoading="isLoading">
                    Login
                </zen-button>
            </zen-flex>

            <zen-flex class="mt-3" align="center" justify="center">
                <zen-text fontSize="sm" class="mr-1">
                    Not subscribed?
                </zen-text>
                <zen-link to="/new-account" fontSize="sm">Join us</zen-link>
            </zen-flex>
        </card>
    </zen-flex>
</template>

<script>

import Card from '../components/Card'
import { HIDE_FOOTER_KEY } from '../store/nav'
import { INPUT_STATES } from '../utils'
import { TOKEN_KEY, IS_AUTHENTICATED_KEY, REDIRECT_KEY } from '../store/auth'
import { USER_KEY } from '../store/user'


export default {
    components: {
        Card
    },
    data () {
        return {
            user: {
                email: '',
                password: '',
            },
            inputStates: {
                email: INPUT_STATES.NONE,
                password: INPUT_STATES.NONE,
            },
            isLoading: false,
        }
    },
    mounted () {
        this.hideFooter()
    },
    beforeDestroy () {
        this.showFooter()
    },
    beforeRouteEnter (to, from, next) {
        next(async (vm) => {            
            if (vm.isAuthenticated) {
                await vm.$userService.redirect(vm.token, next, {name: 'account-settings'}, null)
            }
            else {
                next()
            }
        })
    },
    computed: {
        emailIsValid () {
            return this.hasValue(this.user.email) && this.validEmail(this.user.email)
        },
        passwordIsValid () {
            return this.hasValue(this.user.password)
        },
        emailErrorMessage () {
            if (!this.hasValue(this.user.email)){
                return `Your email is required!`
            }
            if (!this.validEmail(this.user.email)) {
                return `Please enter a valid email!`
            }
            return ``
        },
        passwordErrorMessage () {
            if (!this.hasValue(this.user.password)){
                return `Your password is required!`
            }
            return ``
        },
        disableLogin () {
            return !this.emailIsValid || !this.passwordIsValid
        },
        token () {
            return this.$store.state.token
        },
        emailStarted () {
            return this.inputStates.email === INPUT_STATES.STARTED
        },
        passwordStarted () {
            return this.inputStates.password === INPUT_STATES.STARTED
        },
        lastRoute () {
            return this.$store.state.lastRoute
        },
        redirect () {
            return this.$store.state.redirect
        },
        isAuthenticated () {
            return this.$store.state.isAuthenticated
        },
    },
    methods: {
        hideFooter () {
            this.$store.dispatch(HIDE_FOOTER_KEY, true)
        },
        showFooter () {
            this.$store.dispatch(HIDE_FOOTER_KEY, false)  
        },
        hasValue (val) {
            return val && val !== '' && val.trim() !== ''
        },
        validEmail (email) {
            const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(email.trim())
        },
        typing (input) {
            switch (input) {
                case 'email':
                    this.inputStates.email = INPUT_STATES.STARTED
                    break;
                case 'password':
                    this.inputStates.password = INPUT_STATES.STARTED
                    break;
                default:
                    console.log('typing no case!')
            }
        },
        async login () {
            try {
                if (this.disableLogin) {
                    return
                }
                this.isLoading = true
                
                const { success, access_token: token, user } = await this.$userService.login(this.user)
                if (success) {
                    this.$store.dispatch(TOKEN_KEY, token)
                    this.$store.dispatch(USER_KEY, user)
                    this.$store.dispatch(IS_AUTHENTICATED_KEY, true)
                    if (this.redirect) {
                        this.$router.replace(this.redirect)
                        this.$store.dispatch(REDIRECT_KEY, null)
                    } else {
                        this.$router.replace({name: 'account-settings'})    
                    }
                }
                
            } catch (err) {
                this.$toast({
                    type: 'error',
                    title: 'Error',
                    message: 'Incorrect email or password. Please try again.',
                    position: 'bottom-right',
                    duration: 5000
                })
            } finally {
                this.isLoading = false
            }
        },
    }
}
</script>
<style scoped>
.login { 
    min-height: 600px;
    max-width: 600px;
    margin: 0 auto;
}
.login .header {
    text-align: center;
    margin: 0;
}
/* .new-account .actions {
    width: 50%;
} */
</style>