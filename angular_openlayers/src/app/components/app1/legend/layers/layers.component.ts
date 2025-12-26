import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import TileWMS from 'ol/source/TileWMS.js';
import TileLayer from 'ol/layer/Tile.js';
import { MapService } from '../../services/map.service';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from '../../../../languageService/language.service';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DataTableService } from '../../services/dialogs/data-table.service';
import { LayerInfoService } from '../../services/dialogs/layer-info.service';
import { ActiveLayersService } from '../../services/dialogs/active-layers.service';
import { layer_bbox } from './bbox';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-layers',
  imports: [MatCheckboxModule, MatCardModule, MatCheckbox, MatIconModule, MatButtonModule, MatSliderModule, FormsModule, MatTooltipModule, MatProgressSpinnerModule, MatProgressBarModule],
  templateUrl: './layers.component.html',
  styleUrl: './layers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayersComponent implements OnInit, AfterViewInit {

  @Input() greekLabelName: string = '';
  @Input() englishLabelName: string = '';
  @Input() wmsName: string = '';
  @Input() zIndex: string = '90'
  @Input() opened: string = 'n'

  lang: string = '';

  dataTabletoggle: boolean = false

  langSubscription: any;

  dataTableSubscription: any;

  layerInfoSubscription: any;

  propsEl: string = 'Ιδιότητες'

  propsEn: string = 'Properties'

  opacityEl: string = 'Διαφάνεια'

  opacityEn: string = 'Opacity'

  metaEl: string = 'Μεταδεδομένα'

  metaEn: string = 'Metadata'

  legendEl: string = 'Υπόμνημα'

  legendEn: string = 'Legend'

  tableEl: string = 'Πίνακας δεδομένων'

  tableEn: string = 'Attribute table'

  zoomEl: string = 'Εστίαση στο επίπεδο'

  zoomEn: string = 'Zoom to layer'

  downloadEl: string = 'Κατέβασμα αρχείου [.shp]'

  downloadEn: string = 'Download file [.shp]'

  btnChecked = false;

  showProps = environment.showProps; //Show layer properties

  layer: any;

  legendInfo: boolean = false;

  metadata: boolean = false;

  isLoading: boolean = false;

  metadataJsonResponce: any = null;

  metadataLoading: boolean = false;



  //Slider
  max = 1
  min = 0;
  showTicks = false;
  step = 0.1;
  thumbLabel = false;
  opacityProp = 0.7;

  constructor(private mapService: MapService, private http: HttpClient,
    private languageSrv: LanguageService, private cd: ChangeDetectorRef,
    private srv: DataTableService, private layerInfosrv: LayerInfoService,
    private activeLayersSrv: ActiveLayersService
  ) {
    this.languageSrv = languageSrv
  }

  ngOnInit(): void {
    this.langSubscription = this.languageSrv.language$.subscribe(lang => {
      this.lang = lang;
      this.cd.detectChanges();
    });

    this.dataTableSubscription = this.srv.dataTableBtn$.subscribe(btnValue => {
      this.dataTabletoggle = btnValue;
    });

    this.layerInfoSubscription = this.layerInfosrv.layerInfoBtn$.subscribe(btnValue => {
      this.metadata = btnValue;
    });

    this.layerInfoSubscription = this.layerInfosrv.layerInfoLoading$.subscribe(btnValue => {
      this.metadata = btnValue;
    });


  }

  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    //Initialize the layer
    this.layer = new TileLayer({
      opacity: (this.opacityProp),
      zIndex: Number(this.zIndex),
      source: new TileWMS({
        url: `${environment.wmsUrl}`,
        params: { 'LAYERS': `supco:${this.wmsName}`, 'TILED': false },
        serverType: 'geoserver',
        transition: 0,

      })
    })
    console.log(this.layer)
    const map = this.mapService?.getMap()

    if (this.opened === 'y') {
      this.layer.setVisible(true);
      this.btnChecked = true
    } else {
      this.layer.setVisible(false);
    }


    map?.addLayer(this.layer)


    // Listen for tile load events to stop the spinner
    this.layer.getSource().on('tileloadstart', () => {
      this.isLoading = true;
      this.cd.detectChanges();  // Trigger change detection
    });

    this.layer.getSource().on('tileloadend', () => {
      setTimeout(() => {
        this.isLoading = false;
        this.cd.detectChanges();
      }, 5000);

    });

    this.layer.getSource().on('tileloaderror', () => {
      this.isLoading = false;
      this.cd.detectChanges();  // Trigger change detection
    });

  }


  toggle() {
    const map = this.mapService?.getMap()

    this.btnChecked = !this.btnChecked

    if (this.btnChecked) {
      this.layer.setVisible(true)
      // Add the WMS name to the active layers list
      this.activeLayersSrv.addLayer(this.wmsName);

    } else {
      this.layer.setVisible(false)
      // Remove the WMS name to the active layers list
      this.activeLayersSrv.removeLayer(this.wmsName);

    }

  }

  toggleProps() {
    this.showProps = !this.showProps

  }

  onSliderChange() {
    console.log('Updated opacity:', this.opacityProp);
    this.layer.setOpacity(this.opacityProp)


  }

  getLegendInfo() {
    this.legendInfo = !this.legendInfo
  }

  getMetadata() {
    // Toggle the button state
    //this.layerInfosrv.toggleBtn();

    //this.layerInfosrv.toggleLoading()
    this.metadata = !this.metadata



    const metadataApiUrl = `${environment.backend}/api/metadata/${this.wmsName}`;
    if (this.metadata && this.metadataJsonResponce === null) {
      // Make an HTTP GET request to the metadata API
      this.metadataLoading = true
      this.http.get(metadataApiUrl).subscribe({
        next: (response: any) => {
          // Update the jsonResponce BehaviorSubject with the new response data
          this.metadataJsonResponce = response;
          console.log(this.metadataJsonResponce);
        },
        error: (error) => {
          console.error('Error fetching metadata:', error);
        },

      });
      this.metadataLoading = false;
    }
  }

  zoomToLayer() {
    const map = this.mapService?.getMap();
    let extent: any;

    layer_bbox.forEach((layer) => {
      Object.entries(layer).forEach(([key, value]) => {
        if (key === this.wmsName) {
          extent = value;  // Set the extent to the value of the 'beaches' key
        }
      });
    });

    if (extent) {
      map.getView().fit(extent);  // Apply the extent to the map view
    } else {
      console.log('No extent found for beaches.');
    }
  }

  downloadFileShp() {
    const wfsUrl = `${environment.wmsUrl}?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=circhive:${this.wmsName}&OUTPUTFORMAT=SHAPE-ZIP`;

    // Open the URL in a new tab
    const newTab = window.open(wfsUrl, '_blank');

  }

  public getLegendUrl(layerName: string) {
    return `${environment.wmsUrl}?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=30&HEIGHT=30&LAYER=supco:${layerName}`;
  }

  getDataTable() {
    // Assign the Greek label name to the dataTableElName in the service
    this.srv.dataTableElName.next(this.greekLabelName);
    this.srv.dataTableEnName.next(this.englishLabelName);
    this.srv.databaseName.next(this.wmsName);
    this.srv.toggleDataTable()
  }

  opacityTooltipText() {
    if (this.lang === 'el') {
      return this.opacityEl
    } else if (this.lang === 'en') {
      return this.opacityEn
    } else {
      return '';
    }
  }

  propsTooltipText() {
    if (this.lang === 'el') {
      return this.propsEl
    } else if (this.lang === 'en') {
      return this.propsEn
    } else {
      return '';
    }
  }

  metaTooltipText() {
    if (this.lang === 'el') {
      return this.metaEl
    } else if (this.lang === 'en') {
      return this.metaEn
    } else {
      return '';
    }
  }

  legendTooltipText() {
    if (this.lang === 'el') {
      return this.legendEl
    } else if (this.lang === 'en') {
      return this.legendEn
    } else {
      return '';
    }
  }

  dataTableTooltipText() {
    if (this.lang === 'el') {
      return this.tableEl
    } else if (this.lang === 'en') {
      return this.tableEn
    } else {
      return '';
    }
  }

  zoomTooltipText() {
    if (this.lang === 'el') {
      return this.zoomEl
    } else if (this.lang === 'en') {
      return this.zoomEn
    } else {
      return '';
    }
  }

  downloadTooltipText() {
    if (this.lang === 'el') {
      return this.downloadEl
    } else if (this.lang === 'en') {
      return this.downloadEn
    } else {
      return '';
    }
  }


}
