<template>
    <zen-flex class="coffee pt-10 pb-10" 
        align="center" 
        justify="center">
        <img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" 
            alt="Buy Me A Coffee"
            title="Buy Me a Coffee :)"
            @click="handleClick">

        <stripe-dialog header="Buy me coffee" 
            :isOpen="stripeOpen" 
            :confirmText="'$3.99'"
            @close="close"
            @confirm="confirm">
        </stripe-dialog>
    </zen-flex>
</template>

<script>
import StripeDialog from './StripeDialog'

export default {
    components: {
        StripeDialog,
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
            console.log('Confirm clicked');
        }
    }
}
</script>

<style scoped>
.coffee {
    text-decoration: none;
}
.coffee > img {
    height: 41px !important;
    width: 174px !important;
}
.coffee > img:hover {
    cursor: pointer;
}
</style>