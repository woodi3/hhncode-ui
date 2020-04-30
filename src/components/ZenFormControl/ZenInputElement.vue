<template>
    <zen-box
        alignItems="center" 
        :class="classes"
        :d="'flex'"
        :h="'100%'"
        justifyContent="center"
        position="absolute"
    >
        <slot></slot>
    </zen-box>
</template>

<script>
import { injectClass } from '../../utils'

import ZenBox from '../ZenBox'
export default {
    name: 'zen-input-element',
    components: {
        ZenBox
    },
    props: {
        position: {
            type: String,
            default: 'left'
        }
    },
    data () {
        return {
            className: ''
        }
    },
    beforeMount () {
        // before the component mounts
        // inject the custom css class into the <head></head>
        this.className = injectClass(this.customStyles)
    },
    computed: {
        classes () {
            return [
                `zen-input-element`,
                this.position === 'left' ? `zen-input-element-left` : '',
                this.position === 'right' ? `zen-input-element-right` : '',
                this.className,
            ]
        },
        customStyles () {
            return {
                ...this.positioning,
            }
        },
        positioning () {
            return {
                top: `0px`,
                right: this.position === 'right' ? `0px` : '',
                left: this.position === 'left' ? `0px` : ''
            }
        },
    }
}
</script>
<style scoped>
.zen-input-element {
    z-index: 1;
    width: calc(var(--font-size) * 2.5);
}
.zen-input-element-sm {
    width: calc(var(--font-size) * 2);
}
.zen-input-element-lg {
    width: calc(var(--font-size) * 3);
}
</style>