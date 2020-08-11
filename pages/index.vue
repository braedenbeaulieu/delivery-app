<template>

	<div class="home">
		<gmap-map 
		:center="center" 
		:map-type-id="mapTypeId" 
		:zoom="zoom"
		:options="{
			styles: styles,
			mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
			minZoom: 9,
			maxZoom: 15,
		}">
		<gmap-marker
			v-for="(item, index) in markers"
			:key="index"
			:position="item.position"
			@click="center = item.position; toggleInfo(item)"
			:icon="markerOptions"
		/>
		</gmap-map>

        <div class="infoWindow " v-bind:class="{active: isActive}">
            <div class="close" @click="toggleInfo()">x</div>
            <p>{{ what }}</p>
			<p>{{ where }}</p>
			<p>{{ when }}</p>
			<p>{{ pickDrop }}</p>
        </div>
	</div>
        
</template>

<script>

export default {
	components: {
    },
    data() {
		return {
            what: '',
            where: '',
            when: '',
            pickDrop: '',
            isActive: false,
            active: 'active',

            // map stuff
			center: { lat: 42.148398, lng: -82.780067 },
			mapTypeId: "terrain",
			markers: this.markers,
			zoom: 9.5,
			markerOptions: { 
				url: require('~/assets/location-marker.png'),
				size: {width: 25, height: 30, f: 'px', b: 'px',},
				scaledSize: {width: 25, height: 30, f: 'px', b: 'px',},
			},
			styles: [
				{
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "saturation": 36
                        },
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 40
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        },
                        {
                            "weight": 1.2
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 10
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 29
                        },
                        {
                            "weight": 0.2
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 18
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 19
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 0
                        }
                    ]
                }
			]
		};
    },
    mounted() {
        console.log(this.$store.getters['items/getMarkers']);
        this.markers = this.$store.getters['items/getMarkers']
    },
    methods: {
        addItem(newItem) {
            // this.items.push();

            this.$store.commit('items/add', { 
                what: newItem.what,
                where: newItem.where,
                when: newItem.when,
                lat: newItem.lat,
                long: newItem.long,
                placeDrop: newItem.placeDrop
            })
        },
        toggleInfo(item = null) {
            this.isActive = !this.isActive

            if(item) {
                console.log(item);
                this.what = item.item.what
                this.where = item.item.where
                this.when = item.item.when
                this.pickDrop = item.item.pickDrop
            }

        }
    }
}
</script>

<style lang="scss" scoped>
    .home {
		// background: purple;
		width: 100%;
		height: 100%;
        position: relative;

		.vue-map-container {
			height: 100%;
		}

        .infoWindow {
            position: fixed;
            left: 0;
            right: 0;
            width: 100vw;
            // height: 160px;
            background: white;
            padding: 25px;
            bottom: -300px;
            transition: all .3s;

            &.active {
                bottom: 100px;
            }
            
            p {
                color: rgba(0, 0, 0, .8)!important;
                font-weight: bold;
                display: block;
                margin-bottom: 15px;

                &:last-child {
                    margin-bottom: 0;
                }
            }

            .close {
                position: absolute;
                right: 15px;
                top: 5px;
                font-size: 25px;
                color: black!important;
            }
        }
    }
</style>