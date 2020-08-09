<template>
    <zen-flex class="coffee pt-10 pb-10" 
        align="center" 
        justify="center">
        <zen-box f="0 0 50%">
            <zen-button size="block" color="accent" class="buy-me-coffee-btn" @click="handleClick">
                Buy Alex Coffee
            </zen-button>
        </zen-box>
            
        <stripe-bottom-sheet 
            header="Buy Alex a coffee" 
            :isOpen="stripeOpen" 
            :confirmText="'$3.99'"
            @close="close"
            @confirm="confirm"
        />
    </zen-flex>
</template>

<script>
import StripeBottomSheet from './StripeBottomSheet'

export default {
    components: {
        StripeBottomSheet,
    },
    data () {
        return {
            stripeOpen: false,
            stripe: null
        }
    },
    methods: {
        handleClick () {
            this.stripeOpen = true
        },
        close () {
            this.stripeOpen = false
        },
        confirm () {
            this.close()
        }
    }
}
</script>

<style scoped>
.coffee {
    text-decoration: none;
}

.buy-me-coffee-btn {
    height: 80px;
    font-weight: bold;
    font-size: calc(var(--font-size) * 1.05);
}
</style>