<template>
    <zen-flex class="login"
        justify="center"
        align="center">
        <zen-spinner v-if="isLoading"/>
        <card v-else width="75%">
            <h2 class="header">
                Admin Login
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
                :disabled="authenticating"
                @submit="login"
                />
                <zen-error-message v-if="!emailIsValid">
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
                :disabled="authenticating" 
                @submit="login"/>
                <zen-error-message v-if="!passwordIsValid">
                    <span>
                        {{passwordErrorMessage}}
                    </span>
                </zen-error-message>
            </zen-box>

            <zen-flex class="actions" direction="row" justify="center">
                <zen-button size="block" 
                :disabled="disableLogin" 
                @click="login"
                :isLoading="authenticating">Login</zen-button>
            </zen-flex>
        </card>
    </zen-flex>
</template>

<script>

import Card from '../components/Card'
import { TOKEN_KEY, IS_AUTHENTICATED_KEY } from '../store/auth'

export default {
    components: {
        Card
    },
    data () {
        return {
            user: {
                email: '',
                password: ''
            },
            isLoading: false,
            authenticating: false,
        }
    },
    async mounted () {
        await this.check()
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
        }
    },
    methods: {
        hasValue (val) {
            return val && val !== '' && val.trim() !== ''
        },
        validEmail (email) {
            const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(email.trim())
        },
        async login () {
            try {
                if (this.disableLogin) {
                    return;
                }
                this.authenticating = true
                const token = await this.$adminService.login(this.user)

                if (token !== '') {
                    this.$store.dispatch(TOKEN_KEY, token)
                    this.$store.dispatch(IS_AUTHENTICATED_KEY, true)
                    this.$router.push({name: 'admin-dashboard'})
                }

                this.authenticating = false
                
            } catch (e) {
                this.authenticating = false
            }
        },
        async check() {
            try {
                this.isLoading = true
                const isAuth = await this.$adminService.checkToken(this.token)

                this.$store.dispatch(IS_AUTHENTICATED_KEY, isAuth)

                if (isAuth) {
                    this.$router.replace({name: 'admin-dashboard'})
                }
                this.isLoading = false
                
            } catch (e) {
                this.$store.dispatch(IS_AUTHENTICATED_KEY, false)
                this.isLoading = false
            }
        }
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
</style>