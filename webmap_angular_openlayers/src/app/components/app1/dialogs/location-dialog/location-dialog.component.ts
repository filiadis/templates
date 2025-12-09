import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolboxDialogsService } from '../../services/dialogs/toolbox-dialogs.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import { MapService } from '../../services/map.service';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import proj4 from 'proj4';
import { LanguageService } from '../../../../languageService/language.service';



@Component({
    selector: 'app-location-dialog',
    imports: [FormsModule, MatFormFieldModule, MatIconModule,
        MatTooltipModule, MatSelectModule, MatInputModule, MatButtonModule],
    templateUrl: './location-dialog.component.html',
    styleUrls: ['./location-dialog.component.scss', '../dialogs.component.scss'],
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

export class LocationDialogComponent implements OnInit {


  lang: string = '';

  langSubscription: any;


  toggle: boolean = true;

  btnSubscription: any;

  selectedSystem: string = '2100'

  xValue: number = 0;

  yValue: number = 0;

  //Icon
  iconPin = new Style({
    image: new Icon({
      src: '../../../../../assets/icons/pin2.png', // Specify the path to your custom icon image
      scale: 0.08, // Adjust the scale of the icon if needed
    }),
  });

  vectorSource = new VectorSource({});

  EPSG3857 = '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs';

  WGS84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs ';

  EGSA87 =
    '+proj=tmerc +lat_0=0 +lon_0=24 +k=0.9996 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=-199.87,74.79,246.62,0,0,0,0 +units=m +no_defs +type=crs';


  constructor(private srv: ToolboxDialogsService, private languageSrv: LanguageService,
    private mapService: MapService) {
    this.languageSrv = languageSrv
  }

  ngOnInit() {
    this.btnSubscription = this.srv.locationBtn$.subscribe(btnValue => {
      this.toggle = btnValue;
    });
    this.langSubscription = this.languageSrv.language$.subscribe(lang => {
      this.lang = lang;
    });
  }

  ngOnDestroy() {
    this.btnSubscription.unsubscribe();
  }

  closeDialog() {
    this.srv.toggleBtnValue("location")
  }

  onSubmit() {
    const map = this.mapService?.getMap();

    this.vectorSource.clear();

    if (this.selectedSystem === '2100') {

      //Transorm the coords
      let pj = proj4(this.EGSA87, this.EPSG3857, [this.xValue, this.yValue]);


      let marker = new Feature({
        name: 'pin',
        geometry: new Point([pj[0], pj[1]])
      });

      marker.setStyle(this.iconPin);

      this.vectorSource.addFeature(marker)


      let vectorLayer = new VectorLayer({
        source: this.vectorSource // Pass VectorSource as source
      });

      map.addLayer(vectorLayer); // Add VectorLayer to the map
      //map.removeLayer(vectorLayer)


      // Zoom to the extent of the marker
      const view = map.getView();
      view.animate({
        center: [pj[0], pj[1]], // Center coordinates of the marker
        zoom: 16, // Zoom level (adjust as needed)
        duration: 1000 // Animation duration in milliseconds
      });

    } else if (this.selectedSystem === '4326') {


      //Transorm the coords
      let pj = proj4(this.WGS84, this.EPSG3857, [this.xValue, this.yValue]);


      let marker = new Feature({
        name: 'pin',
        geometry: new Point([pj[0], pj[1]])
      });

      marker.setStyle(this.iconPin);

      this.vectorSource.addFeature(marker)


      let vectorLayer = new VectorLayer({
        source: this.vectorSource // Pass VectorSource as source
      });

      map.addLayer(vectorLayer); // Add VectorLayer to the map
      //map.removeLayer(vectorLayer)


      // Zoom to the extent of the marker
      const view = map.getView();
      view.animate({
        center: [pj[0], pj[1]], // Center coordinates of the marker
        zoom: 16, // Zoom level (adjust as needed)
        duration: 1000 // Animation duration in milliseconds
      });
    }
  }

  clearLocation() {
    const map = this.mapService?.getMap();

    if (map) {
      const vectorLayers = map.getLayers().getArray();
      for (const layer of vectorLayers) {
        if (layer instanceof VectorLayer && layer.getSource() === this.vectorSource) {
          map.removeLayer(layer);
          break; // Stop iterating once the target layer is removed
        }
      }
    }

    this.xValue = 0
    this.yValue = 0
  }

}
