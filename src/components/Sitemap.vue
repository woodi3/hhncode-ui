<template>
    <zen-box class="links text-center">
        <zen-text header="h6" bold color="white">Sitemap</zen-text>
        <ul class="list">
            <li>
                <zen-link to="/" color="white" title="Home Link">
                    Home
                </zen-link>
            </li>
            <li>
                <zen-link to="/hiphop" color="white" title="Hip Hop Link">
                    Hip Hop
                </zen-link>
            </li>
            <li>
                <zen-link to="/code" color="white" title="Code Link">
                    Code
                </zen-link>
            </li>
        </ul>
    </zen-box>
</template>
<style scoped>
.links > h3 {
    margin-bottom: 0px;
}
.links > .list {
    list-style: none;
    padding: 0;
}
.links > .list > li:first-of-type {
    padding-top: 0px;
}
.links > .list > li {
    padding-top: calc(var(--spacing-rem) * 2);
    padding-bottom: calc(var(--spaciing-rem) * 2);
    font-weight: bold;
}
.links > .list > li > a {
    display: inline-block;
    padding: .25rem;
}
.links > .list > li > a:hover {
    background-color: var(--primary-super-light);
    color: var(--primary-super-dark)
}
</style>