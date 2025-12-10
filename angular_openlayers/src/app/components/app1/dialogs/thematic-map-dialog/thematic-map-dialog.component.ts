import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToolboxDialogsService } from '../../services/dialogs/toolbox-dialogs.service';
import { MapService } from '../../services/map.service';
import { Vector as VectorLayer } from 'ol/layer';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thematic-map-dialog',
  imports: [MatIconModule, MatTooltipModule, CommonModule],
  templateUrl: './thematic-map-dialog.component.html',
  styleUrl: './thematic-map-dialog.component.scss'
})
export class ThematicMapDialogComponent implements OnInit, AfterViewInit {

  map: any;
  thematicMap: any;
  zoomDifference = 4;
  extentLayer: VectorLayer<any> | undefined;
  btnSubscription: any;
  toggle: boolean = false;

  constructor(private srv: ToolboxDialogsService, private mapService: MapService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {

  }

  /*
  ngAfterViewInit(): void {
    this.btnSubscription = this.srv.thematicMapBtn$.subscribe(btnValue => {
      this.toggle = btnValue;
    })
    const map = this.mapService?.getMap();

    // Check if the map is defined
    if (!map) {
      console.error('MapService did not provide a map.');
      return;
    }

    // Create a new View for the thematic map, initially using the same center and projection
    const thematicMapView = new View({
      center: map.getView()?.getCenter(),
      zoom: (map.getView()?.getZoom() ?? 0) - this.zoomDifference,
      projection: map.getView()?.getProjection(),
    });

    this.thematicMap = new Map({
      view: thematicMapView,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      controls: [],
      interactions: defaultInteractions({
        doubleClickZoom: false,
        dragPan: false,
        mouseWheelZoom: false,
      }),
      target: 'thematic_map',
    });

    // Create a vector layer for the rectangle
    this.extentLayer = new VectorLayer({
      source: new VectorSource(),
      style: new Style({
        stroke: new Stroke({
          color: 'red',
          width: 2,
        }),
      }),
    });

    this.thematicMap.addLayer(this.extentLayer);

    // Draw the initial extent rectangle
    this.updateExtentRectangle(map.getView().calculateExtent(this.thematicMap.getSize()));

    // Synchronize the center, resolution, and extent rectangle with the MapService map
    map.getView()?.on('change:center', () => {
      thematicMapView.setCenter(map.getView()?.getCenter());
      this.updateExtentRectangle(map.getView().calculateExtent(this.thematicMap.getSize()));
    });

    map.getView()?.on('change:resolution', () => {
      const newZoom = (map.getView()?.getZoom() ?? 0) - this.zoomDifference;
      thematicMapView.setZoom(newZoom);
      this.updateExtentRectangle(map.getView().calculateExtent(this.thematicMap.getSize()));
    });
  }

  updateExtentRectangle(extent: any): void {
    if (this.extentLayer) {  // Check if extentLayer is defined
      const extentFeature = new Feature({
        geometry: new Polygon([[
          [extent[0], extent[1]],
          [extent[0], extent[3]],
          [extent[2], extent[3]],
          [extent[2], extent[1]],
          [extent[0], extent[1]],
        ]]),
      });

      const source = this.extentLayer.getSource();
      source.clear();
      source.addFeature(extentFeature);
    }
  }
    */

  closeDialog() {
    this.srv.toggleThematicMap()

  }
}
