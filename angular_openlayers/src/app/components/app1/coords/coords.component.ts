import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../services/map.service';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import proj4 from 'proj4';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../languageService/language.service';


@Component({
    selector: 'app-coords',
    imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
    templateUrl: './coords.component.html',
    styleUrl: './coords.component.scss'
})
export class CoordsComponent implements OnInit, AfterViewInit {

  lang: string = '';

  langSubscription: any;

  selectedProjection: string = "2100";

  lon: number = 0;
  lat: number = 0;

  Xcoord: number = 0;
  Ycoord: number = 0;

  // Define the projection strings for WGS84 and the Greek coordinate system
  EPSG3857 = '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs';

  WGS84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs ';

  GreekCoords =
    '+proj=tmerc +lat_0=0 +lon_0=24 +k=0.9996 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=-199.87,74.79,246.62,0,0,0,0 +units=m +no_defs +type=crs';

  constructor(private mapService: MapService, private languageSrv: LanguageService) {
    this.languageSrv = languageSrv
  }

  ngOnInit(): void {
    this.langSubscription = this.languageSrv.language$.subscribe(lang => {
      this.lang = lang;
    });
    const map = this.mapService.getMap();
    map.on('pointermove', (event) => {
      const coords = event.coordinate;

      const espg4326trCoords = proj4(this.EPSG3857, this.WGS84, coords);
      this.lon = espg4326trCoords[0];
      this.lat = espg4326trCoords[1];

      const espg2100trCoords = proj4(this.EPSG3857, this.GreekCoords, coords);
      this.Xcoord = espg2100trCoords[0];
      this.Ycoord = espg2100trCoords[1];

    });
  }


  ngAfterViewInit(): void {

  }

  showCoords() {
    console.log('Selected Projection:', this.selectedProjection);
  }

}
