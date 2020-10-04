<template>
    <footer class="footer">
      <!-- <divider mt="32px" mb="32px"/> -->
      <!-- <zen-box class="buy-coffee text-center mt-8 mb-8">
        <buy-me-coffee />
      </zen-box> -->
      <zen-flex align="center" 
        wrap="wrap"
        class="sitemap-subscribe pl-6 pr-6 pt-3 pb-6">
        
        <zen-box f="0 0 50%" responsive>
          <sitemap />
        </zen-box>
        
        <divider color="white" v-if="mobile"/>

        <zen-box f="0 0 33%" responsive>
          <subscribe />
        </zen-box>
        
      </zen-flex>
      <copyright />
    </footer>
</template>

<script>
// import BuyMeCoffee from './BuyMeCoffee'
import Divider from './Divider'
import Subscribe from './Subscribe'
import Sitemap from './Sitemap'
import Copyright from './Copyright'
import { DEVICE_ENUM } from '../services/resize.service'

export default {
  components: {
    // BuyMeCoffee,
    Divider,
    Subscribe,
    Sitemap,
    Copyright,
  },
  computed: {
    device () {
      return this.$store.state.device
    },
    mobile () {
      return this.device === DEVICE_ENUM.MOBILE
    },
  },
}
</script>

<style scoped>
.sitemap-subscribe {
  background-color: var(--color-3);
  color: var(--color-1);
  margin-top: calc(var(--spacing-rem) * 16);
}
</style>