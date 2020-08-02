<template>
    <zen-box class="account container">
        <h1 class="text-center">Account Settings</h1>
        <app-loader v-if="loading" height="50%"/>
        <zen-flex v-else-if="error" align="center" justify="center" >
            <h2>Server error</h2>
        </zen-flex>
        <template v-else>
            <zen-flex justify="center">
                <zen-box f="0 0 75%">
                    <zen-input-group>
                        <zen-input-element>
                            <span class="sr-only">User Icon</span>
                            <v-icon :class="nameIsValid ? 'text-primary' : 'text-danger'" :icon="['fas', 'user']"/>
                        </zen-input-element>
                        <zen-input
                            v-model="userCopy.name"
                            variant="flushed" 
                            class="name mt-3 mb-1" 
                            name="user-name" 
                            placeholder="Your name" 
                            type="text"
                            ariaLabel="Your name"
                            :invalid="!nameIsValid"
                            :disabled="saving || checkingPassword"
                        />
                    </zen-input-group>
                    <zen-error-message v-if="!nameIsValid">
                        <span>
                            {{nameErrorMsg}}
                        </span>
                    </zen-error-message>
                </zen-box>
            </zen-flex>
            <zen-flex justify="center">
                <zen-box f="0 0 75%">
                    <zen-input-group>
                        <zen-input-element>
                            <span class="sr-only">Email icon</span>
                            <v-icon :class="emailIsValid ? 'text-primary' : 'text-danger'" :icon="['fas', 'envelope']"/>
                        </zen-input-element>
                        <zen-input
                            v-model="userCopy.email"
                            variant="flushed" 
                            class="name mt-3 mb-1" 
                            name="user-emai" 
                            placeholder="Your email" 
                            ariaLabel="Your email"
                            type="email"
                            :invalid="!emailIsValid"
                            :disabled="saving || checkingPassword"
                        />
                    </zen-input-group>
                    <zen-error-message v-if="!emailIsValid">
                        <span>
                            {{emailErrorMessage}}
                        </span>
                    </zen-error-message>
                </zen-box>
            </zen-flex>
            <zen-flex justify="center">
                <zen-box f="0 0 75%" pt=".75rem" pb="1rem">
                    <zen-flex>
                        <zen-label>
                            Receive notifications
                        </zen-label>
                        <zen-checkbox v-model="userCopy.notify"
                            ariaLabel="Receive notifications" 
                            :disabled="saving"/>
                    </zen-flex>
                </zen-box>
            </zen-flex>
            <zen-flex class="actions" direction="row" justify="center">
                <zen-button size="block" 
                    :disabled="!different || disableSave"
                    :isLoading="saving"
                    @click="save">
                        Save
                </zen-button>
            </zen-flex>
            <zen-flex justify="center">
                <zen-box f="0 0 75%" mt="1rem">
                    <zen-accordion maxHeight="300px" :isOpen="moreSettingsOpts.open">
                        <zen-accordion-header 
                            :icons="moreSettingsOpts.icons"
                            @open="openSettingsAccordion"
                            @close="closeSettingsAccordion">
                            More Settings
                        </zen-accordion-header>
                        <zen-accordion-content>
                            <zen-flex v-if="hasBookmarks"
                                align="center" 
                                justify="space-between">
                                <zen-text>View Bookmarks</zen-text>
                                <zen-button color="plain" @click="openBookmarks">
                                    Open
                                </zen-button>
                            </zen-flex>
                            <zen-flex v-if="!different" justify="space-between"
                                align="center">
                                <zen-text>Change your password</zen-text>
                                <zen-button color="plain" @click="openPasswordSheet">
                                    Change Password
                                </zen-button>
                            </zen-flex>
                            <zen-flex class="mb-2" 
                                justify="space-between" 
                                align="center">
                                <zen-text>Sign out</zen-text>
                                <zen-button color="plain-accent" @click="logout" :disabled="saving">
                                    Sign out
                                </zen-button>
                            </zen-flex>
                            <zen-flex justify="space-between" align="center">
                                <zen-text>Delete your account</zen-text>
                                <zen-button color="plain-danger" 
                                    :disabled="saving" 
                                    @click="openDeleteDialog">
                                    Delete Account
                                </zen-button>
                            </zen-flex>
                        </zen-accordion-content>
                    </zen-accordion>
                </zen-box>
            </zen-flex>
            <zen-alert title="Delete Account"
                prompt="Are you sure you want to delete your account?"
                description="Deleting your account is irreversible."
                confirmText="Delete"
                confirmBtnType="danger"
                :loading="deleting" 
                :isOpen="deleteDialogOpen"
                @cancel="closeDeleteDialog"
                @confirm="deleteUser" />

            <bookmarks :posts="bookmarkedPosts" 
                :isOpen="showBookmarks" 
                :loading="bookmarksLoading"
                @close="closeBookmarks"/>
            
            <change-password :isOpen="showPasswordSheet"
                :saving="saving"
                :checkingPassword="checkingPassword"
                :oldPasswordValid="oldPasswordValid"
                @currentPassInput="setOldPassword"
                @close="closePasswordSheet"
                @changePassword="setNewPassword"/>
        </template>
    </zen-box>
</template>

<script>

import AppLoader from '../components/AppLoader'
import Bookmarks from '../components/Bookmarks'
import ChangePassword from '../components/ChangePassword'

import {HIDE_FOOTER_KEY} from '../store/nav'
import { hasValue, validEmail, INPUT_STATES } from '../utils'
import { TOKEN_KEY, IS_AUTHENTICATED_KEY } from '../store/auth'
import { USER_KEY } from '../store/user'

const STATES = {
    LOADING: 'loading',
    SAVING: 'saving',
    NONE: 'none',
    ERROR: 'error',
    DELETING: 'deleting',
    BOOKMARKS_LOADING: 'bookmarks_loading',
    CHECKING_PASSWORD: 'checking_password',
}

export default {
    components: {
        AppLoader,
        Bookmarks,
        ChangePassword,
    },
    data () {
        return {
            userCopy: {},
            user: {},
            state: STATES.NONE,
            inputStates: {
                email: INPUT_STATES.NONE,
                name: INPUT_STATES.NONE,
            },
            moreSettingsOpts: {
                icons: {
                    open: ['fas', 'minus'],
                    close: ['fas', 'plus']
                },
                open: false,
            },
            deleteDialogOpen: false,
            bookmarkedPosts: [],
            showBookmarks: false,
            showPasswordSheet: false,
            oldPasswordValid: false,
            oldPassword: '',
        }
    },
    mounted () {
        this.hideFooter()
        this.load()
    },
    beforeDestroy () {
        this.showFooter()
    },
    beforeRouteEnter (to, from, next) {
        next(async (vm) => {
            if (vm.isAuthenticated) {
                await vm.$userService.redirect(vm.token, next, null, {name: 'new-account'})
            }
            else {
                next({name: 'new-account'})
            }
        })
    },
    computed: {
        loading () {
            return this.state === STATES.LOADING
        },
        checkingPassword () {
            return this.state === STATES.CHECKING_PASSWORD
        },
        bookmarksLoading () {
            return this.state === STATES.BOOKMARKS_LOADING
        },
        saving () {
            return this.state === STATES.SAVING
        },
        error () {
            return this.state === STATES.ERROR
        },
        deleting () {
            return this.state === STATES.DELETING
        },
        token () {
            return this.$store.state.token
        },
        isAuthenticated () {
            return this.$store.state.isAuthenticated
        },
        different () {
            return (
                this.user.name !== this.userCopy.name
                || this.user.email !== this.userCopy.email
                || this.user.notify !== this.userCopy.notify
            )
        },
        
        nameIsValid () {
            return hasValue(this.userCopy.name)
        },
        emailIsValid () {
            return hasValue(this.userCopy.email) && validEmail(this.userCopy.email)
        },
        disableSave () {
            return !this.nameIsValid || !this.emailIsValid || this.checkingPassword
        },
        nameErrorMsg () {
            return `Your name is required!`
        },
        emailErrorMessage () {
            if (!hasValue(this.userCopy.email)){
                return `Your email is required!`
            }
            if (!validEmail(this.userCopy.email)) {
                return `Please enter a valid email!`
            }
            return ``
        },
        bookmarks () {
            return this.user.bookmarks ? this.user.bookmarks : []
        },
        hasBookmarks () {
            return this.bookmarks.length > 0
        },
    },
    methods: {
        hideFooter () {
            this.$store.dispatch(HIDE_FOOTER_KEY, true)
        },
        showFooter () {
            this.$store.dispatch(HIDE_FOOTER_KEY, false)  
        },
        openSettingsAccordion () {
            this.moreSettingsOpts.open = true
        },
        closeSettingsAccordion () {
            this.moreSettingsOpts.open = false
        },
        copyUser (user) {
           this.userCopy = Object.assign({}, user)
        },
        openDeleteDialog () {
            this.deleteDialogOpen = true
        },
        closeDeleteDialog () {
            this.deleteDialogOpen = false
        },
        openBookmarks () {
            this.showBookmarks = true
            setTimeout(this._loadBookmarks.bind(this), 750)
        },
        openPasswordSheet () {
            this.showPasswordSheet = true
        },
        closePasswordSheet () {
            this.showPasswordSheet = false
        },
        closeBookmarks () {
            this.showBookmarks = false
            this.bookmarkedPosts = []
        },
        clearSession () {
            this.$store.dispatch(TOKEN_KEY, '')
            this.$store.dispatch(USER_KEY, null)
            this.$store.dispatch(IS_AUTHENTICATED_KEY, false)
        },
        logout () {
          this.clearSession()
          this.$router.replace({name: 'home'})
        },
        setOldPassword (val) {
            this.oldPassword = val
            this._validatePassword()
        },
        resetPasswordInputs () {
            this.oldPasswordValid = false
            this.oldPassword = ''
        },
        async setNewPassword (newPassword) {
            this.userCopy.password = newPassword
            await this.save()
            this.closePasswordSheet()
            setTimeout(() => {
                this.resetPasswordInputs()
                this.load()
                this.closeSettingsAccordion()
            }, 1000)
        },
        async _validatePassword () {
            try {
                this.state = STATES.CHECKING_PASSWORD
                const { success } = await this.$userService.validatePassword(this.user.email, this.oldPassword, this.token)
                this.oldPasswordValid = success
            } catch (err) {
                console.log(err)
                this.oldPasswordValid = false
            } finally {
                this.state = STATES.NONE
            }
        },
        async load () {
            try {
                this.state = STATES.LOADING
                // get user
                const { success, user } = await this.$userService.getUser(this.token)
                if (success) {
                    this.user = user
                    this.$store.dispatch(USER_KEY, user)
                    this.copyUser(user)
                    this.state = STATES.NONE
                }
                else {
                    this.state = STATES.ERROR
                }
                
            } catch (err) {
                console.error(err)
            }
        },
        async save () {
            try {
                this.state = STATES.SAVING
                const { success, user } = await this.$userService.updateUser(this.userCopy, this.token)
                if (success) {
                    this.user = user
                    this.copyUser(user)
                    this.state = STATES.NONE
                    this.$toast({
                        title: 'Updated information',
                        message: 'Your information was successfully updated.',
                        position: 'bottom-right',
                    })
                } else {
                    this.state = STATES.ERROR
                }
            } catch (err) {
                console.error(err)
            }
        },
        async deleteUser () {
            try {
                this.state = STATES.DELETING
                const { success } = await this.$userService.deleteUser(false, {_id: this.user._id}, this.token)
                if (success) {
                    this.$toast({
                        title: 'Account Deleted',
                        message: 'Your account was successfully deleted.',
                        position: 'top',
                        duration: 4000,
                    })
                    this.clearSession()
                    this.closeDeleteDialog()
                    this.$nextTick(() => this.$router.replace({name: 'home'}))
                }
                else {
                    this.$toast({
                        type: 'error',
                        title: 'Error',
                        message: 'There was an error deleting your account. Please try again.',
                        position: 'top'
                    })
                }

            } catch (err) {
                console.error(err)
                this.$toast({
                    type: 'error',
                    title: 'Error',
                    message: 'There was an error deleting your account. Please try again.',
                    position: 'top'
                })
            } finally {
                this.state = STATES.NONE
            }
        },
        async _loadBookmarks () {
            try {
                this.state = STATES.BOOKMARKS_LOADING
                const { success, posts } = await this.$postService.getBatchPosts(this.bookmarks)

                if (success) {
                this.bookmarkedPosts = posts
                }

            } catch (err) {
                this.state = STATES.NONE
            } finally {
                this.state = STATES.NONE
            }
        },
    }
}
</script>

<style scoped>
.actions {
    width: 33%;
    margin: 0 auto;
}
.bookmark-btn {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
</style>