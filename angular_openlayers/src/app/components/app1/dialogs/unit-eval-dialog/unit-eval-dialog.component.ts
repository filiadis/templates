import { AfterViewInit, Component, OnInit, Renderer2, ChangeDetectorRef, NgZone } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ToolboxDialogsService } from '../../services/dialogs/toolbox-dialogs.service';
import { MapService } from '../../services/map.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { LanguageService } from '../../../../languageService/language.service';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Fill, Icon, Stroke, Style } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../../../../environments/environment';
import { Draw } from 'ol/interaction.js';
import { getArea } from 'ol/sphere.js';
import { Polygon } from 'ol/geom';

@Component({
  selector: 'app-unit-eval-dialog',
  imports: [FormsModule, MatFormFieldModule, MatIconModule,
    MatTooltipModule, MatSelectModule, MatInputModule, MatButtonModule,
    MatProgressSpinnerModule, MatSlideToggleModule],
  templateUrl: './unit-eval-dialog.component.html',
  styleUrls: ['./unit-eval-dialog.component.scss', '../dialogs.component.scss'],
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

export class UnitEvalDialogComponent implements OnInit, AfterViewInit {
  objectEntries(arg0: any) {
    throw new Error('Method not implemented.');
  }

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

  serverData: any = null;

  loading: boolean = false;

  interProcess: boolean = false

  pointsError: boolean = true

  constructor(private srv: ToolboxDialogsService, private mapService: MapService,
    private languageSrv: LanguageService, private http: HttpClient) {
    this.languageSrv = languageSrv
  }

  ngOnInit() {
    this.langSubscription = this.languageSrv.language$.subscribe(lang => {
      this.lang = lang;
    });
  }
  ngAfterViewInit(): void {
    this.map = this.mapService.getMap()
    this.btnSubscription = this.srv.unitEvalv2Btn$.subscribe(btnValue => {
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
    this.pointsError = true
    this.interProcess = false;

  }

  overlayProcess() {
    this.serverData = null;

    const features = this.vectorSource.getFeatures();
    let flatCoords: number[] = [];

    features.forEach((feature) => {
      const geometry = feature.getGeometry();

      if (geometry && geometry.getType() === 'Polygon') {
        const polygon = geometry as Polygon;
        const coordinates = polygon.getCoordinates();
        const outerRing = coordinates[0];

        outerRing.forEach((coordPair: number[]) => {
          flatCoords.push(...coordPair);
        });
      }
    });

    // Check if there are more than 2 points (i.e., at least 6 values for x,y pairs)
    if (flatCoords.length / 2 <= 2) {
      console.warn('Polygon must have more than 2 points.');
      this.pointsError = true;
      return;
    }

    this.pointsError = false;

    const serverUrl = `${environment.backend}/api/overlay`;

    const postBody = {
      coords: flatCoords
    };

    this.loading = true;
    this.interProcess = false;

    this.interProcess = true;
    this.http.post(serverUrl, postBody).subscribe({
      next: (response) => {
        this.serverData = response;
        console.log(this.serverData);
        this.loading = false;
        this.interProcess = true;
      },
      error: (err) => {
        console.error('Error posting coordinates:', err);
        this.loading = false;
      }
    });


  }


  closeDialog() {
    this.srv.toggleBtnValue('eval2')
    this.vectorSource.clear()
    this.area = 0
    this.map.removeInteraction(this.draw);

  }


}