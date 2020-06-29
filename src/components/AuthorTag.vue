<template>
    <zen-box pt="1rem" pb="1rem" mt="1rem">
        <zen-box>
            <zen-text bold header="h6">
                Alex Wood is a millenial who is probably watching anime or <em>The Office</em> 
                with Rap playing in the background while coding a side project 
                he's been working on for over a year.
            </zen-text>
        </zen-box>
        <divider width="100%" height="2px"/>
        <zen-flex class="author">
            <zen-box f="0 0 20%">
                <img class="avatar" :src="'https://via.placeholder.com/500'" alt="author image"/>
            </zen-box>
            <zen-box f="0 0 80%" ml=".75rem">
                <zen-text class="written-by uppercase">Written by</zen-text>
                <zen-text class="name mt-2 mb-2" header="h7" bold>
                    Alex Wood
                </zen-text>
                <zen-text>
                    Software Engineer @ Genesys Inc.
                    Former President of Minorities in Computing.
                </zen-text>
            </zen-box>
        </zen-flex>
        <divider width="100%" height="2px"/>
    </zen-box>
</template>

<script>
import Divider from './Divider'
export default {
    components: {
        Divider,
    }
}
</script>

<style scoped>
.author {
    width: 100%;
}
.author h2 {
    margin: 0px;
}
.avatar {
    border-radius: 50%;
    height: 80px;
    width: 80px;
}
.name {
    line-height: 20px;
}
.icons {
    flex: 0 0 25%;
    justify-content: flex-end;
    margin-left: auto;
}
.icons > .icon:hover {
   cursor: pointer; 
}
</style>