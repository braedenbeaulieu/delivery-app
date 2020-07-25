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
            @on-toggle="toggleItem(item)"
            @on-delete="deleteItem(item)"
            @on-edit="editItem(item, $event)"
          />
        </ul>
    </section>
</template>

<script>
import Item from '@/components/List/Item.vue';
import CreateItem from '@/components/List/CreateItem.vue';

export default {
    name: 'List',
    components: {
        Item,
        CreateItem
    },
    // data() {
    //     return {
    //         items: [
    //             { what: 'Do the dishes', where: 'yo mamas house', when: '10:30 AM'},
    //             { what: 'Take out the trash', where: 'yo mamas house', when: '10:30 AM'},
    //             { what: 'Finish doing laundry', where: 'yo mamas house', when: '10:30 AM'},
    //         ],
    //     };
    // },
    computed: {
        items() {
            return this.$store.state.items.list
        }
    },
    methods: {
        addItem(newItem) {
            // this.items.push();

            this.$store.commit('items/add', { 
                what: newItem.what,
                where: newItem.where,
                when: newItem.when
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

            console.log({ item, updatedItem });

            this.$store.commit('items/edit', { item, updatedItem })
        },
    },
}
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
    }
</style>
