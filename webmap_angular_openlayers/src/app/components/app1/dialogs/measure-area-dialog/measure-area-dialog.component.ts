import { AfterViewInit, Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolboxDialogsService } from '../../services/dialogs/toolbox-dialogs.service';
import { MapService } from '../../services/map.service';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Draw } from 'ol/interaction.js';
import { getArea } from 'ol/sphere.js';
import { Fill, Stroke, Style } from 'ol/style.js';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LanguageService } from '../../../../languageService/language.service';

@Component({
    selector: 'app-measure-area-dialog',
    imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatTooltipModule, MatFormFieldModule, MatSelectModule,],
    templateUrl: './measure-area-dialog.component.html',
    styleUrls: ['./measure-area-dialog.component.scss', '../dialogs.component.scss'],
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
export class MeasureAreaDialogComponent implements OnInit, AfterViewInit {

  lang: string = '';

  langSubscription: any;

  toggle: boolean = false;

  btnSubscription: any;

  selectedUnit: string = "sqm";

  map: any;

  sketch: any;

  styleFinished = new Style({
    // Add your desired style properties here
    stroke: new Stroke({
      color: '#ff4a80',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(255, 0, 0, 0.2)',
    }),
  })

  vectorSource = new VectorSource({ wrapX: false });


  vectorLayer = new VectorLayer({
    source: this.vectorSource,
    style: this.styleFinished

  });



  draw = new Draw({
    source: this.vectorSource,
    type: 'Polygon',
  });

  geometry: any;

  area: any = 0;



  constructor(private srv: ToolboxDialogsService, private mapService: MapService,
    private languageSrv: LanguageService) {
    this.languageSrv = languageSrv
  }

  ngOnInit() {
    this.langSubscription = this.languageSrv.language$.subscribe(lang => {
      this.lang = lang;
    });
  }
  ngAfterViewInit(): void {
    this.map = this.mapService.getMap()
    this.btnSubscription = this.srv.measureAreaBtn$.subscribe(btnValue => {
      this.toggle = btnValue;
      if (this.toggle) {
        if (this.map) {
          this.map.addInteraction(this.draw);
        }
      } else {
        if (this.map) {
          this.map.removeInteraction(this.draw);
        }
        this.vectorSource.clear();
        this.area = 0;
      }
    });



    // Draw

    this.draw.on('drawstart', (evt) => {

      this.map.removeLayer(this.vectorLayer)


      this.sketch = evt.feature;

      console.log(this.map.getView().getProjection());

      this.geometry = this.sketch.getGeometry().on('change', (evt: { target: any; }) => {
        this.area = getArea(evt.target);

      });
    });

    this.draw.on('drawend', () => {

      this.vectorSource.clear()

      this.map.addLayer(this.vectorLayer);

      this.sketch = null;


    });

  }



  ngOnDestroy() {
    this.btnSubscription.unsubscribe();
    if (this.map) {
      this.map.removeInteraction(this.draw);
    }
  }

  newMeasure() {
    this.vectorSource.clear()
    this.area = 0

  }

  closeDialog() {
    this.srv.toggleBtnValue('measureArea')
    this.vectorSource.clear()
    this.area = 0
    this.map.removeInteraction(this.draw);

  }


}