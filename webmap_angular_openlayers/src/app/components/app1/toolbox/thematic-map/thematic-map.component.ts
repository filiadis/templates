import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolboxDialogsService } from '../../services/dialogs/toolbox-dialogs.service';
import { LanguageService } from '../../../../languageService/language.service';

@Component({
    selector: 'app-thematic-map',
    imports: [MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './thematic-map.component.html',
    styleUrls: ['./thematic-map.component.scss', '../toolbox.component.scss']
})
export class ThematicMapComponent implements OnInit {

  toggle: boolean = false;

  btnSubscription: any;

  lang: string = '';

  el: string = 'Χάρτης επισκόπησης'

  en: string = 'Overview map'

  langSubscription: any;

  constructor(private srv: ToolboxDialogsService, private languageSrv: LanguageService) {
    this.languageSrv = languageSrv
  }


  ngOnInit(): void {
    this.btnSubscription = this.srv.thematicMapBtn$.subscribe(btnValue => {
      this.toggle = btnValue;
    })
    this.langSubscription = this.languageSrv.language$.subscribe(lang => {
      this.lang = lang;
    });

  }



  onClick() {
    this.srv.toggleThematicMap()
    console.log(this.toggle)

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
