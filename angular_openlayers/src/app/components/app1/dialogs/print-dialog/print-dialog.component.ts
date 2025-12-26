import { AfterViewInit, Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolboxDialogsService } from '../../services/dialogs/toolbox-dialogs.service';
import { MatButtonModule } from '@angular/material/button';
import { MapService } from '../../services/map.service';
import jsPDF from 'jspdf';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { View } from 'ol';
import Map from 'ol/Map';
import html2canvas from 'html2canvas';
import { defaults as defaultInteractions } from 'ol/interaction';


@Component({
    selector: 'app-print-dialog',
    imports: [MatIconModule, MatTooltipModule, MatButtonModule],
    templateUrl: './print-dialog.component.html',
    styleUrls: ['./print-dialog.component.scss', '../dialogs.component.scss'],
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
export class PrintDialogComponent implements OnInit, AfterViewInit {

  toggle: boolean = true;

  btnSubscription: any;

  map: any;

  mapExport: any;

  isLoading: boolean = false

  constructor(private srv: ToolboxDialogsService, private mapService: MapService) { }

  ngOnInit() {
    this.btnSubscription = this.srv.printBtn$.subscribe(btnValue => {
      this.toggle = btnValue;
    });


  }

  ngAfterViewInit(): void {
    this.map = this.mapService.getMap()

    // Assign export map
    this.mapExport = new Map({
      view: new View({
        center: [26.175146, 39.160248],
        zoom: 11,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      controls: [],
      interactions: defaultInteractions({ // Use default interactions
        pinchZoom: false, // Disable pinch zoom
        mouseWheelZoom: false // Disable mouse wheel zoom
      }),
      target: 'mape',
    });
  }

  ngOnDestroy() {
    this.btnSubscription.unsubscribe();
  }

  closeDialog() {
    this.srv.toggleBtnValue('print')
  }

  getActiveLayers() {

  }
  exportMap() {



    this.isLoading = true;

    const data = document.getElementById('mape')!;

    html2canvas(data, { scale: 2 }).then((canvas) => {
      const imgWidth = 210;
      const imgHeight = 297;

      const contentDataURL = canvas.toDataURL('image/jpg');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(contentDataURL, 'JPG', 0, 0, imgWidth, imgHeight);
      pdf.save('CV.pdf');
    });

    this.isLoading = false


  }


}










