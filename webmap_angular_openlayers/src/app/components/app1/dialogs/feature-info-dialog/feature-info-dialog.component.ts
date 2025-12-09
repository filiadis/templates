import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ToolboxDialogsService } from '../../services/dialogs/toolbox-dialogs.service';
import { MapService } from '../../services/map.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Style, Fill, Stroke, Icon } from 'ol/style';
import { Feature } from 'ol';
import { Circle, Point, Polygon } from 'ol/geom';
import { Circle as CircleGeometry } from 'ol/geom';
import { ActiveLayersService } from '../../services/dialogs/active-layers.service';
import { fromLonLat } from 'ol/proj';
import Map from 'ol/Map';


@Component({
    selector: 'app-feature-info-dialog',
    imports: [MatIconModule, MatButtonModule],
    templateUrl: './feature-info-dialog.component.html',
    styleUrls: ['./feature-info-dialog.component.scss', '../dialogs.component.scss'],
    animations: [
        trigger('slideInOut', [
            state('true', style({
                transform: 'translateX(0%)'
            })),
            state('false', style({
                transform: 'translateX(300%)'
            })),
            transition('true <=> false', animate('300ms ease-in-out'))
        ])
    ]
})

export class FeatureInfoDialogComponent implements OnInit {

  toggle: boolean = false;

  btnSubscription: any;

  map?: Map;


  constructor(private srv: ToolboxDialogsService, private mapService: MapService,
    private http: HttpClient, private activeLayersSrv: ActiveLayersService
  ) {
    this.map = mapService.getMap()
    mapService.setMap(this.map)
  }

  ngOnInit(): void {
    this.btnSubscription = this.srv.featureInfoBtn$.subscribe(btnValue => {
      this.toggle = btnValue;
    });
    const map = this.mapService.getMap();
    map.on('click', (e) => this.apiRequest(e));

  }

  ngOnDestroy() {
    this.btnSubscription.unsubscribe();
  }

  apiRequest(e: any) {
    if (this.toggle) {
      const map = this.mapService.getMap();
      const zoom = map.getView().getZoom();
      const layerInfoApiUrl = `http://localhost:8000/api/layerInfoClick/`;
      const activeLayers = this.activeLayersSrv.getActiveLayers();

      const postBody = {
        lon: e.coordinate[0],
        lat: e.coordinate[1],
        mapZoom: zoom,
        layers: activeLayers
      };

      this.http.post(layerInfoApiUrl, postBody).subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error) => {
          console.error('Error fetching metadata:', error);
        }
      });
    }
  }


  closeDialog() {
    this.srv.toggleBtnValue("featureInfo")
  }



}
