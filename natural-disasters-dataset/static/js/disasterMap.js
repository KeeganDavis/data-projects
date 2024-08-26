function initLayersAndMarkers(disasterData) {
    /*
    create layer groups for each disaster type, loop through the disaster data and add the circle marker to the correct layer group with the color corresponding to the disaster.
    Create a legend and pass both the legend and the layer groups to the addMap() function
    */
    // initiate layer groups for each disaster type
    let droughtMapLayer = L.layerGroup();
    let earthquakeMapLayer = L.layerGroup();
    let extremeTempMapLayer = L.layerGroup();
    let floodMapLayer = L.layerGroup();
    let dryMassMovementMapLayer = L.layerGroup();
    let wetMassMovementMapLayer = L.layerGroup();
    let stormMapLayer = L.layerGroup();
    let volcanoMapLayer = L.layerGroup();

    // colors object to be referenced when adding colors to circle markers
    let mapColors = {
        'Drought': '#ffee65',
        'Earthquake': '#fdcce5',
        'Extreme temperature': '#fd7f6f',
        'Flood': '#7eb0d5',
        'Mass movement (dry)': '#bd7ebe',
        'Mass movement (wet)': '#8bd3c7',
        'Storm': '#b2e061',
        'Volcanic activity': '#ffb55a'
    }

    // loop through each disaster and add a marker to the layer that corresponds to the type of disaster
    disasterData.forEach(disaster => {
        if (disaster.Type == 'Drought') {
            addMarkers(disaster, droughtMapLayer, mapColors)
        } else if (disaster.Type == 'Earthquake') {
            addMarkers(disaster, earthquakeMapLayer, mapColors)
        } else if (disaster.Type == 'Extreme temperature') {
            addMarkers(disaster, extremeTempMapLayer, mapColors)
        } else if (disaster.Type == 'Flood') {
            addMarkers(disaster, floodMapLayer, mapColors)
        } else if (disaster.Type == 'Mass movement (dry)') {
            addMarkers(disaster, dryMassMovementMapLayer, mapColors)
        } else if (disaster.Type == 'Mass movement (wet)') {
            addMarkers(disaster, wetMassMovementMapLayer, mapColors)
        } else if (disaster.Type == 'Storm') {
            addMarkers(disaster, stormMapLayer, mapColors)
        } else if (disaster.Type == 'Volcanic activity') {
            addMarkers(disaster, volcanoMapLayer, mapColors)
        }
    });
    
    // create overlay object containing all layers
    let allDisastersOverlayMapLayers = {
        Drought: droughtMapLayer,
        Earthquake: earthquakeMapLayer,
        'Extreme Temperature': extremeTempMapLayer,
        Flood: floodMapLayer,
        'Mass Movement (Dry)': dryMassMovementMapLayer,
        'Mass Movement (Wet)': wetMassMovementMapLayer,
        Storm: stormMapLayer,
        'Volcanic Activity': volcanoMapLayer
    };

    // initiate legend
    const disastersMapLegend = L.control({position:'bottomright'});

    // add a div with class legend then add html to the div with a heading, icons with the color corresponding to the color markers, and the corresponding disaster type
    disastersMapLegend.onAdd = function() {
      let disastersMapDiv = L.DomUtil.create('div', 'legend');
      disastersMapDiv.innerHTML = `<h4>Disaster Types</h4>`;
      
      for (let type in mapColors) {
        disastersMapDiv.innerHTML += `<i style="background: ${mapColors[type]};"></i><span class="legend-span">${type}</span><br>`
      }
      return disastersMapDiv;
    };

    addMap(allDisastersOverlayMapLayers, disastersMapLegend);
};

function addMap(overlayLayers, legend) {
    /*
    add the tile layers w/ the maps. create a layer object for the maps and a layer object for the disaster layer groups. initialize the map and add the layers and the 
    legend to the map
    */

    // create street map layers
    let streetDarkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
    });
    let streetLightLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
    });

    // create object for map tile layers
    let disasterMapsTileLayers = {
        'Dark Map': streetDarkLayer,
        Map: streetLightLayer
    };

    // create equator layer, create the equator line and add to the layer, then add the layer to the overlayLayers object
    let equatorLayer = L.layerGroup();
    let line = [[0, -180], [0, 180]];
    L.polyline(line, {
        color: 'red',
        fillOpacity: 1,
        weight: 1
    }).addTo(equatorLayer);
    overlayLayers.Equator = equatorLayer;

    // create layer for tectonic plates, call the function to create the lines of the tectonic plates, and then add the layer to the overlayLayers object
    let tectonicLayer = L.layerGroup();
    addTectonicPlates(tectonicLayer);
    overlayLayers['Tectonic Plates'] = tectonicLayer;

    // create map
    let allDisastersMap = L.map('allDisastersMap', {
        center: [10, 0],
        zoom: 3,
        layers: [streetDarkLayer]
    });

    // add legend to map
    legend.addTo(allDisastersMap);

    // create layer control w/ world maps and disaster layers
    L.control.layers(disasterMapsTileLayers, overlayLayers, {
        collapsed: false,
        sortLayers: false
    }).addTo(allDisastersMap);
};

function addMarkers(disaster, layer, mapColors) {
    /*
    adds the markers to the layer that corresponds to the disaster type along with the lat and lng. add a popup to the circle with the geolocation, disaster number, type,
    subtype, start month and year, coordinates, and total number affected if the value is not null
    */
  L.circleMarker([disaster.Lat, disaster.Lng], {
                color: mapColors[disaster.Type],
                weight: 1,
                fillOpacity: 0.1,
                radius: 7
            }).addTo(layer).bindPopup(
              `<h5>${disaster.Geolocation}</h5><hr>
              <ul>
                <li>Disaster Number: ${disaster['Disaster #']}</li>
                <li>Disaster Type: ${disaster.Type}</li>
                <li> Disaster Subtype: ${disaster.Subtype}</li>
                <li>Start Month and Year: ${disaster.Month}-${disaster.Year}</li>
                <li>Coordinates: [${disaster.Lat}, ${disaster.Lng}]</li>
                ${disaster['Total Affected'] != null ? `<li>Total Affected: ${disaster['Total Affected']}</li>`: ''}
              </ul>`
            );
};

function addTectonicPlates(layer) {
    /*
    fetch geojson data of tectonic plates and add the coordinates to the layer passed to the function
    */
    const tectonicURL = 'https://keegandavis.github.io/disaster-data-json/tectonic_plates_geojson.json';

    d3.json(tectonicURL).then(data => {
        L.geoJSON(data, {
            style: function() {
                return {
                    color: 'red',
                    fillOpacity: 1,
                    weight: 1
                }
            }
        }).addTo(layer);
    });
};