<template>
    <zen-box class="links text-center">
        <zen-text header="h6" bold color="white">Sitemap</zen-text>
        <ul class="list">
            <li>
                <zen-link light to="/" title="Home Link">
                    Home
                </zen-link>
            </li>
            <li>
                <zen-link light to="/hiphop" title="Hip Hop Link">
                    Hip Hop
                </zen-link>
            </li>
            <li>
                <zen-link light to="/code" title="Code Link">
                    Code
                </zen-link>
            </li>
        </ul>
    </zen-box>
</template>
<style scoped>
.links p {
    color: var(--color-1);
}
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
    background-color: var(--color-1);
    color: var(--color-3);
}
</style>