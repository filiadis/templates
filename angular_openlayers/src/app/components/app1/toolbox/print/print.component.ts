import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolboxDialogsService } from '../../services/dialogs/toolbox-dialogs.service';
import { MapService } from '../../services/map.service';
import { LanguageService } from '../../../../languageService/language.service';

@Component({
    selector: 'app-print',
    imports: [MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './print.component.html',
    styleUrls: ['./print.component.scss', '../toolbox.component.scss']
})
export class PrintComponent implements OnInit {
  lang: string = '';

  el: string = 'Εκτύπωση'

  en: string = 'Print'

  langSubscription: any;


  constructor(private srv: ToolboxDialogsService, private mapService: MapService, private languageSrv: LanguageService) {
    this.languageSrv = languageSrv
  }

  ngOnInit(): void {
    this.langSubscription = this.languageSrv.language$.subscribe(lang => {
      this.lang = lang;
    });
  }

  onClick() {
    //this.srv.toggleBtnValue('print');
    window.print();
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
