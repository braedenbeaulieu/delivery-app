<template>
    <form @submit.prevent="addItem()">
        <input
            v-model="newItem"
            type="text"
            placeholder="What..."
        />
        <input
            v-model="newItemLocation"
            type="text"
            placeholder="Where..."
        />
        <input
            v-model="newItemTime"
            type="text"
            placeholder="When..."
        />
        <div class="pick-up-drop-off">
            <div class="radio-button">
                <input type="radio" id="dropoff" name="pick-up-drop-off" value="Drop Off" v-model="newPickDrop">
                <label for="dropoff">Drop Off</label><br>
            </div>
            <div class="radio-button">
                <input type="radio" id="pickup" name="pick-up-drop-off" value="Pick Up" v-model="newPickDrop">
                <label for="pickup">Pick Up</label><br>
            </div>
        </div>
        <input
            type="submit"
            value="Add"
        />
    </form>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            // newItem: 'asdasd',
            // newItemLocation: '159 Ramblewood Dr. Lasalle ON',
            // newItemTime: '8:00 AM',
            newItem: '',
            newItemLocation: '',
            newItemTime: '',
            newItemLat: '',
            newItemLong: '',
            newPickDrop: 'Drop Off'
        }
    },
    methods: {
        addItem() {

            let location = this.newItemLocation.replace(/ /g, '+')

            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.VUE_APP_GOOGLE_MAPS_API_KEY}`)
            .then(res => {
                this.newItemLat = res.data.results[0].geometry.location.lat
                this.newItemLong = res.data.results[0].geometry.location.lng

                // console.log(this.newItemLocation.replace(/ /g, '+'))
                // console.log(this.newItemLat);
                // console.log(this.newPickDrop);

                if(this.newItem.length > 0 && this.newItemLocation.length > 0 && this.newItemTime.length > 0) {
                    this.$emit('on-new-item', {
                        what: this.newItem,
                        where: this.newItemLocation,
                        when: this.newItemTime,
                        lat: parseFloat(this.newItemLat),
                        long: parseFloat(this.newItemLong),
                        pickDrop: this.newPickDrop
                    })
                }
                // this.newItem = ''
                // this.newItemLocation = ''
                // this.newItemTime = ''
                // this.newItemLat = ''
                // this.newItemLong = ''
            })

            
        }
    }
};
</script>

<style lang="scss" scoped>
    form {
        width: 100%;
        // padding: 20px;
        
        input[type=text] {
            width: 100%;
            display: block;
            padding: 5px;
            margin-bottom: 15px;
            border-bottom: 1px solid #c1c1c1;

            &:focus {
                outline: none;
                border-color: #6C69D2;
            }
        }

        .pick-up-drop-off {
            display: flex;
            justify-content: center;
            align-items: center;

            .radio-button {
                margin: 20px;
            }
        }
        
        input[type=submit] {
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
    }
</style>