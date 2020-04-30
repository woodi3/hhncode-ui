<template>
    <zen-box
        :d="'grid'"
        :id="id"
        :gridGap="gridSpacing"
        :gridColumnGap="spacingX"
        :gridRowGap="spacingY"
        :gridTemplateColumns="templateColumns"
    >
        <slot></slot>
    </zen-box>
</template>

<script>
import ZenBox from './ZenBox'
export default {
    name: "zen-grid",
    components: {
        ZenBox
    },
    props: {
        columns: {
            required: false
        },
        spacing: {
            required: false
        },
        spacingX: {
            required: false
        },
        spacingY: {
            required: false
        },
        minChildWidth: {
            required: false
        }
    },
    data () {
        return {
            id: null
        }
    },
    mounted () {
        this.id = `zen${this._uid}`
    },
    computed: {
        /**
         * Computed property to build the grid-template-columns attribute for the grid
         */
        templateColumns () {
            return this.minChildWidth !== undefined ? this.widthToColumns(this.minChildWidth) : this.countToColumns(this.columns)
        },
        /**
         * Computed property that appends `px` to a number
         */
        px (n) {
            return typeof n === "number" ? n + "px" : n
        },
        /**
         * Computed property that builds a grid spacing object for the grid-spacing attribute
         */
        gridSpacing () {
            if (typeof this.spacing === 'number' && !isNaN(this.spacing)) {
                return {
                    row: this.spacing,
                    column: this.spacing
                }
            }
            else if (typeof this.spacing === 'string' && !isNaN(parseInt(this.spacing, 10))){
                return {
                    row: this.spacing,
                    column: this.spacing
                }
            }
            return this.spacing
        }
    },
    methods: {
        /**
         * @param {object} width
         */
        widthToColumns (width) {
            if (Array.isArray(width)) {
                return width.map(this.widthToColumns);
            }

            if (
                width !== null &&
                typeof width === "object" &&
                Object.keys(width).length > 0
            ) {
                const acc = {};
                for (let key in width) {
                    acc[key] = `repeat(auto-fit, minmax(${this.px(width[key])}, 1fr))`;
                }
                return acc;
            }

            if (width != null) {
                return `repeat(auto-fit, minmax(${this.px(width)}, 1fr))`;
            }

            return null
        },
        countToColumns (count) {
            if (Array.isArray(count)) {
                return count.map(this.countToColumns);
            }

            if (
                count !== null &&
                typeof count === "object" &&
                Object.keys(count).length > 0
            ) {
                const acc = {};
                for (let key in count) {
                    acc[key] = `repeat(${count[key]}, 1fr)`;
                }
                return acc;
            }

            if (count != null) {
                return `repeat(${count}, 1fr)`;
            }

            return null
        }
    }
}
</script>