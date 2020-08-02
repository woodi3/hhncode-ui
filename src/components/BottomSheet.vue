<template>
    <div class="bottom-sheet" 
        ref="bottomSheet" 
        tabindex="0">
        <div class="bottom-sheet-content bg-white" ref="bottomSheetContent">
            <zen-box class="close-btn pb-4" v-if="!loading">
                <zen-button color="plain-grey" @click="close">
                    <span class="sr-only">Close</span>
                    <v-icon :icon="['fas', 'times']"/>
                </zen-button>
            </zen-box>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { gsap } from "gsap";

const focusableElementStr = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'
const ANIMATION_SPEED = 0.7
export default {
    props: {
        isOpen: {
            type: Boolean,
        },
        loading: {
            type: Boolean,
        },
    },
    data () {
        return {
            elementThatTriggered: null,
        }
    },
    components: {

    },
    watch: {
        isOpen (newVal) {
            if (newVal === true) {
                document.body.classList.add('no-scroll')
                this.$nextTick(() => {
                    this.elementThatTriggered = document.activeElement
                    this.setAriaHidden()
                    if (this.$refs.bottomSheet) {
                        this.$refs.bottomSheet.focus()
                        this.$refs.bottomSheet.addEventListener('keydown', this.listenForEscape)
                        // TODO set open animation
                        const bottomSheetContent = this.$refs.bottomSheetContent
                        gsap.to(bottomSheetContent, {
                            maxHeight: '100vh',
                            height: '100vh',
                            duration: ANIMATION_SPEED,
                        })
                    }
                })
            }
            else {
                document.body.classList.remove('no-scroll')
                this.$nextTick(() => {
                    // TODO set close animation
                    const bottomSheetContentRef = this.$refs.bottomSheetContent
                    gsap.to(bottomSheetContentRef, {
                        maxHeight: '0',
                        duration: ANIMATION_SPEED,
                    })


                    this.removeAriaHidden()
                    if (this.elementThatTriggered) {
                        this.elementThatTriggered.focus()
                    }
                })
            }
        }
    },
    computed: {

    },
    methods: {
        close () {
            this.$emit('close')
        },
        listenForEscape (event) {
            if (event.code && event.code.toLowerCase() === `escape`) {
                this.close()
            }
        },
        getElementsOutsideBottomSheet () {
            const allTabbableElements = this.getArrayFromNodeList(document.querySelectorAll(focusableElementStr))
            const bottomSheetContent = this.$refs.bottomSheetContent
            const bottomSheetFocusableElements = this.getArrayFromNodeList(bottomSheetContent.querySelectorAll(focusableElementStr))
            return allTabbableElements.filter(el => bottomSheetFocusableElements.findIndex(el2 => el2.isEqualNode(el)) < 0)
        },
        setAriaHidden () {
            const outsideBottomSheet = this.getElementsOutsideBottomSheet()
            if (outsideBottomSheet.length > 0) {
                outsideBottomSheet.forEach(el => el.setAttribute('aria-hidden', true))
            }
        },
        removeAriaHidden () {
            const allTabbableElements = this.getArrayFromNodeList(document.querySelectorAll(focusableElementStr))
            if (allTabbableElements.length > 0) {
                allTabbableElements.forEach(el => el.setAttribute('aria-hidden', false))
            }
        },
        getArrayFromNodeList (list) {
            return Array.prototype.slice.call(list)
        },
    },
    beforeDestroy () {
        this.$refs.bottomSheet.removeEventListener('keydown', this.listenForEscape)
    },
}
</script>

<style scoped>
.bottom-sheet-content {
    position: fixed;
    bottom: 0;
    left: 0;
    max-height: 0px;
    width: 100%;
    z-index: 15;
    display: flex;
    flex-direction: column;
}
.close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
}
</style>