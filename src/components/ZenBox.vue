<template>
    <div :id="id" :class="classes">
        <slot></slot>
    </div>
</template>

<script>
import { injectClass, isNum } from '../utils'
export default {
    name: 'zen-box',
    props: {
        /**
         * Represents the align-items css property
         */
        alignItems: {
            type: String,
            required: false
        },
        /**
         * Abbreviated for background color.
         */
        bg: {
            type: String,
            required: false,
        },
        /**
         * Background-color prop
         */
        bgColor: {
            type: String,
            required: false,
        },
        /**
         * Represents the css display attribute
         */
        display: {
            type: String,
            required: false,
            default: `block`
        },
        /**
         * Abbreviated for display attribute
         */
        d: {
            type: String,
            required: false,
        },
        /**
         * Represents the flex-direction css property
         */
        flexDirection: {
            type: String,
            required: false
        },
        /**
         * Represents the flex-wrap css property
         */
        flexWrap: {
            type: String,
            required: false
        },
        /**
         * Represents the grid-area css property.
         */
        gridArea: {
            type: String,
            required: false
        },
        /**
         * Represents the grid-template-areas css property.
         */
        gridTemplateAreas: {
            type: String,
            required: false
        },
        /**
         * Object that contains a row and column property.
         * Represents the grid-gap css property
         * Is a Object {row, column}
         */
        gridGap: {
            type: Object,
            required: false
        },
        /**
         * Represents the grid-row-gap css property.
         * Can be a number or string
         */
        gridRowGap: { 
            required: false
        },
        /**
         * Represents the grid-column-gap css property.
         * Can be a number or string
         */
        gridColumnGap: {
            required: false
        },
        /**
         * Represents the grid-auto-columns css property.
         * Can be a number or string
         */
        gridAutoColumns: {
            required: false
        },
        /**
         * Represents the grid-column css property.
         * Can be a number or string
         */
        gridColumn: {
            required: false
        },
        /**
         * Represents the grid-row css property.
         * Can be a number or string
         */
        gridRow: {  
            required: false
        },
        /**
         * Represents the grid-auto-flow css property.
         */
        gridAutoFlow: {
            type: String,
            required: false
        },
        /**
         * Represents the grid-auto-rows css property.
         * Can be a number or string
         */
        gridAutoRows: {
            required: false
        },
        /**
         * Represents the grid-template-rows css property.
         * Can be a number or string
         */
        gridTemplateRows: {
            required: false
        },
        /**
         * Represents the grid-template-columns css property.
         * Can be a number or string
         */
        gridTemplateColumns: {
            required: false
        },
        /**
         * Represents the height of the box.
         * Can be a number or string
         */
        height: {
            required: false
        },
        /**
         * Abbreviated for height
         */
        h: {
            required: false
        },
        /**
         * Represents the justify-content css property
         */
        justifyContent: {
            type: String,
            required: false
        },
        /**
         * Represesnts the margin css attribute.
         * Can be a number or string
         */
        margin: {
            required: false,
        },
        /**
         * Abbreviated for margin
         */
        m: {
            required: false,
        },
        /**
         * Represents the margin-top css attribute.
         * Can be a number or string.
         */
        marginTop: {
            required: false,
        },
        /**
         * Abbreviated for margin-top
         */
        mt: {
            required: false
        },
        /**
         * Represents the margin-right css attribute.
         * Can be a number or string.
         */
        marginRight: {
            required: false,
        },
        /**
         * Abbreviated for margin-right
         */
        mr: {
            required: false
        },
        /**
         * Represents the margin-bottom css attribute.
         * Can be a number or string.
         */
        marginBottom: {
            required: false,
        },
        /**
         * Abbreviated for margin-bottom
         */
        mb: {
            required: false
        },
        /**
         * Represents the margin-left css attribute.
         * Can be a number or string.
         */
        marginLeft: {
            required: false,
        },
        /**
         * Abbreviated for margin-left
         */
        ml: {
            required: false
        },
        /**
         * Represents the padding css attribute.
         * Can be a number or string.
         */
        padding: {
            required: false,
        },
        /**
         * Abbreviated for padding
         */
        p: {
            required: false
        },
        /**
         * Represents the padding-top css attribute.
         * Can be a number or string.
         */
        paddingTop: {
            required: false,
        },
        /**
         * Abbreviated for padding-top
         */
        pt: {
            required: false
        },
        /**
         * Represents the padding-right css attribute.
         * Can be a number or string.
         */
        paddingRight: {
            required: false,
        },
        /**
         * Abbreviated for padding-right
         */
        pr: {
            required: false
        },
        /**
         * Represents the padding-bottom css attribute.
         * Can be a number or string.
         */
        paddingBottom: {
            required: false,
        },
        /**
         * Abbreviated for padding-bottom
         */
        pb: {
            required: false
        },
        /**
         * Represents the padding-left css attribute.
         * Can be a number or string.
         */
        paddingLeft: {
            required: false,
        },
        /**
         * Abbreviated for padding-left
         */
        pl: {
            required: false
        },
        position: {
            type: String,
            default: ''
        },
        /**
         * Represents the size of the shadow.
         * Requires the `shadow` attribute to be true
         */
        shadowSize: {
            type: String,
            required: false,
            default: `regular`
        },
        /**
         * Boolean to determine if the box should have a shadow
         */
        shadow: {
            type: Boolean,
            required: false,
            default: false
        },
        /**
         * Represents the size of the box
         * Can be a string or number
         */
        size: {
            required: false
        },
        /**
         * Represents the width of the box.
         * Can be a number or string
         */
        width: {
            required: false
        },
        /**
         * Abbreviated for width
         */
        w: {
            required: false
        },
    },
    data () {
        return {
            /**
             * represents the id attribute for the component
             */
            id: null,
            /**
             * represents the custom class name for the component
             */
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
        /**
         * Computed property to generate the background-color css class
         */
        bgClass () {
            const bg = this.bg || this.bgColor
            return bg ? `bg-${bg.toLowerCase()}` : ''
        },
        /**
         * Computed property to generate the box-shadow css class
         */
        shadowClass () {
            if (this.shadow) {
                switch (this.shadowSize.toLowerCase()) {
                    case `sm`:
                    case `small`:
                        return `shadow-sm`
                    case `reg`:
                    case `regular`:
                        return `shadow-reg`
                    case `lg`:
                    case `large`:
                        return `shadow-lg`
                    default:
                        return `shadow-reg`
                }
            }
            return ''
        },
        /**
         * Computed property to create a margin object.
         */
        getMargin () {
            // if margin is set, it overrides any other margin settings
            if (this.margin || this.m) {
                const m = this.m || this.margin
                const margin = isNum(m) ? `${m}px` : m
                return {
                    margin
                }
            }
            else if (
                this.mt || this.marginTop ||
                this.mr || this.marginRight ||
                this.mb || this.marginBottom ||
                this.ml || this.marginLeft
            ) {
                // check abbreviated values if they're not null, we use them
                const mt = this.mt || this.marginTop
                const mr = this.mr || this.marginRight
                const mb = this.mb || this.marginBottom
                const ml = this.ml || this.marginLeft

                // set the values
                const top = isNum(mt) ? `${mt}px` : (mt ? mt : '0px')
                const right = isNum(mr) ? `${mr}px` : (mr ? mr : '0px')
                const left = isNum(ml) ? `${ml}px` : (ml ? ml : '0px')
                const bottom = isNum(mb) ? `${mb}px` : (mb ? mb : '0px')
                return {
                    margin: `${top} ${right} ${bottom} ${left}`
                }
            }
            return {}
        },
        /**
         * Computed property to create a padding object.
         */
        getPadding () {
            // if padding is set, it overrides any other padding settings
            if (this.padding || this.p) {
                const p = this.p || this.padding
                const padding = isNum(p) ? `${p}px` : p
                return {
                    padding
                }
            }
            else if (
                this.pt || this.paddingTop ||
                this.pr || this.paddingRight ||
                this.pb || this.paddingBottom ||
                this.pl || this.paddingLeft
            ) {
                // check abbreviated values if they're not null, we use them
                const pt = this.pt || this.paddingTop
                const pr = this.pr || this.paddingRight
                const pb = this.pb || this.paddingBottom
                const pl = this.pl || this.paddingLeft
                const top = isNum(pt) ? `${pt}px` : (pt ? pt : '0px')
                const right = isNum(pr) ? `${pr}px` : (pr ? pr : '0px')
                const left = isNum(pl) ? `${pl}px` : (pl ? pl : '0px')
                const bottom = isNum(pb) ? `${pb}px` : (pb ? pb : '0px')
                return {
                    padding: `${top} ${right} ${bottom} ${left}`
                }
            }
            return {}
        },
        getSize () {
            if (this.h === undefined && this.height === undefined && this.w === undefined && this.width === undefined) {
                if (this.size !== undefined) {
                    if (isNum(this.size)) {
                        return {
                            height: `${this.size}px`,
                            width: `${this.size}px`
                        }
                    }
                    else if (this.size.indexOf("%") > -1) {
                        return {
                            height: this.size,
                            width: this.size
                        }
                    }
                    return {
                        height: this.size,
                        width: this.size
                    }
                }
            }
            return {}
        },
        /**
         * Computed property to return a height object
         */
        getHeight () {
            // use abbreviated attribute if it's not null
            const height = this.h || this.height
            if (height) {
                // if height is a number, append px
                if (isNum(height)) {
                    return {
                        height: `${height}px`
                    }
                }
                // height may be a percentage or a string that's a number
                else if (typeof height === "string") {
                    if (height.indexOf("%") > -1 || isNaN(parseInt(height, 10))) {
                        return {
                            height
                        }
                    }
                    else if (height.indexOf("rem") > -1) {
                        return {
                            height
                        }
                    }
                    return {
                        height: `${height}px`
                    }
                }
            }
            return {}
        },
        /**
         * Computed property to return a width object
         */
        getWidth () {
            // use abbreviated attribute if it's not null
            const width = this.w || this.width
            if (width) {
                // if width is a number, append px
                if (isNum(width)) {
                    return {
                        width: `${width}px`
                    }
                }
                // width may be a percentage or a string that's a number
                else if (typeof width === "string") {
                    if (width.indexOf("%") > -1 || isNaN(parseInt(width, 10))) {
                        return {
                            width
                        }
                    }
                    else if (width.indexOf("rem") > -1) {
                        return {
                            width
                        }
                    }
                    return {
                        width: `${width}px`
                    }
                }
            }
            return {}
        },
        /**
         * Computed property to build any flex styles
         */
        flexStyles () {
            const display = this.d || this.display 
            if (display.toLowerCase() === `flex` || display.toLowerCase() === `inline-flex`) {
                const flex = {}
                if (this.alignItems !== undefined) {
                    flex.alignItems = this.alignItems
                }
                if (this.justifyContent !== undefined) {
                    flex.justifyContent = this.justifyContent
                }
                if (this.flexWrap !== undefined) {
                    flex.flexWrap = this.flexWrap
                }
                if (this.flexDirection !== undefined) {
                    flex.flexDirection = this.flexDirection
                }
                return flex
            }
            return {}
        },
        /**
         * Computed property to build any grid styles
         */
        gridStyles() {
            // Return a grid object representing the different grid styles
            const display = this.d || this.display
            if (display.toLowerCase() === `grid` || display.toLowerCase() === `inline-grid`) {
                const grid = {}
                if (this.gridArea !== undefined) {
                    grid.gridArea = this.gridArea
                }
                if (this.gridTemplateAreas !== undefined) {
                    grid.gridTemplateAreas = this.gridTemplateAreas
                }
                if (this.gridGap !== undefined) {
                    let gridGap = ''
                    if (this.gridGap.row) {
                        if (typeof this.gridGap.row === "string"){
                            if (this.gridGap.row.indexOf("%") > -1) {
                                gridGap += `${this.gridGap.row} `
                            }
                            else if (!isNaN(parseInt(this.gridGap.row, 10))) {
                                gridGap += `${this.gridGap.row}px `
                            }
                        }
                        else {
                            gridGap += `${this.gridGap.row}px `
                        }
                    }
                    if (this.gridGap.column) {
                        if (typeof this.gridGap.column === "string"){
                            if (this.gridGap.column.indexOf("%") > -1) {
                                gridGap += `${this.gridGap.column} `
                            }
                            else if (!isNaN(parseInt(this.gridGap.column, 10))) {
                                gridGap += `${this.gridGap.column}px `
                            }
                        }
                        else {
                            gridGap += `${this.gridGap.column}px `
                        }
                    }
                    grid.gridGap = gridGap
                }
                if (this.gridRowGap !== undefined) {
                    grid.gridRowGap = this.gridRowGap
                }
                if (this.gridColumnGap !== undefined) {
                    grid.gridColumnGap = this.gridColumnGap
                }
                if (this.gridAutoColumns !== undefined) {
                    grid.gridAutoColumns = this.gridAutoColumns
                }
                if (this.gridColumn !== undefined) {
                    grid.gridColumn = this.gridColumn
                }
                if (this.gridRow !== undefined) {
                    grid.gridRow = this.gridRow
                }
                if (this.gridAutoFlow !== undefined) {
                    grid.gridAutoFlow = this.gridAutoFlow
                }
                if (this.gridAutoRows !== undefined) {
                    grid.gridAutoRows = this.gridAutoRows   
                }
                if (this.gridTemplateRows !== undefined) {
                    grid.gridTemplateRows = this.gridTemplateRows
                }
                if (this.gridTemplateColumns !== undefined) {
                    grid.gridTemplateColumns = this.gridTemplateColumns
                }
                return grid
            }
            return {}
        },
        /**
         * Computed property to return the display class
         */
        displayClass () {
            const display = this.d || this.display
            switch (display.toLowerCase()) {
                case `block`:
                    return `z-block`
                case `inline-block`:
                    return `z-inline-block`
                case `flex`:
                    return `z-flex`
                case `inline-flex`:
                    return `z-inline-flex`
                case `grid`:
                    return `z-grid`
                case `inline-grid`:
                    return `z-inline-grid`
                case `none`:
                    return `z-none`
                default:
                    return `z-initial`
            }
        },
        /**
         * Computed property to return all the custom styles to be used in the custom class
         * that will be injected into a <style> tag.
         */
        customStyles () {
            return {
                ...this.getMargin,
                ...this.getPadding,
                ...this.getHeight,
                ...this.getWidth,
                ...this.flexStyles,
                ...this.gridStyles,
                ...this.getSize,
                position: this.position,
            }
        },
        /**
         * Computed property to return all the classes that are static.
         */
        classes () {
            return [
                `zen-box`,
                this.className,
                this.displayClass,
                this.bgClass,
                this.shadowClass
            ]
        }
    },
    methods: {
        /**
         * Generates a new custom class if certain prop values change
         */
        rehydrateClass (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.className = injectClass(this.customStyles)
            }
        }
    },
    watch: {
        alignItems (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        flexDirection (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        flexWrap (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        justifyContent (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        gridArea (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        gridTemplateAreas (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        gridGap (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        gridRowGap (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        gridColumnGap (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        gridAutoColumns (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        gridColumn (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        gridRow (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        gridAutoFlow (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        gridAutoRows (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        gridTemplateRows (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        gridTemplateColumns (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        height (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        h (newVal, oldVal){
            this.rehydrateClass(newVal, oldVal)
        },
        margin (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        m (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        marginTop (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        mt (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        marginRight (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        mr (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        marginBottom (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        mb (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        marginLeft (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        ml (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        padding (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        p (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        paddingTop (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        pt (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        paddingRight (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        pr (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        paddingBottom (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        pb (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        paddingLeft (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        pl (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        width (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
        w (newVal, oldVal) {
            this.rehydrateClass(newVal, oldVal)
        },
    }
}
</script>
<style scoped>
/* Box classes */
.zen-box {
    min-width: 0;
    word-wrap: break-word;
    background-clip: border-box;
}

</style>