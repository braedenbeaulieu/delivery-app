<template>
    <section class="list">
        <div class="title">
            <h1>List</h1>
        </div>
        <div>
            <create-item @on-new-item="addItem($event)" />
        </div>
        <ul class="list-group">
          <Item
            v-for="(item, index) in items"
            :key="index"
            :what="item.what"
            :where="item.where"
            :when="item.when"
            :lat="item.lat"
            :long="item.long"
            :pickDrop="item.pickDrop"
            @on-toggle="toggleItem(item)"
            @on-delete="deleteItem(item)"
            @on-edit="editItem(item, $event)"
          />
        </ul>
    </section>
</template>

<script>
import Item from '@/components/List/Item.vue'
import CreateItem from '@/components/List/CreateItem.vue'
// import axios from 'axios'

export default {
    name: 'List',
    components: {
        Item,
        CreateItem
    },
    computed: {
        items() {
            return this.$store.state.items.list
        }
    },
    mounted() {
        if(this.$route.query.list) {
            let decrypted = CryptoJS.AES.decrypt(this.$route.query.list, 'Secret Passphrase')
            let queryItems = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
            
            queryItems.forEach((item) => {
                this.addItem(item)
            })
        }
    },
    methods: {
        addItem(newItem) {
            console.log(newItem);
            // this.items.push();

            this.$store.commit('items/add', { 
                what: newItem.what,
                where: newItem.where,
                when: newItem.when,
                lat: newItem.lat,
                long: newItem.long,
                pickDrop: newItem.pickDrop
            })
        },
        deleteItem(deletedItem) {
            // this.items = this.items.filter(item => item !== deletedItem);
            this.$store.commit('items/remove', deletedItem)
        },    
        editItem(item, updatedItem) {
            // item.what = updatedItem.what;
            // item.where = updatedItem.where;
            // item.when = updatedItem.when;

            // console.log({ item, updatedItem });

            this.$store.commit('items/edit', { item, updatedItem })
        },
    },
}

// http://localhost:3000/list?list=U2FsdGVkX18t0YVSvnnJP5gspc7eE01zuOT4uX2CWXXZeG2Uglzzu6Ox3DCyWuvM%2FoXzWkm4Eb4QjjnAlT%2B5zSQ24gBTG53yucTMAMH0%2BRHSjvNbtrIIsb2h6E7PQuhAGCI%2Fqr3EWoMNQ4WlBCevXIcrAW2Yn71tik6WlDsZkR06YXWxfgbbojBUhOCfjfv%2BnaQtWkIppGvaeIGSfEy0wxn9TdUXt3odYSbgey1aIKRUDRfujr8I0cPW4JU7c6TPXOi%2Fmexd7VAF8wR4XiX1HMiPnjOrY1vtrHT%2BOV8FFwNdHmzA7PN%2BCqGQmJoeOKY%2B
</script>

<style lang="scss" scoped>
    .list {
		width: 100%;
        height: 100%;
        padding: 20px;

        h1 {
            color: rgba(255, 255, 255, .8);
            font-weight: bold;
            font-size: 30px;
            margin-bottom: 20px;
        }

        ul {
            overflow-y: scroll;
            height: 378px;
        }
    }
</style>