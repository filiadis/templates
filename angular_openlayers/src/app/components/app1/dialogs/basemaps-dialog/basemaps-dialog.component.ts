import { Component, OnInit } from '@angular/core';
import { ToolboxDialogsService } from '../../services/dialogs/toolbox-dialogs.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MapService } from '../../services/map.service';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import { MatRadioModule } from '@angular/material/radio';
import { LanguageService } from '../../../../languageService/language.service';

@Component({
    selector: 'app-basemaps-dialog',
    imports: [MatIconModule, MatTooltipModule, MatRadioModule],
    templateUrl: './basemaps-dialog.component.html',
    styleUrls: ['./basemaps-dialog.component.scss', '../dialogs.component.scss'],
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
export class BasemapsDialogComponent implements OnInit {

  lang: string = '';

  langSubscription: any;

  toggle: boolean = false;

  btnSubscription: any;

  osm = new TileLayer({
    source: new OSM(), visible: true, className: "osm"
  })


  esriWorld = new TileLayer({
    source: new XYZ({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      maxZoom: 20
    }), visible: false, className: "esriWorld"
  });

  esriGrey = new TileLayer({
    source: new XYZ({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      maxZoom: 20
    }), visible: false, className: "esriGrey"
  })

  esriRelief = new TileLayer({
    source: new XYZ({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
      maxZoom: 12
    }), visible: false, className: "esriRelief"
  });

  constructor(private srv: ToolboxDialogsService, private languageSrv: LanguageService,
    private mapService: MapService) {
    this.languageSrv = languageSrv
  }

  ngOnInit() {
    this.btnSubscription = this.srv.basemapBtn$.subscribe(btnValue => {
      this.toggle = btnValue;
    });
    this.langSubscription = this.languageSrv.language$.subscribe(lang => {
      this.lang = lang;
    });

    //Add basemaps
    const map = this.mapService?.getMap()
    map?.addLayer(this.osm)
    map?.addLayer(this.esriWorld)
    map?.addLayer(this.esriGrey)
    map?.addLayer(this.esriRelief)
  }

  selectedRadioBtn(value: string) {
    const map = this.mapService?.getMap()

    if (value === "osm") {
      this.osm.setVisible(true)
      this.esriWorld.setVisible(false)
      this.esriGrey.setVisible(false)
      this.esriRelief.setVisible(false)

    } else if (value === "esriWorld") {
      this.osm.setVisible(false)
      this.esriWorld.setVisible(true)
      this.esriGrey.setVisible(false)
      this.esriRelief.setVisible(false)

    } else if (value === "esriGrey") {
      this.osm.setVisible(false)
      this.esriWorld.setVisible(false)
      this.esriGrey.setVisible(true)
      this.esriRelief.setVisible(false)

    } else if (value === "esriRelief") {
      this.osm.setVisible(false)
      this.esriWorld.setVisible(false)
      this.esriGrey.setVisible(false)
      this.esriRelief.setVisible(true)

    } else if (value === "none") {
      this.osm.setVisible(false)
      this.esriWorld.setVisible(false)
      this.esriGrey.setVisible(false)
      this.esriRelief.setVisible(false)
    }
  }

  ngOnDestroy() {
    this.btnSubscription.unsubscribe();
  }

  closeDialog() {
    this.srv.toggleBtnValue('basemaps')
  }
}

