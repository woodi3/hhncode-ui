<template>
    <zen-box :w="width" mt=".25rem" mb=".25rem" class="search">
        <zen-input-group>
            <zen-input-element>
                <span class="sr-only">Search Icon</span>
                <v-icon :class="[searchIconColorClass]" :icon="searchIcon"/>
            </zen-input-element>
            <zen-input :variant="variant" 
                :placeholder="placeholder" 
                :name="name"
                :aria-label="ariaLabel" 
                v-model="searchVal"
                trim
                :invalid="invalid"
                @input="propagateInput" />
            <zen-input-element v-if="loading"
                position="right">
                <span class="sr-only">Loading</span>
                <zen-spinner size="sm" />
            </zen-input-element>
        </zen-input-group>
        <zen-error-message v-if="invalid">
            <span>{{errorMessage}}</span>
        </zen-error-message>
    </zen-box>
</template>

<script>
export default {
    props: {
        width: {
            type: String
        },
        ariaLabel: {
            type: String,
        },
        name: {
            type: String,
        },
        placeholder: {
            type: String,
        },
        value: {
            required: false
        },
        variant: {
            type: String,
        },
        searchIconColorClass: {
            type: String,
            default: 'text-primary',
        },
        searchIcon: {
            type: Array,
            default: () => ['fas', 'search'],
        },
        invalid: {
            type: Boolean
        },
        loading: {
            type: Boolean
        },
        errorMessage: {
            type: String,
        }
    },
    data () {
        return {
            searchVal: '',
        }
    },
    methods: {
        propagateInput () {
            this.$emit('input', this.searchVal)
        }
    }
}
</script>