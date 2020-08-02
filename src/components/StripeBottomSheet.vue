<template>
    <bottom-sheet rounded
        :width="mobile ? '100%' : '50%'"
        height="75vh"
        :isOpen="isOpen" 
        :loading="loading || submitting"
        @close="close">
        <app-loader v-if="loading" height="200px"/>
        <zen-box v-else-if="isOpen" 
            class="stripe-container container"
            position="relative"
            h="100%"
            :pl="mobile ? '1.5rem' : '2.5rem'"
            :pr="mobile ? '1.5rem' : '2.5rem'">
            <zen-box pt="2rem" mb="2rem">
                <zen-text header="h5" align="left">{{header}}</zen-text>
            </zen-box>
            <zen-flex class="coffee-quantity p-2 mt-2 mb-2" 
                align="center"
                justify="center">
                <zen-box f="0 0 25%" class="coffee-cup">
                    <!-- COFFEE IMG -->
                    <img src="https://via.placeholder.com/250" />
                </zen-box>
                <zen-box f="0 0 15%" class="times text-grey">
                    <span class="sr-only">per</span>
                    <zen-text color="gray">X</zen-text>
                </zen-box>
                <zen-box class="amounts"
                    d="flex" 
                    f="0 0 60%"
                    justifyContent="center">
                    <zen-button color="outline-primary"
                        class="amount"
                        :class="{active: amount.value == quantity}"
                        :margin="{right: '.5rem', left:'.5rem'}"
                        v-for="amount in amounts"
                        :key="amount.value"
                        @click="setQuantity(amount.value)">
                        {{amount.value}}
                    </zen-button>
                </zen-box>
            </zen-flex>
            <zen-flex v-if="showInputs">
                <zen-box f="0 0 50%" mt=".75rem" mb=".75rem">
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
                <zen-box f="0 0 50%" ml=".5rem" mt=".75rem" mb=".75rem">
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
            </zen-flex>

            <zen-flex v-if="showInputs" class="stripe-components pt-4 pb-4">
                <zen-box f="0 0 100%" class="border-light-bottom border-2x">
                    <div ref="stripeCardNumber"></div>
                </zen-box>
            </zen-flex>
            <zen-flex v-if="showInputs" justify="center" class="stripe-components pt-2 pb-2">
                <zen-box f="0 0 33%" class="ml-4 mr-4 border-light-bottom border-2x">
                    <div ref="stripeCardExpiry"></div>
                </zen-box>
                <zen-box f="0 0 33%" class="border-light-bottom border-2x">
                    <div ref="stripeCardCvc"></div>
                </zen-box>
            </zen-flex>

            <zen-box v-if="showInputs" class="submit-container">
                <zen-button class="submit-btn" 
                    size="block"
                    :isLoading="submitting" 
                    :disabled="invalid || invalidUser || submitting"
                    @click="confirm">
                    Support Alex ({{amountDue}})
                </zen-button>
            </zen-box>

            <zen-box v-if="charging">
                <app-loader height="200px"/>
            </zen-box>
        </zen-box>
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
        
        <zen-box v-if="invalid" class="text-danger pt-2">
            {{errorMsg}}
        </zen-box>
    </bottom-sheet>
</template>

<script>
import BottomSheet from './BottomSheet'
import AppLoader from './AppLoader'
import { hasValue, validEmail } from '../utils'
import { loadStripe } from '@stripe/stripe-js'
import environment from '../../environment'
import { DEVICE_ENUM } from '../services/resize.service'

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
    CHARGING: 'CHARGING',
    ERROR: 'ERROR',
    NONE: 'NONE',
    INVALID: 'INVALID',
    SUBMITTING: 'SUBMITTING',
}

const COFFEE_VALUE = 4

export default {
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
            quantity: 0,
            amounts: [
                {
                    value: 1,
                },
                {
                    value: 3,
                },
                {
                     value: 5,
                }
            ]
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
    components: {
        AppLoader,
        BottomSheet
    },
    computed: {
        loading () {
            return this.state === STATES.LOADING
        },
        charging () {
            return this.state === STATES.charging
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
        },
        device () {
            return this.$store.state.device
        },
        mobile () {
            return this.device === DEVICE_ENUM.MOBILE
        },
        amountDue () {
            return `$${COFFEE_VALUE*this.quantity}.00`
        },
        showInputs () {
            return !this.charging && this.quantity > 0
        },
    },
    methods: {
        async init () {
            this.stripe = await loadStripe(environment.STRIPE_KEY)
        },
        async setQuantity (val) {
            if (!isNaN(val)) {
                this.quantity = parseInt(val.toString(), 10)
            } else {
                this.quantity = 1
            }
            await this.setCharge()
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
            this.quantity = 0
            if (this.stripeEl) {
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
        async setCharge () {
            const hasCharge = await this.charge(this.quantity)
            if (hasCharge) {
                this.state = STATES.INVALID
                this.injectStripeElements()
            }
        },
        async charge (quantity) {
            try {
                this.state = STATES.CHARGING
                const { success, paymentIntent } = await this.$userService.charge({quantity})
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
.coffee-cup > img {
    width: 100%;
    height: 100%;
    max-width: 75px;
    max-height: 75px;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number].quantity-input {
  -moz-appearance: textfield;
}

.coffee-quantity {
    background-color: var(--primary-super-light);
    border-color: var(--primary-color);
    border-style: solid;
    border-width: 1px;
}

.amount {
    height: 45px;
    width: 45px;
    border-radius: 50%;
}
.amount.active {
    background-color: var(--primary-color);
    color: var(--white-color);
}
.submit-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
}
.submit-container > .submit-btn {
    height: 100%;
    font-weight: bold;
}

@media screen and (max-width: 800px) {
}
@media screen and (min-width: 800px) {
  .amount {
    height: 50px;
    width: 50px;
  }
}
@media screen and (min-width: 800px) and (max-width: 1023px) {
}
@media screen and (min-width: 1024px) {
}
</style>