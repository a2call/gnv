var myCenter = new google.maps.LatLng(51.508742,-0.120850);
function initialize() {
	var mapProp = {
		center: myCenter,
		zoom:5,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};

	var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);

	placeMarker(myCenter)

	for (var i = serverMarkers.length - 1; i >= 0; i--) {
		placeMarker(serverMarkers[i])
	};


	function placeMarker(location) {
		var marker = new google.maps.Marker({
			position: location,
			map: map,
		});
		google.maps.event.addListener(marker, 'click', function(event) { 
	       deleteMarker(marker)
	    }); 
		return marker;
	}

	function saveMarker(marker) {
		$.post('create', { lon: marker.position.lng(), lat: marker.position.lat() }, function(data) {
			console.log('successfully  created marker')
		});
	}

	function deleteMarker(marker) {
		marker.setMap(null)
		$.ajax({
			url: 'delete',
			type: 'delete',
			data: { lon: marker.position.lng(), lat: marker.position.lat() },
			success: function(data) { console.log('successfully  deleted marker') }
		})
	}

	google.maps.event.addListener(map, 'click', function(event) {
		var marker = placeMarker(event.latLng);
		saveMarker(marker);
	});
}

google.maps.event.addDomListener(window, 'load', initialize);