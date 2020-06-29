<template>
    <zen-box class="tutorial-snapshot pt-8 pb-8">
        <zen-box class="container">
            <zen-text class="uppercase text-center title" 
                header="h7">
                Latest Tutorials
            </zen-text>
            <divider mt="32px" mb="32px" />
            
            <template v-if="loading">
                <tutorial-snapshot-skeleton v-for="n in 3" :key="n"/>
            </template>

            <template v-else>
                <tutorial-snapshot-item 
                    v-for="tutorial in tutorials" 
                    :key="tutorial.postId" 
                    :tutorial="tutorial" 
                    @click.native="goToDetail(tutorial)" 
                    @enterPressed="goToDetail(tutorial)"/>
            </template>

        </zen-box>
    </zen-box>
</template>

<script>
import Divider from './Divider'
import TutorialSnapshotItem from './TutorialSnapshotItem'
import TutorialSnapshotSkeleton from './TutorialSnapshotSkeleton'

export default {
    components: {
        Divider,
        TutorialSnapshotItem,
        TutorialSnapshotSkeleton,
    },
    props: {
        tutorials: {
            type: Array,
            required: true,
        },
        loading: {
            type: Boolean,
        }
    },
    methods: {
        goToDetail(post) {
            this.$router.push({name: 'detail', query: {title: post.title, _id: post._id}})
        }
    }
}
</script>

<style scoped>
.tutorial-snapshot .title {
    letter-spacing: 2px;
}
</style>