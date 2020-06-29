<template>
    <zen-dialog centered
        height="400px" 
        :isOpen="isOpen" 
        :closeOnOverlayClick="false">
        <zen-dialog-header @close="close">
            <h4 class="text-left">{{header}}</h4>
        </zen-dialog-header>
        <zen-dialog-body>
            <app-loader v-if="loading" height="200px"/>
            <zen-flex v-else-if="error" 
                direction="column"
                class="text-danger">
                <zen-box>
                    <span class="sr-only">Warning!</span>
                    <v-icon :icon="['fas', 'exclamation-triangle']" size="2x"/>
                </zen-box>
                <zen-box>
                    <h4>Oh no!</h4>
                </zen-box>
                <zen-box>
                    {{errorMsg}}
                </zen-box>
            </zen-flex>
            <zen-box v-else class="stripe-container">
                <zen-box mt=".75rem" mb=".75rem">
                    <zen-input v-model="user.name"
                        variant="flushed" 
                        class="name mt-3 mb-3" 
                        name="user-name" 
                        placeholder="Your name" 
                        type="text"
                        ariaLabel="Your name" 
                        required
                        :invalid="invalidName"
                        :disabled="submitting || !elementsLoaded"
                    />
                </zen-box>
                <zen-box mt=".75rem" mb=".75rem">
                    <zen-input v-model="user.email"
                        variant="flushed" 
                        class="user-email mt-3 mb-3" 
                        name="user-email" 
                        placeholder="Your email" 
                        type="email"
                        ariaLabel="Your email"  
                        required
                        :invalid="invalidEmail"
                        :disabled="submitting || !elementsLoaded"
                    />
                </zen-box>
                <zen-flex class="pt-4 pb-4">
                    <zen-box f="0 0 100%" class="border-light-bottom border-2x">
                        <div ref="stripeCardNumber"></div>
                    </zen-box>
                </zen-flex>
                <zen-flex justify="center" class="pt-2 pb-2">
                    <zen-box f="0 0 33%" class="ml-4 mr-4 border-light-bottom border-2x">
                        <div ref="stripeCardExpiry"></div>
                    </zen-box>
                    <zen-box f="0 0 33%" class="border-light-bottom border-2x">
                        <div ref="stripeCardCvc"></div>
                    </zen-box>
                </zen-flex>
            </zen-box>
            
            <zen-box v-if="invalid" class="text-danger pt-2">
                {{errorMsg}}
            </zen-box>
        </zen-dialog-body>
        <zen-dialog-footer position="absolute">
            <zen-button color="plain" class="ml-2 mr-2" @click="close">{{cancelText}}</zen-button>
            <zen-button size="lg"
                :isLoading="submitting" 
                :disabled="invalid || invalidUser || submitting" 
                @click="confirm">
                {{confirmText}}
            </zen-button>
        </zen-dialog-footer>
    </zen-dialog>
</template>

<script>
import AppLoader from './AppLoader'
import { hasValue, validEmail } from '../utils'
import { loadStripe } from '@stripe/stripe-js'
import environment from '../../environment'

const stripeCardStyle = {
  base: {
      iconColor: '#00a96d',
      color: '#006541',
      fontWeight: 500,
      fontFamily: 'Open Sans, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#eea222',
      },
      '::placeholder': {
        color: '#747474',
      },
    },
    invalid: {
      iconColor: '#ff4444',
      color: '#ff4444',
    },
}

const STATES = {
    LOADING: 'LOADING',
    ERROR: 'ERROR',
    NONE: 'NONE',
    INVALID: 'INVALID',
    SUBMITTING: 'SUBMITTING',
}

// const STRIPE_ENUM = {
//     CARD_NUMBER: 'cardNumber',
//     CARD_CVC: 'cardCvc',
//     CARD_EXPIRY: 'cardExpiry'
// }

export default {
    components: {
        AppLoader,
    },
    props: {
        isOpen: {
            type: Boolean,
        },
        header: {
            type: String,
            default: "Donation Form"
        },
        cancelText: {
            type: String,
            default: "Cancel",
        },
        confirmText: {
            type: String,
            default: "Confirm",
        },
    },
    data () {
        return {
            stripe: null,
            paymentIntent: null,
            state: STATES.NONE,
            stripeEl: {},
            errorMsg: null,
            user: {},
            elementsReady: {},
        }
    },
    watch: {
        isOpen (newVal) {
            if (newVal) {
                this.init()
            }
            else {
                this.clean()
            }
        },
    },
    computed: {
        loading () {
            return this.state === STATES.LOADING
        },
        error () {
            return this.state === STATES.ERROR
        },
        none () {
            return this.state === STATES.NONE
        },
        invalid () {
            return this.state === STATES.INVALID
        },
        submitting () {
            return this.state === STATES.SUBMITTING
        },
        invalidName () {
            return  !hasValue(this.user.name)
        },
        invalidEmail () {
            return !hasValue(this.user.email) || !validEmail(this.user.email)
        },
        invalidUser () {
            return this.invalidName || this.invalidEmail
        },
        elementsLoaded () {
            return Object.keys(this.stripeEl).every(k => this.stripeEl[k].ready)
        }
    },
    beforeDestroy () {
        this.stripe = null  
    },
    methods: {
        async init () {
            this.stripe = await loadStripe(environment.STRIPE_KEY)
            const hasCharge = await this.charge()
            if (hasCharge) {
                this.state = STATES.INVALID
                this.injectStripeElements()
            }
        },
        close () {
            this.$emit('close')
        },
        injectStripeElements () {
            const elements = this.stripe.elements()
            this.stripeEl = {
                stripeCardNumber: {
                    el: elements.create('cardNumber', {style: stripeCardStyle, placeholder: 'Card number'}),
                    ready: false
                },
                stripeCardExpiry: {
                    el: elements.create('cardExpiry', { 
                        style: {
                            base: {
                                ...stripeCardStyle.base,
                                textAlign: 'center',
                            }
                        }
                    }),
                    ready: false
                },
                stripeCardCvc: {
                    el: elements.create('cardCvc', { 
                        style: {
                            base: {
                                ...stripeCardStyle.base,
                                textAlign: 'center',
                            }
                        }
                    }),
                    ready: false
                },
            }
            const vm = this
            Object.keys(this.stripeEl).forEach(key => {
                const el = this.stripeEl[key].el
                el.mount(this.$refs[key])
                el.on('change', this.setInvalid.bind(vm))
                el.on('ready', () => this.stripeEl[key].ready = true)
            })
        },
        clean () {
            this.user = {}
            if (this.stripeEl) {
                Object.keys(this.stripeEl).forEach(key => {
                    const el = this.stripeEl[key].el
                    el.destroy()
                })
                this.stripe = null
            }
        },
        setInvalid (evt) {
            if (evt.error) {
                this.errorMsg = evt.error.message
                this.state = STATES.INVALID
            } else if (evt.empty) {
                this.errorMsg = `Payment information is required.`
                this.state = STATES.INVALID
            } else {
                this.state = STATES.NONE
                this.errorMsg = null
            }
        },
        setCardDisabled (val) {
            Object.keys(this.stripeEl).forEach(key => {
                const el = this.stripeEl[key].el
                el.update({disabled: val})
            })
        },
        async charge () {
            try {
                this.state = STATES.LOADING
                const { success, paymentIntent } = await this.$userService.charge()
                if (success) {
                    this.paymentIntent = paymentIntent
                    this.state = STATES.NONE
                    return true
                } else {
                    this.state = STATES.ERROR
                }
            } catch (err) {
                console.error(err)
                this.state = STATES.ERROR
            }
            return false
        },
        async confirm () {
            // handle confirm stuff
            try {
                if (this.invalid) {
                    return
                }
                this.state = STATES.SUBMITTING
                this.setCardDisabled(true)
                const results = await this.stripe.confirmCardPayment(this.paymentIntent.client_secret, {
                    payment_method: {
                        card: this.stripeEl.stripeCardNumber.el, // we only need to use card number element to retrieve the full card
                        billing_details: {
                            name: this.user.name
                        },
                    },
                    receipt_email: this.user.email,
                })

                if (results.error) {
                    this.$toast({
                        type: "error",
                        position: 'top',
                        title: "Payment Error",
                        message: "Error processing payment, try again."
                    })
                    this.setCardDisabled(false)
                } else if (results.paymentIntent && results.paymentIntent.status === "succeeded") {
                    this.$toast({
                        title: "Payment Received",
                        position: "top",
                        message: "Thank you for your donation! Please enjoy the content."
                    })
                    this.$emit('confirm')
                }
                this.state = STATES.NONE
            } catch (err) {
                console.log(err)
            }
        },
    }
}
</script>

<style scoped>
h4 {
    margin: 0;
}
/* #stripeEl {
    border-bottom: 2px solid var(--gray-lighter-color);
} */
</style>