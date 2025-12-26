document.addEventListener('DOMContentLoaded', function () {

    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
        center: [2451664, 4636968],
        zoom: 7,
        projection: 'EPSG:3857',
        maxZoom: 18
      }),
    });

});

