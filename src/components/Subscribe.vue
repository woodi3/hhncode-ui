<template>
    <zen-box class="subscribe text-center">
      <zen-text header="h5" bold color="white">Get Updates</zen-text>
      <zen-text italic color="white" class="pt-4">
          Subscribe to the newsletter to receive updates and
          special announcements
      </zen-text>
      <zen-input class="email bg-primary-dark border-color-light mt-4"
          type="email"
          name="subscribe-email" 
          placeholder="Email Address"
          ariaLabel="Email Address"
          variant="flushed" 
          required
          v-model="user.email" 
          :invalid="!emailIsValid && emailStarted"
          :disabled="subscribing"
          @input="typing('email')" />
      <zen-flex class="mt-4">
          <zen-input class="first-name bg-primary-dark border-color-light" 
            name="subscribe-first-name"
            placeholder="First Name" 
            variant="flushed"
            ariaLabel="First Name"
            required
            v-model="user.name"
            :invalid="!nameIsValid && nameStarted" 
            :disabled="subscribing"
            @input="typing('name')"
          />
          <zen-button class="ml-4" 
            color="accent"
            :isLoading="subscribing"
            @click="subscribe">Subscribe</zen-button>
      </zen-flex>
    </zen-box>
</template>

<script>
import { hasValue, validEmail, INPUT_STATES } from '../utils'

const STATES = {
  SUBSCRIBING: 'subscribing',
  ERROR: 'error',
  NONE: 'none',
}

export default {
  data () {
    return {
      state: STATES.NONE,
      user: {},
      inputStates: {
        name: INPUT_STATES.NONE,
        email: INPUT_STATES.NONE,
      },
    }
  },
  computed: {
    disableBtn () {
      return !this.nameIsValid || !this.emailIsValid
    },
    nameIsValid () {
      return hasValue(this.user.name)
    },
    emailIsValid () {
      return hasValue(this.user.email) && validEmail(this.user.email)
    },
    subscribing () {
      return this.state === STATES.SUBSCRIBING
    },
    error () {
      return this.state === STATES.ERROR
    },
    emailStarted () {
      return this.inputStates.email === INPUT_STATES.STARTED
    },
    nameStarted () {
      return this.inputStates.name === INPUT_STATES.STARTED
    },
    authenticated () {
      return this.$store.state.isAuthenticated
    },
  },
  methods: {
    typing (input) {
      switch (input) {
        case 'name':
            this.inputStates.name = INPUT_STATES.STARTED
            break;
        case 'email':
            this.inputStates.email = INPUT_STATES.STARTED
            break;
        default:
            console.log('typing no case! --- Subscribe')
      }
    },
    toast (type, title, message, position) {
      this.$toast({
        type: type,
        title: title,
        message: message,
        position: position,
      })
    },
    async subscribe () {
      try {

        if (this.authenticated) {
          this.toast('warning', 'Warning', 'You already have an account!', 'top')
          return
        }

        if (this.disableBtn) {
          if (!this.emailIsValid) {
            this.toast('error', 'Valid email required', 'A valid email is required', 'bottom')
          }
          if (!this.nameIsValid) {
            this.toast('error', 'Name Required', 'Your name is required', 'bottom')
          }
          return
        }

        this.state = STATES.SUBSCRIBING
        const didSucceed = await this.$userService.subscribe(this.user)
        if (didSucceed) {
          this.toast('success', 'Subscribed', 'Thank you for subscribing. Enjoy the content!', 'top')
          this.user = {}

        } else {
          this.toast('error', 'Error', 'There was an error subscribing, please try again.', 'top')
        }

      } catch (err) {
        this.toast('error', 'Error', 'There was an error subscribing, please try again.', 'top')
      } finally {
        this.state = STATES.NONE
        this.inputStates.email = INPUT_STATES.NONE
        this.inputStates.name = INPUT_STATES.NONE
      }
    }
  }
}
</script>

<style scoped>
.subscribe .email, .subscribe .first-name {
    color: var(--gray-lighter-color) !important;
}
.subscribe .email::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: var(--gray-lighter-color) !important;
  opacity: 1; /* Firefox */
}

.subscribe .email:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: var(--gray-lighter-color) !important;
}

.subscribe .email::-ms-input-placeholder { /* Microsoft Edge */
  color: var(--gray-lighter-color) !important;
}
.subscribe .first-name::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: var(--gray-lighter-color) !important;
  opacity: 1; /* Firefox */
}

.subscribe .first-name:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: var(--gray-lighter-color) !important;
}

.subscribe .first-name::-ms-input-placeholder { /* Microsoft Edge */
  color: var(--gray-lighter-color) !important;
}
</style>