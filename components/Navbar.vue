<template>
    <div class="bb-navbar">
        <nuxt-link to="/">Home page</nuxt-link>
        <nuxt-link to="/list">List page</nuxt-link>
        <button v-on:click="copyToClipboard()">Share</button>
        <input type="text" id="copyText">
    </div>
</template>
<script>
export default {
    methods: {
        copyToClipboard() {
            var copyText = 'Copied!';
            let testingCodeToCopy = document.querySelector('#copyText')
            testingCodeToCopy.setAttribute('value', 'Copy ME!!')
            testingCodeToCopy.setAttribute('type', 'text')
            testingCodeToCopy.select()

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                alert('Testing code was copied ' + msg);
            } catch (err) {
                alert('Oops, unable to copy');
            }

            /* unselect the range */
            testingCodeToCopy.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
        }
    }
}
</script>
<style lang="scss">
    .bb-navbar {
        background: lightblue;
        width: 100%;
        height: 45px;
    }
</style>
