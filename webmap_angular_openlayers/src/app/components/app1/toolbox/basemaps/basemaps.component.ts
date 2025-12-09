import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolboxDialogsService } from '../../services/dialogs/toolbox-dialogs.service';
import { LanguageService } from '../../../../languageService/language.service';

@Component({
    selector: 'app-basemaps',
    imports: [MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './basemaps.component.html',
    styleUrls: ['./basemaps.component.scss', '../toolbox.component.scss']
})
export class BasemapsComponent implements OnInit {
  isActive = false;

  lang: string = '';

  el: string = 'Υπόβαθρα'

  en: string = 'Basemaps'

  langSubscription: any;

  constructor(private srv: ToolboxDialogsService, private languageSrv: LanguageService) {
    this.languageSrv = languageSrv
  }

  ngOnInit(): void {
    this.langSubscription = this.languageSrv.language$.subscribe(lang => {
      this.lang = lang;
    });
  }


  onClick() {
    this.srv.toggleBtnValue('basemaps');
    this.isActive = !this.isActive;
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
