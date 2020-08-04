<template>
	<li class="item">
		<div class="content" v-if="!isEditing">
			<p>{{ what }}</p>
			<p>{{ where }}</p>
			<p>{{ when }}</p>
			<p>{{ pickDrop }}</p>
		</div>
		<form v-else @submit.prevent="finishEditing()" class="edit">
			<input
				type="text"
				v-model="newWhat"
				ref="newItem"
			/>
			<input
				type="text"
				v-model="newWhere"
				ref="newItem"
			/>
			<input
				type="text"
				v-model="newWhen"
				ref="newItem"
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
			<input type="submit" value="Update">
		</form>
		<div class="buttons">
			<button @click="startEditing()">
				<span>Edit</span>
			</button>
			<button @click="$emit('on-delete')">
				<span>Delete</span>
			</button>
		</div>
	</li>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            isEditing: false,
			newItem: '',
			newWhat: '',
			newWhere: '',
			newWhen: '',
			newPickDrop: '',
		}
    },
    props: {
		what: String,
		where: String,
		when: String,
		lat: Number,
		long: Number,
		pickDrop: String,
    },
    methods: {
        startEditing() {
			if(this.isEditing) {
				this.finishEditing();
			} else {
				this.newLat = this.lat
				this.newLong = this.long
				this.newWhat = this.what
				this.newWhere = this.where
				this.newWhen = this.when
				this.newPickDrop = this.pickDrop

				this.isEditing = true;
				this.$nextTick(() => this.$refs.newItem.focus());
				// console.log(this.$refs.newItem);
			}
        },
        finishEditing() {
			axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.newWhere}&key=${process.env.VUE_APP_GOOGLE_MAPS_API_KEY}`)
			.then(res => { 
				this.newItem = {
					what: this.newWhat,
					where: this.newWhere,
					when: this.newWhen,
					lat: parseFloat(res.data.results[0].geometry.location.lat),
					long: parseFloat(res.data.results[0].geometry.location.lng),
					pickDrop: this.newPickDrop,
				};
				this.isEditing = false;
				this.$emit('on-edit', this.newItem);
			})
			
        }
    }
};
</script>

<style lang="scss" scoped>
	.item {
		margin: 15px 0;
		padding-bottom: 10px;
		list-style: none;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid rgba(255, 255, 255, .3);

		.content {

			p {	
				color: rgba(255, 255, 255, .8);
				width: 100%;
				display: block;
				margin-bottom: 5px;
				text-align-last: left;

				&:first-of-type {
					font-weight: bold;
				}
			}

			.buttons {
				display: flex;
				justify-content: flex-end;
				align-items: center;

				button {
					margin-left: 15px;
				}
			}

			.edit {
				
				input[type=text] {
					display: block;
					border: 1px solid rgba(255, 255, 255, .6);
				}
			}
		}	
	}
</style>