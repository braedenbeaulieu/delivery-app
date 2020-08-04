<template>
    <section class="share">
        <div class="title">
            <h1>Share</h1>
        </div>
        <div class="content">
            <textarea name="create-list" id="create-list" cols="30" rows="10" placeholder="Add list code here..." v-model="listCode"></textarea>
            <button v-on:click="addList()">Add List</button>
            <button v-on:click="copyToClipboard()">Share List</button>
            <input type="text" id="copyText">
        </div>
    </section>
</template>

<script>
export default {
    name: 'List',
    data() {
        return {
            listCode: ''
        }
    },
    methods: {
        copyToClipboard() {
            let obj = [
                { what: '4 Tents', where: 'Essex', when: '10:30 AM', lat: 42.1727, long: -82.8189, pickDrop: 'Drop Off' },
                { what: '10 Bouncy Castles', where: 'Windsor', when: '4:30 PM', lat: 42.3149, long: -83.0364, pickDrop: 'Drop Off' },
                { what: '2 Flamingos', where: 'Amherstburg', when: '1:15 PM', lat: 42.1014, long: -83.1087, pickDrop: 'Drop Off' },
            ]

            let encrypted = CryptoJS.AES.encrypt(JSON.stringify(obj), "Secret Passphrase");

            let copyText = encodeURIComponent(encrypted)
            let testingCodeToCopy = document.querySelector('#copyText')
            testingCodeToCopy.setAttribute('value', copyText)
            testingCodeToCopy.setAttribute('type', 'text')
            testingCodeToCopy.select()

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                // console.log(copyText);
            } catch (err) {
                console.log(err);
            }

            /* unselect the range */
            testingCodeToCopy.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
            testingCodeToCopy.blur()
        },
        addList() {
            let listCode = document.getElementById('create-list').value.trim();
            let decrypted = CryptoJS.AES.decrypt(listCode, 'Secret Passphrase')
            let queryItems = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))

            console.log(CryptoJS.AES.decrypt(listCode, 'Secret Passphrase'));

            // console.log(queryItems);
            
            // queryItems.forEach((item) => {
            //     this.addItem(item)
            // })
        }
    }
}

</script>

<style lang="scss" scoped>
    .share {
		width: 100%;
        height: 100%;
        padding: 20px;

        h1 {
            color: rgba(255, 255, 255, .8);
            font-weight: bold;
            font-size: 30px;
            margin-bottom: 20px;
        }

        .content {
            > * {
                display: block;
                width: 100%;
                margin-bottom: 15px;
            }

            textarea {
                background-color: rgba(255, 255, 255, .8);
                padding: 5px;
                border-radius: 2px;
            }

            button {
                background: #6C69D2;
                color: white;
                width: 100%;
                text-align: center;
                display: block;
                border-radius: 2px;
                padding: 15px 0;
                letter-spacing: .8;
                text-transform: uppercase;
                font-size: 12px;
            }

            #copyText {
                width: 1px;
                height: 1px;
                position: absolute;
                right: 9999px;
            }
        }
    }
</style>