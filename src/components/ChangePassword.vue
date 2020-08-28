<template>
    <bottom-sheet :isOpen="isOpen" @close="close">
        <zen-box class="change-password-header pl-10 mt-4 pt-2 pb-2">
            <zen-text header="h6">
                Change Password
            </zen-text>
        </zen-box>
        <zen-box w="50%" ml="auto" mr="auto">
            <zen-box mb=".5rem">
                <zen-input-group>
                    <zen-input-element position="left">
                        <span class="sr-only">Lock icon</span>
                        <v-icon v-if="!checkingPassword" class="text-grey" 
                            :icon="['fas', oldPasswordValid ? 'lock-open' : 'lock']"/>
                        <zen-spinner v-else size="sm"/>   
                    </zen-input-element>
                    <zen-input
                        v-model="oldPassword"
                        variant="flushed" 
                        class="old-password mt-3 mb-1" 
                        name="old-password" 
                        placeholder="Current password" 
                        ariaLabel="Current password"
                        type="password"
                        :invalid="!oldPasswordValid"
                        @input="emitCurrentPassInput"
                    />
                </zen-input-group>
            </zen-box>
            <zen-box mt=".5rem" mb="2rem" v-if="oldPasswordValid">
                <zen-input-group>
                    <zen-input-element position="left">
                        <span class="sr-only">Lock icon</span>
                        <v-icon 
                            :class="newPasswordIsValid ? 'text-primary' : 'text-danger'" 
                            :icon="['fas', newPasswordIsValid ? 'check' : 'lock']"/> 
                    </zen-input-element>
                    <zen-input
                        v-model="newPassword"
                        variant="flushed" 
                        class="new-password mt-3 mb-1" 
                        name="new-password" 
                        placeholder="New password" 
                        ariaLabel="New password"
                        type="password"
                        :invalid="!newPasswordIsValid"
                        :disabled="saving"
                    />
                </zen-input-group>
                <zen-button :disabled="saving || !newPasswordIsValid"
                    :isLoading="saving"
                    @click="emitChangePassword">
                    Change Password
                </zen-button>
            </zen-box>
        </zen-box>
    </bottom-sheet>
</template>

<script>
import debounce from 'lodash.debounce'
import BottomSheet from './BottomSheet'
import { hasValue } from '../utils'


export default {
    props: {
        isOpen: {
            type: Boolean
        },
        checkingPassword: {
            type: Boolean
        },
        oldPasswordValid: {
            type: Boolean
        },
        saving: {
            type: Boolean
        },
    },
    data () {
        return {
            oldPassword: '',
            newPassword: '',
        }
    },
    components: {
        BottomSheet,
    },
    computed: {
        newPasswordIsValid () {
            return hasValue(this.newPassword) && this.newPassword.length >= 6  
        },
    },
    methods: {
        emitCurrentPassInput: debounce(function () {
            this.$emit('currentPassInput', this.oldPassword)
        }, 250),
        emitChangePassword () {
            this.$emit('changePassword', this.newPassword)
        },
        close () {
            this.$emit('close')
        }
    }
}
</script>