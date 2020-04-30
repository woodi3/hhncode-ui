<template>
    <div>
        <p v-for="i in count" :key="i">
            {{phrase()}}
        </p>
    </div>
</template>

<script>

const lorem = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dui leo, laoreet sit amet justo sed, gravida imperdiet metus. 
    Etiam elementum viverra tempus. Etiam bibendum, ipsum nec lobortis luctus, lacus sapien posuere diam, nec viverra lorem ligula eget felis. 
    Sed id aliquet ligula, ac tempus mauris. Cras ac ante vitae enim hendrerit dignissim. 
    Aenean tempus urna sit amet mauris euismod imperdiet. Aliquam vitae ante ex. Nam rutrum non urna sit amet bibendum.`,
    `Sed sed tincidunt sapien. Nulla iaculis turpis tincidunt neque consequat, placerat mattis odio tincidunt. Nam sed mattis dui. 
    Interdum et malesuada fames ac ante ipsum primis in faucibus. 
    Vestibulum euismod, massa euismod elementum lobortis, est eros iaculis mi, non molestie augue tellus sed diam. 
    Ut vitae leo tortor. Integer vulputate viverra dolor, eget varius massa eleifend in. Nam faucibus mauris vel porta posuere. 
    Suspendisse potenti. Fusce pellentesque diam lacus, in bibendum metus porttitor at. 
    Ut orci nibh, molestie id mi eu, auctor hendrerit nibh. 
    Morbi feugiat justo in felis dictum pellentesque eget sed dolor. 
    Curabitur dapibus libero sed quam suscipit, vel consequat eros pulvinar. 
    Interdum et malesuada fames ac ante ipsum primis in faucibus.`,
    `Vivamus id leo orci. Curabitur eleifend diam et nulla euismod, ac hendrerit dui volutpat. 
    Cras risus nisi, laoreet vel turpis at, ornare laoreet dolor. Aenean eget consequat purus, a pellentesque mauris. 
    Praesent sit amet justo id libero scelerisque fringilla ac at leo. In tristique dui nulla, non commodo justo eleifend id. 
    Praesent efficitur sagittis pulvinar. 
    Fusce ultricies odio eros, sit amet pharetra risus semper ac. 
    Vivamus at feugiat nunc. Quisque finibus laoreet purus, in dignissim sapien convallis a. 
    Praesent blandit lorem nec molestie dapibus. Mauris vel nibh at felis euismod ullamcorper.`
]

export default {
    props: {
        count: {
            type: Number,
            default: 1
        }
    },
    methods: {
        phrase () {
            const r = Math.floor(Math.random() * lorem.length)
            return lorem[r]
        }
    }
}
</script>