<template>
	<li class="item">
		<div class="content" v-if="!isEditing">
			<p>{{ what }}</p>
			<p>{{ where }}</p>
			<p>{{ when }}</p>
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
export default {
    data() {
        return {
            isEditing: false,
			newItem: '',
			newWhat: '',
			newWhere: '',
			newWhen: ''
		}
    },
    props: {
		what: String,
		where: String,
		when: String,
    },
    methods: {
        startEditing() {
			if(this.isEditing) {
				this.finishEditing();
			} else {
				this.newWhat = this.what
				this.newWhere = this.where
				this.newWhen = this.when

				this.isEditing = true;
				this.$nextTick(() => this.$refs.newItem.focus());
				// console.log(this.$refs.newItem);
			}
        },
        finishEditing() {
			this.newItem = {
				what: this.newWhat,
				where: this.newWhere,
				when: this.newWhen
			};
			this.isEditing = false;
            this.$emit('on-edit', this.newItem);
        }
    }
};
</script>

<style lang="scss" scoped>
	.item {
		margin: 15px 0;
		list-style: none;
		display: flex;
		justify-content: space-between;


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
</style>