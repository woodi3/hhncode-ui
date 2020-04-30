<template>
    <div>
        <zen-box class="zen-table" :h="h || height" :w="w || width" :ref="'zenTable'">
            <!-- Going to wrap both header table and body table -->
            <zen-box class="zen-table-wrapper">
                <!-- contemplate adding extra wrapper for header for styling purposes -->
                <zen-box class="zen-table-header" :ref="'zenTableHeader'" :pr="scrollbarWidth">
                    <table>
                        <thead>
                            <tr>
                                <th class="zen-column" 
                                v-for="column in columns" 
                                :key="column.field" 
                                :ref="`zen_${column.field}_col`"
                                :class="{sortable: column.sortable, 'sort-active': sortKey === column.field}"
                                @click="sortBy(column.field)">
                                    <div>
                                        {{column.text && column.text !== '' ? column.text : column.field}}
                                        <span class="sort-arrow" 
                                        :class="{asc: sortOrders[column.field] === 1, desc: sortOrders[column.field] === -1}"></span>
                                    </div>
                                </th>
                            </tr>
                            <tr v-if="hasFilters">
                                <th class="zen-column-filter" 
                                v-for="column in columns" 
                                :key="column.field" 
                                :ref="`zen_${column.field}_filter`">
                                    <div v-if="column.filterable">
                                        Filter TODO - Add Inputs
                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </zen-box>
                <zen-box class="zen-table-body" :ref="'zenTableBody'">
                    <table :ref="'bodyTable'">
                        <tbody>
                            <tr v-for="(row, rowIndex) in dataPerPage" :key="rowIndex">
                                <td v-for="column in columns" :key="column.field" :ref="`zen_${column.field}_${rowIndex}`">{{row[column.field]}}</td>
                            </tr>
                        </tbody>
                    </table>
                </zen-box>
            </zen-box>
        </zen-box>
        <zen-page v-if="allowPagination" 
            :totalItems="totalItems" 
            :rowsPerPage="rowsPerPage"
            :width="w || width"
            @changePage="handlePagination"/>
    </div>
</template>

<script>

/**
 * TODO
 * Add filtering
 *  - Allow user to configure filters using json object
 *  - Filter needs an operator
 *  - Also user can choose if AND or OR logic is used when filtering
 *  - Set inputs for filter UI
 */

import ZenBox from '../ZenBox'
import ZenPage from './ZenPagination'

const SORT_ENUM = {
    HIDE: 0,
    ASC: 1,
    DESC: -1
}

export default {
    name: 'zen-table',
    components: {
        ZenBox,
        ZenPage
    },
    props: {
        dataSource: {
            type: Array,
            required: true
        },
        columns: {
            type: Array,
            required: true
        },
        allowPagination: {
            type: Boolean,
            required: false
        },
        rowsPerPage: {
            type: Number,
            required: false,
            default: 20
        },
        height: {
            required: false
        },
        h: {
            required: false
        },
        width: {
            required: false
        },
        w: {
            required: false
        }
    },
    data () {
        return {
            id: null,
            className: '',
            scrollbarWidth: 0,
            sortKey: '',
            sortOrders: {},
            minIndex: 0,
            maxIndex: this.rowsPerPage,
        }
    },
    mounted () {
        this.id = `zen${this._uid}`
        this.columns.forEach(column => this.$set(this.sortOrders, column.field, SORT_ENUM.HIDE))
        this.setScrollEvent()
        this.setTableBodyHeight()
        this.scrollbarWidth = this.getScrollbarWidth()
        this.setColumnWidths()
    },
    beforeDestroy () {
        this.destroyScrollEvent()
    },
    computed: {
        totalItems () {
            return this.uiData.length
        },
        uiData () {
            let sortKey = this.sortKey
            let order = this.sortOrders[sortKey] || 1
            let data = this.dataSource
            if (sortKey) {
                data = data.slice().sort((a, b) => {
                    a = a[sortKey]
                    b = b[sortKey]
                    return (a === b ? 0 : a > b ? 1 : -1) * order
                })
            }
            return data
        },
        dataPerPage () {
            if (this.allowPagination) {
                return this.uiData.filter((item, index) => index >= this.minIndex && index < this.maxIndex)
            }
            return this.uiData
        },
        hasFilters () {
            return this.columns.some(c => c.filterable)
        }
    },
    methods: {
        /**
         * Destroys the scroll event on the zenTableBody ref
         */
        destroyScrollEvent () {
            const tableBodyEl = this.$refs.zenTableBody.$el
            tableBodyEl.removeEventListener("scroll", this.handleScroll)
        },
        /**
         * Returns ref key for column
         * @param {object} column
         */
        getColumnRef (column) {
            return `zen_${column.field}_col`
        },
        /**
         * Return ref key for cell
         * @param {number} rowIndex
         * @param {Object} column
         */
        getCellRef (rowIndex, column) {
            return `zen_${column.field}_${rowIndex}`
        },
        /**
         * Gets the scrollbar width from the table body element
         */
        getScrollbarWidth() {
            const el = this.$refs.zenTableBody.$el
            return el.offsetWidth - el.clientWidth
        },
        /**
         * Gets width of element without padding included
         * @param {HTMLElement} el
         */
        getWidth (el) {
            // get the computed styles
            var computedStyle = getComputedStyle(el)

            // check if minWidth is set
            const minWidth = parseFloat(computedStyle.minWidth)

            // if the width of the element is greater than its minWidth, then use the width
            // if minWidth is greater, use minWidth
            let width = el.clientWidth > minWidth ? el.clientWidth : minWidth

            // subtract padding
            width -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight)

            return width
        },
        /**
         * Handles event when page changes
         */
        handlePagination ({minIndex, maxIndex}) {
            this.minIndex = minIndex
            this.maxIndex = maxIndex
        },
        /**
         * Function to run when user scrolls the table body
         */
        handleScroll () {
            const tableBodyEl = this.$refs.zenTableBody.$el
            const tableHeaderEl = this.$refs.zenTableHeader.$el
            
            // modify the css left property to give impression of scrolling
            tableHeaderEl.style.left = `${tableBodyEl.scrollLeft * -1}px`
        },
        /**
         * Sets the scroll event on the zenTableBody ref
         */
        setScrollEvent () {
            const tableBodyEl = this.$refs.zenTableBody.$el
            tableBodyEl.addEventListener("scroll", this.handleScroll)
        },
        /**
         * Sets the table body height attribute. We do 100% - table header height
         */
        setTableBodyHeight () {
            const tableHeaderEl = this.$refs.zenTableHeader.$el
            const tableBodyEl = this.$refs.zenTableBody.$el

            // get the computed styles for the table header element
            const computedStyle = getComputedStyle(tableHeaderEl)

            // set the value
            tableBodyEl.style.height = `calc(100% - ${computedStyle.height})`
        },
        /**
         * Sets the width of the table columns based on if the header is longer than the cells.
         */
        setColumnWidths () {
            // total widths
            let widthSum = 0

            // loop each column to determine if its data is longer than it
            this.columns.forEach(column => {
                // get the column ref
                const columnRef = this.$refs[this.getColumnRef(column)]
                if (columnRef[0]) {
                    // get the header element width
                    let colWidth = this.getWidth(columnRef[0])

                    // use the first row for the body
                    const firstRow = this.dataSource[0]
                    if (firstRow) {
                        // get the cell at index zero for the column
                        let cellRefArr = this.$refs[this.getCellRef(0, column)]
                        if (cellRefArr[0]) {
                            // this width is going to be the same for all rows
                            const width = this.getWidth(cellRefArr[0])

                            // if the header width is larger, 
                            // we set all the cells to that width
                            if (colWidth > width) {
                                widthSum += colWidth
                                // set the column width to the same value
                                columnRef[0].style.width = `${colWidth}px`
                                
                                // set every cell for this column to this width
                                for (let i = 0; i < this.dataPerPage.length; i++) {
                                    cellRefArr = this.$refs[this.getCellRef(i, column)]
                                    const cellRef = cellRefArr[0]
                                    cellRef.style.width = `${colWidth}px`
                                }
                            }
                            else {
                                widthSum += width
                                // set the column to the cell's width
                                columnRef[0].style.width = `${width}px`

                                // set every cell to this width
                                for (let i = 0; i < this.dataPerPage.length; i++) {
                                    cellRefArr = this.$refs[this.getCellRef(i, column)]
                                    const cellRef = cellRefArr[0]
                                    cellRef.style.width = `${width}px`
                                }
                            }
                        }
                    }
                }
            })

            // we set the width of the table element for the body
            // to all the widths added up
            const bodyTable = this.$refs.bodyTable
            const componentWidth = this.w || this.width
            
            if (componentWidth) {
                // only set the width if the component's width isn't a percent
                if (componentWidth.toString().indexOf('%') < 0) {
                    bodyTable.style.width = `${widthSum}px`
                }  
            }
        },
        sortBy (key) {
            this.sortKey = key
            if (this.sortOrders[key] === SORT_ENUM.HIDE) {
                // arrow is hidden right now so go to ASC
                this.sortOrders[key] = SORT_ENUM.ASC
            }
            else if (this.sortOrders[key] === SORT_ENUM.ASC) {
                // up arrow is showing, go from up to DSC
                this.sortOrders[key] = SORT_ENUM.DESC
            }
            else if (this.sortOrders[key] === SORT_ENUM.DESC) {
                // down arrow is showing, hide arrow now
                this.sortOrders[key] = SORT_ENUM.HIDE
                this.sortKey = ''
            }
        },
    }
}
</script>

<style scoped>
/* Zen Table Css */
.zen-table {
    background-clip: padding-box;
    border-color: var(--divider-color);
    background-color: var(--white-color);
    border-width: 1px;
    border-style: solid;
    outline: 0;
}
.zen-table table {
    margin: 0;
    width: 100%;
    max-width: none;
    border-width: 0;
    border-color: inherit;
    border-collapse: separate;
    border-spacing: 0;
    empty-cells: show;
    table-layout: fixed;
    outline: 0;
}
.zen-table thead, .zen-table tbody {
    text-align: left;
    border-color: inherit;
}
.zen-table tr {
    border-color: inherit;
}
.zen-table th, .zen-table td {
    padding: calc(var(--spacing-rem) * 3) calc(var(--spacing-rem) * 4);
    border-style: solid;
    border-color: inherit;
    outline: 0;
    font-weight: inherit;
    text-align: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
}

.zen-table th {
    border-width: 0 0 1px 1px;
    white-space: nowrap;
    min-width: 150px;
}
.zen-table th:first-child {
    border-left-width: 0;
}

.zen-table-wrapper {
    height: 100%;
    overflow: hidden;
    background-color: var(--table-background-color);
}
.zen-table-header {
    position: relative;
    background-color: var(--table-background-color);
    border-color: var(--divider-color);
    box-sizing: content-box;
    display: inline-block;
    vertical-align: top;
    position: relative;
}
.zen-table-header {
    border-bottom-width: 1px;
}
.zen-table-header > table {
    box-sizing: content-box;
    margin-bottom: -1px;
}

.zen-table-header .zen-column:first-child {
    border-left-width: 0;
}
.zen-table-header .zen-column:last-child {
    border-right-width: 1px;
}

.zen-table-header .zen-column {
    position: relative;
    vertical-align: bottom;
    cursor: default;
}

.zen-table-body {
    background-color: var(--white-color);
    width: 100%;
    min-height: 0;
    overflow: auto;
}
.zen-table-body td {
    border-width: 0 0 0 1px;
    border-style: solid;
    border-color: var(--divider-color);
    vertical-align: middle;
}
.zen-table-body td:first-child {
    border-left-width: 0;
}
.zen-table-body tr:nth-child(even) {
    background-color: var(--table-background-color);
}
.zen-table-body tr:nth-child(odd) {
    background-color: var(--white-color);
} 
.zen-column.sortable {
    cursor: pointer;
}
 
.zen-column.sort-active .sort-arrow {
    opacity: 1;
}

.sort-arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
}
  
.sort-arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid var(--danger-color);
}

.sort-arrow.desc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid var(--danger-color);
}

/* Zen Table CSS end */

</style>