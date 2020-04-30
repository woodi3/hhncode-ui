<template>
    <div v-if="isOpen" :ref="'zenDialog'" tabindex="0">
        <div v-if="overlay" class="zen-dialog-overlay" @click="closeDialog">
        </div>
        <div tabindex="0" :ref="'startLock'" @focus="setLastFocusableElement"></div>
        <div :class="classes" :ref="'dialogContent'">
            <slot></slot>
        </div>
        <div tabindex="0" :ref="'endLock'" @focus="setFirstFocusableElement"></div>
    </div>
</template>

<script>
/**
 * TODO
 */


const focusableElementStr = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'

export default {
    name: `zen-dialog`,
    props: {
        isOpen: {
            type: Boolean
        },
        overlay: {
            type: Boolean,
            default: true
        },
        closeOnOverlayClick: {
            type: Boolean,
            default: true
        },
        centered: {
            type: Boolean
        },
        size: {
            type: String,
            default: "md"
        }
    },
    data () {
        return {
            elementThatTriggered: null
        }
    },
    beforeDestroy () {
        if (this.$refs.zenDialog) {
            this.$refs.zenDialog.removeEventListener('keydown', this.listenForEscape)
        }
    },
    computed: {
        classes () {
            return [
                'zen-dialog',
                'bg-white',
                'shadow-lg',
                this.sizeClass,
                this.centered ? `zen-dialog-centered` : ``
            ]
        },
        sizeClass () {
            switch (this.size.toLowerCase()) {
                case `small`:
                case `sm`:
                    return `zen-dialog-sm`
                case `medium`:
                case `md`:
                    return `zen-dialog-md`
                case `large`:
                case `lg`:
                    return `zen-dialog-lg`
                default:
                    return `zen-dialog-md`
            }
        }
    },
    methods: {
        listenForEscape (event) {
            if (event.code.toLowerCase() === `escape`) {
                this.closeDialog()
            }
        },
        getArrayFromNodeList (list) {
            return Array.prototype.slice.call(list)
        },
        getElementsOutsideModal () {
            const allTabbableElements = this.getArrayFromNodeList(document.querySelectorAll(focusableElementStr))
            const dialogContent = this.$refs.dialogContent
            const modalFocusableElements = this.getArrayFromNodeList(dialogContent.querySelectorAll(focusableElementStr))
            return allTabbableElements.filter(el => modalFocusableElements.findIndex(el2 => el2.isEqualNode(el)) < 0)
        },
        setAriaHidden () {
            const outsideModal = this.getElementsOutsideModal()
            if (outsideModal.length > 0) {
                outsideModal.forEach(el => el.setAttribute('aria-hidden', true))
            }
        },
        removeAriaHidden () {
            const allTabbableElements = this.getArrayFromNodeList(document.querySelectorAll(focusableElementStr))
            if (allTabbableElements.length > 0) {
                allTabbableElements.forEach(el => el.setAttribute('aria-hidden', false))
            }
        },
        setFirstFocusableElement () {
            if (document.activeElement) {
                const dialogContent = this.$refs.dialogContent
                const focusableElements = dialogContent.querySelectorAll(focusableElementStr)

                const elements = this.getArrayFromNodeList(focusableElements).filter(element => element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement)
                
                elements.sort((elementA, elementB) => {
                    const a = elementA.tabIndex || 1
                    const b = elementB.tabIndex || 1
                    if (a < b) { return -1 }
                    if (a > b) { return 1 }
                    return 0
                })
                if (elements.length > 0) {
                    const firstEl = elements[0]
                    firstEl.focus()
                    return true
                }
                return false                   
            }
        },
        setLastFocusableElement () {
            if (document.activeElement) {
                const dialogContent = this.$refs.dialogContent
                const focusableElements = dialogContent.querySelectorAll(focusableElementStr)
                
                const elements = this.getArrayFromNodeList(focusableElements).filter(element => element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement)
                
                elements.sort((elementA, elementB) => {
                    const a = elementA.tabIndex || 1
                    const b = elementB.tabIndex || 1
                    if (a < b) { return -1 }
                    if (a > b) { return 1 }
                    return 0
                })
                if (elements.length > 0) {
                    const lastEl = elements[elements.length-1]
                    lastEl.focus()
                }                   
            }
        },
        closeDialog () {
            if (this.closeOnOverlayClick) {
                this.$emit('close')
            }
        }
    },
    watch: {
        isOpen (newVal) {
            if (newVal === true) {
                document.body.classList.add('no-scroll')
                this.$nextTick(() => {
                    this.elementThatTriggered = document.activeElement
                    this.setAriaHidden()
                    if (this.$refs.zenDialog) {
                        const setFocus = this.setFirstFocusableElement()
                        if (!setFocus) {
                            this.$refs.zenDialog.focus()
                        }
                        this.$refs.zenDialog.addEventListener('keydown', this.listenForEscape)
                    }
                })

            }
            else {
                document.body.classList.remove('no-scroll')
                this.$nextTick(() => {
                    this.removeAriaHidden()
                    if (this.elementThatTriggered) {
                        this.elementThatTriggered.focus()
                    }
                })
            }
        }
    }
}
</script>
<style scoped>
.zen-dialog-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 5;
}
.zen-dialog {
    position: fixed;
    top: calc(var(--spacing-rem) * 15);
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    height: 100%;
    max-height: calc(100vh - 7.5rem);
    width: 100%;
    overflow: hidden;
    z-index: 6;
    display: flex;
    flex-direction: column;
}
.zen-dialog-md {
    max-width: var(--dialog-md-width);
}
.zen-dialog-lg {
    max-width: var(--dialog-lg-width);
}
.zen-dialog-sm {
    max-width: var(--dialog-sm-width);
}
.zen-dialog-centered {
    top: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);;
    transform: translateX(-50%) translateY(-50%);;
}
</style>