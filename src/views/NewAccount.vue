<template>
    <zen-flex class="new-account"
        justify="center"
        align="center">
        <card width="75%">
            <h2 class="header">
                Join Us
            </h2>
            <zen-box mt=".75rem" mb=".75rem">
                <zen-input v-model="user.name"
                variant="flushed" 
                class="name mt-3 mb-3" 
                name="user-name" 
                placeholder="Name" 
                type="text" 
                required
                :invalid="!nameIsValid" 
                :disabled="isLoading"
                @input="typing('name')"
                @submit="register"
                />
                <zen-error-message v-if="!nameIsValid && nameStarted">
                    <span>
                        {{nameErrorMsg}}
                    </span>
                </zen-error-message>
            </zen-box>
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
                @submit="register"
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
                @submit="register"/>
                <zen-error-message v-if="!passwordIsValid && passwordStarted">
                    <span>
                        {{passwordErrorMessage}}
                    </span>
                </zen-error-message>
            </zen-box>

            <zen-flex class="actions" direction="row" justify="center">
                <zen-button size="block" 
                :disabled="disableJoin" 
                @click="register"
                :isLoading="isLoading">Join</zen-button>
            </zen-flex>

            <zen-flex class="mt-3" align="center" justify="center">
                <zen-text fontSize="sm" class="mr-1">
                    Already joined?
                </zen-text>
                <zen-link accent to="/login" fontSize="sm">Login</zen-link>
            </zen-flex>
        </card>
    </zen-flex>
</template>

<script>
import { hasValue, validEmail, INPUT_STATES } from '../utils'
import Card from '../components/Card'
import { TOKEN_KEY, IS_AUTHENTICATED_KEY, REDIRECT_KEY } from '../store/auth'
import { USER_KEY } from '../store/user'
import { HIDE_FOOTER_KEY } from '../store/nav'

const MAX_PASS = 6

export default {
    components: {
        Card
    },
    data () {
        return {
            user: {
                name: '',
                email: '',
                password: ''
            },
            inputStates: {
                name: INPUT_STATES.NONE,
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
        nameIsValid () {
            return hasValue(this.user.name)
        },
        emailIsValid () {
            return hasValue(this.user.email) && validEmail(this.user.email)
        },
        passwordIsValid () {
            return hasValue(this.user.password) && this.user.password.length >= MAX_PASS
        },
        nameErrorMsg () {
            return `Your name is required!`
        },
        emailErrorMessage () {
            if (!hasValue(this.user.email)){
                return `Your email is required!`
            }
            if (!validEmail(this.user.email)) {
                return `Please enter a valid email!`
            }
            return ``
        },
        passwordErrorMessage () {
            if (!hasValue(this.user.password)){
                return `Your password is required!`
            }
            if (this.user.password.length < MAX_PASS) {
                return `Password must be at least 6 characters!`
            }
            return ``
        },
        disableJoin () {
            return !this.nameIsValid || !this.emailIsValid || !this.passwordIsValid
        },
        token () {
            return this.$store.state.token
        },
        nameStarted () {
            return this.inputStates.name === INPUT_STATES.STARTED
        },
        emailStarted () {
            return this.inputStates.email === INPUT_STATES.STARTED
        },
        passwordStarted () {
            return this.inputStates.password === INPUT_STATES.STARTED
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
        typing (input) {
            switch (input) {
                case 'name':
                    this.inputStates.name = INPUT_STATES.STARTED
                    break;
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
        hasValue (val) {
            return val && val !== '' && val.trim() !== ''
        },
        validEmail (email) {
            const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(email.trim())
        },
        async register () {
            try {
                if (this.disableJoin) {
                    return
                }
                this.isLoading = true
                
                const { success, access_token: token, user } = await this.$userService.registerUser(this.user)
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
                this.isLoading = false
                
            } catch (err) {
                console.error(err)
                this.isLoading = false
            }
        }
    }
}
</script>
<style scoped>
.new-account { 
    min-height: 600px;
    max-width: 600px;
    margin: 0 auto;
}
.new-account .header {
    text-align: center;
    margin: 0;
}
/* .new-account .actions {
    width: 50%;
} */
</style>