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
            long: item.long
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
            
            // const data = axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=159+Ramblewood+dr&key=AIzaSyDAh4iaPMt9pE2E2BpFVg5gA5Ae8uis8qs') // ' + process.env.VUE_APP_GOOGLE_MAPS_API_KEY)
            // console.log(data);

            markers.push({ 
                position: { lat: item.lat, lng: item.long } 
            })
        })

        return markers;
    }
}