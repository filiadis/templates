import { AfterViewInit, Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS.js';
import { MapService } from '../services/map.service';
import { LegendComponent } from '../legend/legend.component';
import ScaleLine from 'ol/control/ScaleLine.js';
import { ToolboxDialogsService } from '../services/dialogs/toolbox-dialogs.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
    selector: 'app-map',
    imports: [LegendComponent, CommonModule, MatTooltipModule, MatButtonModule, MatIconModule],
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, AfterViewInit {

  map: Map | undefined;

  shouldRun: boolean = true;

  toggle: boolean = false;

  btnSubscription: any;



  natura = new TileLayer({
    source: new TileWMS({
      url: 'https://gis.spcwebsrv.com/geoserver/wms',
      params: { 'LAYERS': 'supco:natura2000', 'TILED': true },
      serverType: 'geoserver',

    }),
  })

  constructor(mapService: MapService, private srv: ToolboxDialogsService, private cd: ChangeDetectorRef) {
    this.map = mapService.getMap()
    mapService.setMap(this.map)
  }

  ngOnInit() {
    this.btnSubscription = this.srv.fullscreenBtn$.subscribe(btnValue => {
      this.toggle = btnValue;
    })

  }

  ngAfterViewInit(): void {

    this.map?.setTarget("map")
    this.map?.addControl(new ScaleLine({ target: 'scalebar' }))

  }

  ngOnDestroy() {
    if (this.btnSubscription) {
      this.btnSubscription.unsubscribe(); // Avoid memory leaks
    }
  }

  openSide() {
    if (this.shouldRun) {
      this.shouldRun = false
    } else {
      this.shouldRun = true;
    }
  }

  exitFullscreen() {
    this.srv.toggleFullscreen();

  }


}



