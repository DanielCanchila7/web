function buscarCentrosApoyo() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var ubicacion = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var mapa = new google.maps.Map(document.getElementById('mapa'), {
                center: ubicacion,
                zoom: 13
            });
            var servicioLugares = new google.maps.places.PlacesService(mapa);
            servicioLugares.nearbySearch({
                location: ubicacion,
                radius: 5000, // Radio de búsqueda en metros
                type: ['hospital', 'police'] // Tipos de lugares a buscar
            }, function (results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        crearMarcador(results[i]);
                    }
                }
            });
        });
    } else {
        alert('Geolocalización no es soportada por este navegador.');
    }
}

function crearMarcador(place) {
    var marcador = new google.maps.Marker({
        map: mapa,
        position: place.geometry.location
    });
    google.maps.event.addListener(marcador, 'click', function () {
        // Acción al hacer clic en el marcador
    });
}
