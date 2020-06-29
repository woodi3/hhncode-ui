<template>
    <zen-box class="container users">
        <zen-flex justify="space-between">
            <zen-button class="ml-1 mr-1 mt-3" 
                aria-label="Add user"
                color="outline-primary"
                @click="toggleForm">
                Add User
            </zen-button>
        </zen-flex>
        <zen-dialog :isOpen="showForm" @close="toggleForm">
            <zen-dialog-header @close="toggleForm">Create User</zen-dialog-header>
            <zen-dialog-body>
                <new-user-form 
                    :isLoading="isCreating"
                    :user="newUser"
                    @blur="handleBlur"
                />
            </zen-dialog-body>
            <zen-dialog-footer>
                <zen-button class="ml-2 mr-2" 
                    color="plain"
                    @click="toggleForm">
                    Cancel
                </zen-button>
                <zen-button ariaLabel="Save user"
                    :isLoading="isCreating"
                    :disabled="addUserBtnDisabled"
                    @click="addUser">
                    Add
                </zen-button>
            </zen-dialog-footer>
        </zen-dialog>
        <zen-flex class="header" justify="space-between">
            <h3>Name</h3>
            <h3>Email</h3>
            <h3>Actions</h3>
        </zen-flex>
        <zen-spinner class="spinner" v-if="loading"/>
        <zen-box v-else-if="users.length > 0" class="user-list">
            <zen-flex class="user-item"
                justify="space-between"
                align="center"
                v-for="user of users" :key="user._id">
                <zen-text>{{user.name}}</zen-text>
                <zen-text>{{user.email}}</zen-text>
                <zen-box>
                    <zen-button color="plain" @click="edit(user)">
                        <v-icon :icon="['fas', 'pen']" />
                    </zen-button>
                    <zen-button color="plain-danger"
                        @click="deleteUser(user)">
                        <zen-spinner v-if="isDeleting" color="danger" size="sm"/>
                        <v-icon v-else :icon="['fas', 'trash']" />
                    </zen-button>
                </zen-box>
            </zen-flex>
        </zen-box>
        <zen-box v-else>
            <h3 class="text-center">No users</h3>
        </zen-box>
    </zen-box>
</template>

<script>
import NewUserForm from '../components/NewUserForm'

export default {
    components: {
        NewUserForm,
    },
    data () {
        return {
            loading: false,
            isCreating: false,
            isDeleting: false,
            showForm: false,
            users: [],
            newUser: {
                name: '',
                email: '',
                password: '',
                notify: false,
                isAdmin: false,
            },
        }
    },
    mounted () {
        this.loadUsers()
    },
    computed: {
        token () {
            return this.$store.state.token
        },
        addUserBtnDisabled () {
            return this.newUser.name === '' || this.newUser.email === ''
        }
    },
    methods: {
        toggleForm () {
            this.showForm = !this.showForm
        },
        handleBlur (user) {
            this.newUser = {...user}
        },
        edit (user) {
            this.newUser = {...user}
            this.toggleForm()
        },
        sortDesc (uA, uB) {
            if (this.$dayjs(uA.createdAt).isBefore(this.$dayjs(uB.createdAt))){
                return 1
            }
            return -1
        },
        async loadUsers () {
            try {
                this.loading = true
                const { success, users } = await this.$userService.getUsers(this.token)
                if (success) {
                    users.sort(this.sortDesc.bind(this))
                    this.users = users
                }
                this.loading = false
            } catch (err) {
                this.loading = false
            }
        },
        async addUser () {
            try {
                this.isCreating = true
                const { success } = await this.$userService.createUser(this.newUser, this.token)
                
                if (this.showForm) {
                    this.toggleForm()
                }

                this.isCreating = false

                if (success) {
                    await this.loadUsers()
                }

                this.$toast({
                    type: 'success', 
                    position: 'top', 
                    title: 'Created user!', 
                    message: 'Created a new user.'
                })

            } catch (err) {
                console.log(err)
                this.$toast({
                    type: 'error',
                    position: 'top',
                    title: 'Error creating user',
                    message: 'Error creating new user'
                })
            }
        },
        async deleteUser (user) {
            try {
                this.isDeleting = true
                const { success } = await this.$userService.deleteUser(user, this.token)

                this.isDeleting = false
                if (success) {
                    await this.loadUsers()
                }
                else {
                    this.$toast({
                        type: 'error',
                        position: 'top',
                        title: 'Error deleting user',
                        message: 'Error deleting new user'
                    })
                }

            } catch (err) {
                console.log(err) 
                this.isDeleting = false
                this.$toast({
                    type: 'error',
                    position: 'top',
                    title: 'Error deleting user',
                    message: 'Error deleting new user'
                })
            }
        }
    }
}
</script>

<style scoped>
.header {
    border-bottom: 1px solid var(--gray-rgb-light);
}
.user-list {
    max-height: 700px;
    overflow-y: auto;
}
.user-list > .user-item {
    padding: calc(var(--spacing-rem) * 4) 0;
    border-bottom: 1px solid var(--gray-rgb-light);
}
.header > h3 {
    margin-top: calc(var(--spacing-rem) * 4);
    margin-bottom: calc(var(--spacing-rem) * 2);
}
.users > .spinner {
    margin: 0 auto;
}
</style>