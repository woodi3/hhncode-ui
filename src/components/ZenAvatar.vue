<template>
    <div class="zen-avatar" :class="classes">
        <img class="zen-avatar-img" 
            v-if="imgSrc && imgSrc.trim() !== ''"
            :src="imgSrc" 
            :alt="alt" />
        <span class="zen-avatar-initials" 
            v-else-if="initials && initials.trim() !== ''">
            {{initials.toLowerCase()}}
        </span>
    </div>
</template>

<script>

export default {
    name: 'zen-avatar',
    props: {
        alt: {
            type: String,
            default: `An avatar image`
        },
        imgSrc: {
            type: String
        },
        initials: {
            type: String
        },
        size: {
            type: String,
            default: 'md'
        },
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
        sizeProp () {
            switch (this.size) {
                case `small`:
                case `sm`:
                    return `zen-avatar-sm`
                case `medium`:
                case `med`:
                case `md`:
                    return `zen-avatar-md`
                case `large`:
                case `lg`:
                    return `zen-avatar-lg`
                default:
                    return `zen-avatar-md`
            }
        },
        classes () {
            return [
                this.sizeProp
            ]
        }
    }
}
</script>
<style scoped>
/* Avatar classes */
.zen-avatar {
    background-color: var(--gray-color);
    border-color: var(--gray-color);
    color: var(--black-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.zen-avatar.zen-avatar-md {
    height: var(--default-avatar-height);
    width: var(--default-avatar-width);
}
.zen-avatar.zen-avatar-sm {
    height: calc(var(--default-avatar-height) * .75);
    width: calc(var(--default-avatar-width) * .75);
}
.zen-avatar.zen-avatar-lg {
    height: calc(var(--default-avatar-height) * 1.25);
    width: calc(var(--default-avatar-width) * 1.25);
}
.zen-avatar > .zen-avatar-img {
    height: 100%;
    width: 100%;
}
.zen-avatar-initials {
    font-weight: bolder;
}
.zen-avatar.zen-avatar-md > .zen-avatar-initials {
    font-size: var(--font-size);
}
.zen-avatar.zen-avatar-sm > .zen-avatar-initials {
    font-size: var(--font-size-sm);
}
.zen-avatar.zen-avatar-lg > .zen-avatar-initials {
    font-size: var(--font-size-lg);
}
</style>