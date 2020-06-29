<template>
    <zen-box class="container receipts">
        <zen-flex class="header" justify="space-between">
            <h3>Email</h3>
            <h3>Amount</h3>
            <h3>Item</h3>
            <h3>Actions</h3>
        </zen-flex>
        <zen-spinner class="spinner" v-if="loading" />
        <zen-box class="receipt-list" v-else>
            <zen-flex class="receipt-item"
                justify="space-between"
                align="center"
                v-for="receipt of receipts" :key="receipt._id">
                <zen-text italic>{{receipt.email}}</zen-text>
                <zen-text>{{currencyConverter(receipt.amount)}}</zen-text>
                <zen-text transform="capitalize">{{receipt.item}}</zen-text>
                <zen-box>
                    <zen-button color="plain-danger" @click="deleteReceipt(tag)">
                        <zen-spinner v-if="isDeleting" color="danger" size="sm"/>
                        <v-icon v-else :icon="['fas', 'trash']" />
                    </zen-button>
                </zen-box>
            </zen-flex>
        </zen-box>
    </zen-box>
</template>

<script>
export default {
    data () {
        return {
            loading: false,
            isDeleting: false,
            receipts: [],
        }
    },
    mounted () {
        this.loadReceipts()
    },
    computed: {
        token () {
            return this.$store.state.token
        },
    },
    methods: {
        currencyConverter (receiptAmount) {
            return (receiptAmount/100).toLocaleString("en-US", {style:"currency", currency:"USD"});
        },
        async loadReceipts () {
            try {
                this.loading = true
                const {success, receipts} = await this.$receiptService.getReceipts({deleted: false}, this.token)
                if (success) {
                    this.receipts = receipts
                }
                this.loading = false
            } catch (err) {
                this.loading = false
            }
        },
        async deleteReceipt (receipt) {
            try {
                if (confirm('Are you sure you want to delete this receipt?')) {
                    this.isDeleting = true
                    const { success } = await this.$receiptService.deleteReceipt(receipt, this.token)

                    this.isDeleting = false
                    if (success) {
                        this.loadReceipts()
                    }
                    else {
                        this.$toast({
                            type: 'error',
                            position: 'top',
                            title: 'Error deleting receipt',
                            message: 'Error deleting receipt'
                        })
                    }
                }

            } catch (err) {
                console.log(err) 
                this.isDeleting = false
                this.$toast({
                    type: 'error',
                    position: 'top',
                    title: 'Error deleting receipt',
                    message: 'Error deleting receipt'
                })
            }
        }
    },
}
</script>

<style scoped>
.header {
    border-bottom: 1px solid var(--gray-rgb-light);
}
.receipt-list {
    max-height: 700px;
    overflow-y: auto;
}
.receipt-list > .receipt-item {
    padding: calc(var(--spacing-rem) * 4) 0;
    border-bottom: 1px solid var(--gray-rgb-light);
}
.receipt > h3 {
    margin-top: calc(var(--spacing-rem) * 4);
    margin-bottom: calc(var(--spacing-rem) * 2);
}
.receipts > .spinner {
    margin: 0 auto;
}
</style>