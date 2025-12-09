import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LanguageService } from '../../../../languageService/language.service';

@Component({
    selector: 'app-zoom-in',
    imports: [MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './zoom-in.component.html',
    styleUrls: ['./zoom-in.component.scss', '../toolbox.component.scss']
})
export class ZoomInComponent implements OnInit {

  lang: string = '';

  el: string = 'Μεγέθυνση'

  en: string = 'Zoom in'

  langSubscription: any;

  constructor(private mapService: MapService,
    private languageSrv: LanguageService) {

    this.mapService = mapService;
    this.languageSrv = languageSrv
  }

  ngOnInit(): void {
    this.langSubscription = this.languageSrv.language$.subscribe(lang => {
      this.lang = lang;
    });

  }

  zoomIn() {
    const map = this.mapService?.getMap()
    let mapZoomLevel: any = map?.getView().getZoom()
    map?.getView().setZoom(mapZoomLevel += 1)
  }

  tooltipText() {
    if (this.lang === 'el') {
      return this.el
    } else if (this.lang === 'en') {
      return this.en
    } else {
      return '';
    }
  }

}
