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
			@click="center = item.position"
			:icon="markerOptions"
		/>
		</gmap-map>
	</div>
        
</template>

<script>

export default {
	components: {
    },
    data() {
		return {
			center: { lat: 42.148398, lng: -82.829067 },
			mapTypeId: "terrain",
			markers: this.markers,
			zoom: 10,
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
        // console.log(this.$store.getters['items/getMarkers']);
        this.markers = this.$store.getters['items/getMarkers']

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
            // this.items.push();

            this.$store.commit('items/add', { 
                what: newItem.what,
                where: newItem.where,
                when: newItem.when,
                lat: newItem.lat,
                long: newItem.long
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .home {
		// background: purple;
		width: 100%;
		height: 100%;

		.vue-map-container {
			height: 100%;
		}
    }
</style>