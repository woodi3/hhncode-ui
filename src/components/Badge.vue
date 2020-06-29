<template>
    <div class="tag"
    :class="{btn: isBtn}" 
    :style="style"
    :title="`${text} badge`"
    @click="handleClick">
        {{text}}
    </div>
</template>
<script>
export default {
    props: ["text", "color", "disabled", "btn", "button"],
    methods: {
        handleClick(evt) {
            if (this.isBtn) {
                this.$emit('click', evt)
            }
        }
    },
    computed: {
        isBtn () {
            return this.btn || this.button
        },
        style () {
            return {
                'background-color': this.color ? this.color : 'transparent', 
                'opacity': this.disabled ? .5 : 1,
                'color': this.textColor
            }
        },
        textColor () {
            if (this.color === "black")
                return "white"
            return "black"
        }
    }
}
</script>

<style scoped>
.tag {
    padding: calc(var(--spacing-rem) * 1.5);
    font-weight: bold;
    /* border-radius: 3px; */
    display: inline-block;
}
.tag.btn {
    cursor: pointer;
}
</style>