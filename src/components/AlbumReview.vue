<template>
    <zen-flex class="album-review text-left pt-4 pb-4"
        direction="column"
        :class="{disabled: !isActive, active: isActive}"
        @mouseover.native="notifyMouseOver"
        @click.native="notifyClick">
        <zen-box>
            <badge class="ml-1 mt-3 mb-3 mr-1"
                v-for="tag in albumReview.tags" :key="tag._id"
                :text="tag.text"
                :color="tag.color"/>
        </zen-box>
        <zen-text header="h5">
            {{albumReview.title}}
        </zen-text>
        <zen-text v-if="albumReview.meta && albumReview.meta.subtitle" 
        class="artist mt-2 mb-2"
        italic>
            {{albumReview.meta.subtitle}}
        </zen-text>
    </zen-flex>
</template>

<script>
import Badge from './Badge'

export default {
    props: {
        albumReview: {
            type: Object,
            required: true,
        },
        isActive: {
            type: Boolean,
        }
    },
    components: {
        Badge,
    },
    methods: {
        notifyMouseOver () {
            this.$emit('mouseover')
        },
        notifyClick () {
            this.$emit('click')
        },
    }
}
</script>

<style scoped>
.album-review.disabled {
  opacity: .75;  
}
.album-review.active {
    opacity: 1;
    cursor: pointer;
}
.album-review.active:hover {
    border-bottom: 2px solid var(--primary-color);
}
</style>