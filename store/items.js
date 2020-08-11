export const state = () => ({
    list: []
})
  
export const mutations = {
    add(state, item) {
        state.list.push({
            what: item.what,
            where: item.where,
            when: item.when,
            lat: item.lat,
            long: item.long,
            pickDrop: item.pickDrop
        })
    },
    remove(state, { item }) {
        state.list.splice(state.list.indexOf(item), 1)
    },
    edit(state, { item, updatedItem }) {
        item.what = updatedItem.what;
        item.where = updatedItem.where;
        item.when = updatedItem.when;
        item.lat = updatedItem.lat;
        item.long = updatedItem.long;
        item.pickDrop = updatedItem.pickDrop
    },
    // getCoordinates(state) {
    //     state.list.forEach((item) => {
    //         item.
    //     })
    // }
}

export const getters = {
    getMarkers(state) {
        let markers = []

        state.list.forEach((item) => {
            // console.log(data);

            markers.push({ 
                item: {
                    what: item.what,
                    where: item.where,
                    when: item.when,
                    pickDrop: item.pickDrop
                },
                position: { lat: item.lat, lng: item.long } 
            })
        })

        return markers;
    }
}