<template>
    <zen-box class="new-newUser-form">
        <zen-box mt=".75rem" mb=".75rem">
                <zen-input v-model="newUser.name"
                    variant="flushed" 
                    class="name mt-3 mb-3" 
                    name="newUser-name" 
                    placeholder="Name" 
                    type="text" 
                    required
                    :disabled="isLoading"
                    @blur.native="notify"
                />
            </zen-box>
            <zen-box mt=".75rem" mb=".75rem">
                <zen-input v-model="newUser.email"
                    variant="flushed" 
                    class="newUser-email mt-3 mb-3" 
                    name="newUser-email" 
                    placeholder="Email" 
                    type="email" 
                    required
                    :disabled="isLoading"
                    @blur.native="notify"
                />
            </zen-box>
            <zen-box mt=".75rem" mb=".75rem">
                <zen-input v-model="newUser.password"
                    variant="flushed" 
                    class="newUser-password" 
                    name="newUser-password" 
                    placeholder="Password" 
                    type="password" 
                    required
                    :disabled="isLoading" 
                    @blur.native="notify" />
            </zen-box>
            <zen-box mt=".75rem" mb=".75rem">
                 <zen-checkbox v-model="newUser.notify" @change="notify"/>
                <zen-label>
                    Notify
                </zen-label>
            </zen-box>
            <zen-box mt=".75rem" mb=".75rem">
                 <zen-checkbox v-model="newUser.isAdmin" @change="notify"/>
                <zen-label>
                    Admin
                </zen-label>
            </zen-box>
    </zen-box>
</template>

<script>
// TODO
// Add validation for fields

export default {
    props: {
        isLoading: {
            type: Boolean
        },
        user: {
            type: Object
        }
    },
    data () {
        return {
            newUser: {},
        }
    },
    mounted () {
        if (this.user) {
            this.newUser = {...this.user}
        }
    },
    methods: {
        notify () {
            this.$emit('blur', this.newUser)
        }
    }
}
</script>