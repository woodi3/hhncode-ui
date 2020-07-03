<template>
  <zen-box v-if="loading" :class="{'vinyl-center': centerScreen}">
      <vinyl :width="dimension.width" :height="dimension.height"/>
      <span class="sr-only">Vinyl Loader Spinning</span>
      <!-- TODO add a text ? -->
      <!-- <zen-box class="text-center">
          <zen-text header="h5" italics>Loading...</zen-text>
      </zen-box> -->
  </zen-box>
</template>

<script>
import { gsap } from "gsap";
import Vinyl from './Vinyl'

export default {
    components: {
        Vinyl,
    },
    props: {
        size: {
            type: String,
            default: 'md',
        },
        loading: {
            type: Boolean,
        },
        centerScreen: {
            type: Boolean,
        },
    },
    data () {
        return {
            tween: null,
        }
    },
    mounted () {
        if (this.loading) {
            if (!this.tween) {
                const vinyl = document.getElementById('Vinyl')
                this.tween = gsap.to(vinyl, 1, {rotation:"360", transformOrigin: '50% 50%', ease:"linear.easeNone", repeat:-1});
            }
        }
    },
    computed: {
        dimension () {
            switch (this.size.toLowerCase()) {
                case 'sm':
                case 'small':
                    return {
                        width: "50",
                        height: "50"
                    }
                case 'md':
                case 'medium':
                    return {
                        width: "100",
                        height: "100"
                    }
                case 'lg':
                case 'large':
                    return {
                        width: "250",
                        height: "250",
                    }
                default:
                    return {
                        width: "100",
                        height: "100"
                    }
            }
        },
    }
}
</script>
<style scoped>
.vinyl-center {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    flex-wrap: wrap;
    flex-direction: column;
}
</style>