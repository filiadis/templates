import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { View } from 'ol';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LanguageService } from '../../../../languageService/language.service';

@Component({
  selector: 'app-go-home',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './go-home.component.html',
  styleUrls: ['./go-home.component.scss', '../toolbox.component.scss']
})
export class GoHomeComponent implements OnInit {


  lang: string = '';

  el: string = 'Αρχική οθόνη'

  en: string = 'Home'

  langSubscription: any;



  constructor(private mapService: MapService, private languageSrv: LanguageService) {
    this.languageSrv = languageSrv
  }

  ngOnInit(): void {
    this.langSubscription = this.languageSrv.language$.subscribe(lang => {
      this.lang = lang;
    });

  }

  goHome() {
    const map = this.mapService?.getMap()
    if (map) {
      const view = new View({
        center: [2451664, 4636968],
        zoom: 7,
      });
      map.setView(view);
    }

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
