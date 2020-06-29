<template>
    <zen-flex justify="center">
        <zen-box class="badge-box"
            pl="1rem" 
            pr="1rem" 
            pt=".25rem" 
            pb=".25rem"
            d="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap" 
            :f="`0 0 ${flexBasis}`" >
            <badge v-for="item in items"
                class="ml-1 mt-3 mb-3 mr-1" 
                :key="item._id"
                :text="item.text"
                :color="item.color" 
                :btn="true" 
                :disabled="!enabled(item)"
                @click="toggle(item)" />
        </zen-box>
    </zen-flex>
</template>

<script>
import Badge from './Badge'

export default {
    components: {
        Badge,
    },
    props: {
        items: {
            type: Array,
            required: true,
        },
        selection: {
            type: Array,
            required: true,
        },
        flexBasis: {
            type: String,
            required: true,
        },
    },
    methods: {
        enabled (item) {
            return this.getIdx(item) > -1
        },
        getIdx (item) {
            return this.selection.findIndex(t => t._id === item._id)
        },
        toggle (item) {
            this.$emit('toggle', item)
        },
    }
}
</script>

<style scoped>
@media screen and (max-width: 800px) {
  .badge-box {
    flex-basis: 100% !important;
  }
}
</style>