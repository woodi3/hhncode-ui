<template>
    <div :id="id" :class="classes">
    </div>
</template>
<script>

import { injectClass } from '../utils'

const colors = {
    primaryLight: `var(--primary-rgb-light)`,
    accentLight: `var(--accent-rgb-light)`,
    primary: `var(--primary-color)`,
    accent: `var(--accent-color)`
}

export default {
    name: "zen-spinner",
    props: {
        size: {
            type: String,
            default: "reg",
            required: false
        },
        color: {
            type: String,
            default: "primary",
            required: false
        }
    },
    data () {
        return {
            id: null,
            className: ''
        }
    },
    beforeMount () {
        // before the component mounts
        // inject the custom css class into the <head></head>
        this.className = injectClass(this.customStyles)
    },
    mounted () {
        // create the id for the component
        this.id = `zen${this._uid}`
    },
    computed: {
        spinnerColor () {
            let bgColor = ''
            let color = ''
            switch (this.color.toLowerCase()) {
                case `primary`:
                    bgColor = colors.primaryLight
                    color = colors.primary
                    break;
                case `accent`:
                    bgColor = colors.accentLight
                    color = colors.accent
                    break;
                default: 
                    bgColor = colors.primaryLight
                    color = colors.primary
            }
            return {
                borderTopColor: bgColor,
                borderRightColor: bgColor,
                borderBottomColor: bgColor,
                borderLeftColor: color
            }
        },
        /**
         * Computed property to return all the custom styles to be used in the custom class
         * that will be injected into a <style> tag.
         */
        customStyles () {
            return {
                ...this.spinnerColor
            }
        },
        spinnerSize () {
            switch (this.size.toLowerCase()) {
                case `reg`:
                case `regular`:
                    return `zen-spinner-reg`
                case `sm`:
                case `small`:
                    return `zen-spinner-sm`
                case `lg`:
                case `large`:
                    return `zen-spinner-lg`
                case `xl`:
                case `extra-large`:
                    return `zen-spinner-xl`
                default:
                    return `zen-spinner-reg`
            }
        },
        classes () {
            return [
                `zen-spinner`,
                this.className,
                this.spinnerSize,
            ]
        }
    }    
}
</script>
<style scoped>
/* Spinner classes */
.zen-spinner,
.zen-spinner:after {
  border-radius: 50%;
}
.zen-spinner {
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: spin 1.1s infinite linear;
    animation: spin 1.1s infinite linear;
    border-style: solid;
}
.zen-spinner-reg {
    width: var(--default-spinner-size);
    height: var(--default-spinner-size);
    border-top-width: calc(var(--default-spinner-size) / 5);
    border-right-width: calc(var(--default-spinner-size) / 5);
    border-bottom-width: calc(var(--default-spinner-size) / 5);
    border-left-width: calc(var(--default-spinner-size) / 5);
}
.zen-spinner-sm {
    width: calc(var(--default-spinner-size) / 2);
    height: calc(var(--default-spinner-size) / 2);
    border-top-width: calc(var(--default-spinner-size) / 10);
    border-right-width: calc(var(--default-spinner-size) / 10);
    border-bottom-width: calc(var(--default-spinner-size) / 10);
    border-left-width: calc(var(--default-spinner-size) / 10);
}
.zen-spinner-lg {
    width: calc(var(--default-spinner-size) * 2);
    height: calc(var(--default-spinner-size) * 2);
    border-top-width: calc(var(--default-spinner-size) / 3);
    border-right-width: calc(var(--default-spinner-size) / 3);
    border-bottom-width: calc(var(--default-spinner-size) / 3);
    border-left-width: calc(var(--default-spinner-size) / 3);
}
.zen-spinner-xl {
    width: calc(var(--default-spinner-size) * 3);
    height: calc(var(--default-spinner-size) * 3);
    border-top-width: calc(var(--default-spinner-size) / 2);
    border-right-width: calc(var(--default-spinner-size) / 2);
    border-bottom-width: calc(var(--default-spinner-size) / 2);
    border-left-width: calc(var(--default-spinner-size) / 2);
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>