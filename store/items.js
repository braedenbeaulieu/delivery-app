export const state = () => ({
    list: []
})
  
export const mutations = {
    add(state, item) {
        state.list.push({
            what: item.what,
            where: item.where,
            when: item.when
        })
    },
    remove(state, { item }) {
        state.list.splice(state.list.indexOf(item), 1)
    },
    edit(state, { item, updatedItem }) {
        console.log(item);
        console.log(updatedItem);
        item.what = updatedItem.what;
        item.where = updatedItem.where;
        item.when = updatedItem.when;
    }
}