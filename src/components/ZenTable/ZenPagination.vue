<template>
    <zen-box class="zen-pagination" ref="zenPagination" :w="width">
        <ul class="pt-1 pb-1">
            <li class="zen-page-item" :class="{'disabled': currentPage <= 1}" @click="goTo(currentPage, currentPage-1)">
                <zen-button 
                    class="zen-page-btn"
                    color="plain-gray" 
                    size="sm" 
                    :class="{disabled: currentPage <= 1}" 
                    :disabled="currentPage <= 1">
                    <span class="zen-arrow left"></span>
                </zen-button>
            </li>
            <li v-if="currentPage > MAX_PAGES"
                class="zen-page-item"
                @click="goTo(pagesToShow[0], pagesToShow[0]-1)">
                <zen-button
                    class="zen-page-btn inactive"
                    color="plain"
                    size="sm">
                    ...
                </zen-button>
            </li>
            <li class="zen-page-item"
                v-for="p in pagesToShow" 
                :key="p"
                @click="goTo(p, p)">
                <zen-button
                    class="zen-page-btn"
                    :class="{inactive: currentPage !== p, 'bg-primary': currentPage === p}"
                    color="plain"
                    size="sm">
                    {{p}}
                </zen-button>
            </li>
            <li v-if="pagesToShow[pagesToShow.length - 1]+1 <= totalPages.length"
                class="zen-page-item"
                @click="goTo(pagesToShow[pagesToShow.length-1], pagesToShow[pagesToShow.length-1]+1)">
                <zen-button
                    class="zen-page-btn inactive"
                    color="plain"
                    size="sm">
                    ...
                </zen-button>
            </li>
            <li class="zen-page-item" :class="{'disabled': currentPage >= totalPages.length}" @click="goTo(currentPage, currentPage+1)">
                <zen-button 
                    class="zen-page-btn"
                    color="plain-gray" 
                    size="sm" 
                    :class="{disabled: currentPage >= totalPages.length}" 
                    :disabled="currentPage >= totalPages.length">
                    <span class="zen-arrow right"></span>
                </zen-button>
            </li>
            <li class="zen-page-item item-count">
                {{minIndex+1}} - {{maxIndex}} of {{totalItems}} items
            </li>
        </ul>
    </zen-box>
</template>

<script>

import ZenBox from '../ZenBox'
import ZenButton from '../ZenButton'

const MAX_PAGES = 3

export default {
    name: "zen-pagination",
    components: {
        ZenBox,
        ZenButton
    },
    props: {
        totalItems: {
            type: Number,
            required: true
        },
        rowsPerPage: {
            type: Number,
            required: true
        },
        width: {
            required: false
        }
    },
    data () {
        return {
            currentPage: 1,
            totalPages: [],
            pagesToShow: [],
            displayMinIndex: 1,
            displayMaxIndex: 0,
            MAX_PAGES: MAX_PAGES
        }
    },
    mounted () {
        this.setKeydownEvent()
        this.updatePagination()
    },
    beforeDestroy () {
        this.destroyKeydownEvent()
    },
    computed: {
        minIndex () {
            return (this.currentPage * this.rowsPerPage) - this.rowsPerPage
        },
        maxIndex () {
            const max = this.currentPage * this.rowsPerPage
            return max > this.totalItems ? this.totalItems : max
        }
    },
    methods: {
        updatePagination () {
            const numOfPages = Math.ceil(this.totalItems / this.rowsPerPage)
            this.totalPages = Array(numOfPages).fill(0).map((_, i) => ++i)
            this.pagesToShow = this.totalPages.slice(0, this.MAX_PAGES)
        },
        goTo (previousPage, nextPage) {
            if (nextPage > this.totalPages.length) {
                previousPage = this.totalPages.length - 1;
                nextPage = this.totalPages.length;
            }
            else if (nextPage < 1) {
                nextPage = 1
                previousPage = 2
            }

            let shiftPages = false

            if (previousPage > nextPage) {
                shiftPages = nextPage % this.MAX_PAGES === 0

                if (shiftPages && nextPage > 1) {
                    this.pagesToShow = this.totalPages.slice(nextPage - this.MAX_PAGES, nextPage)
                }
            }
            else if (nextPage > previousPage) {
                shiftPages = previousPage % this.MAX_PAGES === 0

                if (shiftPages && nextPage <= this.totalPages.length) {
                    this.pagesToShow = this.totalPages.slice(previousPage, (nextPage - 1) + this.MAX_PAGES)
                }
            }

            this.currentPage = nextPage

            const minIndex = this.minIndex
            const maxIndex = this.maxIndex
            this.$emit('changePage', { minIndex, maxIndex })
        },
        handleKeydown (event) {
            if (event.keyCode === 37 || event.key === "ArrowLeft") {
                // left arrow
                this.goTo(this.currentPage, this.currentPage-1)
            } 
            else if (event.keyCode === 39 || event.key === "ArrowRight") {
                // right arrow
                this.goTo(this.currentPage, this.currentPage+1)
            }
        },
        destroyKeydownEvent () {
            const pagination = this.$refs.zenPagination.$el
            pagination.removeEventListener('keydown', this.handleKeydown)
        },
        setKeydownEvent () {
            const pagination = this.$refs.zenPagination.$el
            pagination.setAttribute('tabindex', '-1')
            pagination.addEventListener('keydown', this.handleKeydown)
        },
    },
    watch: {
        rowsPerPage (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.updatePagination()
            }
        },
        totalItems (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.updatePagination()
            }
        }
    }
}
</script>

<style scoped>
.zen-pagination > ul {
    display: flex;
    align-items: center;
    padding-left: 0;
    list-style: none;
    margin: 0px;
    background-color: var(--table-background-color);
    border-color: var(--divider-color);
    border-width: 0 1px 1px 1px;
    border-style: solid;
}
.zen-page-item {
    padding: var(--spacing-rem);
}
.zen-page-btn {
    border-radius: 0;
}
.item-count {
    margin-left: auto;
}
.zen-arrow {
    border: solid var(--gray-darker-color);
    border-width: 0 2px 2px 0;
    display: inline;
    padding: var(--spacing-rem);
}
.zen-arrow.right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
}
.zen-arrow.left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
}
</style>