import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolboxDialogsService } from '../../services/dialogs/toolbox-dialogs.service';
import { LanguageService } from '../../../../languageService/language.service';

@Component({
    selector: 'app-measure-line',
    imports: [MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './measure-line.component.html',
    styleUrls: ['./measure-line.component.scss', '../toolbox.component.scss']
})
export class MeasureLineComponent implements OnInit {

  lang: string = '';

  el: string = 'Μέτρηση μήκους'

  en: string = 'Measure length'

  langSubscription: any;


  constructor(private srv: ToolboxDialogsService, private languageSrv: LanguageService) { }

  ngOnInit(): void {
    this.langSubscription = this.languageSrv.language$.subscribe(lang => {
      this.lang = lang;
    });
  }

  onClick() {
    this.srv.toggleBtnValue("measureLine");

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
