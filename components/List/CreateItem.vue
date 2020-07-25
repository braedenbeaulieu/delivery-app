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
        <input
            type="submit"
            value="Add"
        />
    </form>
</template>

<script>
export default {
    data() {
        return {
            newItem: '',
            newItemLocation: '',
            newItemTime: ''
        };
    },
    methods: {
        addItem() {
            if(this.newItem.length > 0 && this.newItemLocation.length > 0 && this.newItemTime.length > 0) {
                this.$emit('on-new-item', {
                    what: this.newItem,
                    where: this.newItemLocation,
                    when: this.newItemTime
                });
            }
            this.newItem = '';
            this.newItemLocation = '';
            this.newItemTime = '';
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