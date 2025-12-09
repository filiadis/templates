import { Injectable, OnInit } from '@angular/core';
import Map from 'ol/Map';
import { defaults as defaultInteractions } from 'ol/interaction';
import View from 'ol/View';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: Map;

  constructor() {
    this.map = new Map({
      view: new View({
        center: [2451664, 4636968],
        zoom: 7,
        projection: 'EPSG:3857',
        maxZoom: 18

      }),
      controls: [],
      interactions: defaultInteractions({ // Use default interactions
        pinchZoom: true, // Disable pinch zoom
        mouseWheelZoom: true // Disable mouse wheel zoom
      }),
      layers: []
    })
  }

  getMap() {
    return this.map;
  }

  setMap(updatedMap: Map) {
    this.map = updatedMap;
    console.log("map", this.map)
  }
}
