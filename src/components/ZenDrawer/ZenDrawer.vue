<template>
    <div class="zen-drawer" ref="zenDrawer">
        <slot></slot>
    </div>
</template>

<script>

const NAV_WIDTH_FULL = "100%"
const NAV_WIDTH = "250px"

export default {
    name: "zen-drawer",
    props: {
        isOpen: {
            type: Boolean
        },
        position: {
            type: String,
            default: `left`
        },
        overlay: {
            type: Boolean
        },
        full: {
            type: Boolean
        }
    },
    mounted () {
        if (this.isOpen) {
            this.open()
        }
    },
    computed: {
        /** If drawer should be on the left side */
        isLeft () {
            return this.position === `left`
        }
    },
    methods: {
        /** Returns the content and nav elements */
        getElements () {
            const drawer = this.$refs.zenDrawer
            const nav = drawer.querySelector(`.zen-drawer-nav`)
            const content = drawer.querySelector(`.zen-drawer-content`)
            return { content, nav } 
        },
        /** Returns boolean if we have a content and nav */
        hasElements (content, nav) {
            return content && nav
        },
        /** Opens the drawer nav shifting the content */
        open () {
            const { content, nav } = this.getElements()
            if (this.hasElements(content, nav)) {
                if (this.isLeft) {
                    this.shiftLeft(content, nav)
                }
                else {
                    this.shiftRight(content, nav)
                }
            }
        },
        /** Opens the nav on the left side and shifts content to the right */
        shiftLeft (content, nav) {
            nav.classList.add('left')
            nav.classList.remove('right')
            if (this.full) {
                nav.style.width = NAV_WIDTH_FULL
            }
            else {
                nav.style.width = NAV_WIDTH
            }
            
            if (!this.overlay) {
                content.style.marginLeft = NAV_WIDTH
            }
        },
        /** Opens the nav on the right side and shifts content to the left */
        shiftRight (content, nav) {
            nav.classList.add('right')
            nav.classList.remove('left')
            if (this.full) {
                nav.style.width = NAV_WIDTH_FULL
            }
            else {
                nav.style.width = NAV_WIDTH
            }
            if (!this.overlay) {
                content.style.marginRight = NAV_WIDTH
            }
        },
        /** CLoses the drawer nav shifting the content back */
        close () {
            const { content, nav } = this.getElements()

            if (this.hasElements(content, nav)) {
                nav.style.width = "0"
                if (!this.overlay) {
                    if (this.isLeft) {
                        content.style.marginLeft = "0"
                    }
                    else {
                        content.style.marginRight = "0"
                    }
                }
                
            }
        }
    },
    watch: {
        isOpen (newVal) {
            if (newVal) {
                this.open()
            }
            else {
                this.close()
            }
        }
    }
}
</script>