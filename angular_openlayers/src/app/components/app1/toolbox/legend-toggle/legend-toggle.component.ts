import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LegendService } from '../../services/dialogs/legend.service';
import { LanguageService } from '../../../../languageService/language.service';

@Component({
    selector: 'app-legend-toggle',
    imports: [MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './legend-toggle.component.html',
    styleUrls: ['./legend-toggle.component.scss', '../toolbox.component.scss']
})
export class LegendToggleComponent implements OnInit {
  lang: string = '';

  el: string = 'Επίπεδα πληροφορίας'

  en: string = 'Toggle legend'

  langSubscription: any;


  constructor(private legendService: LegendService, private languageSrv: LanguageService) {
    this.languageSrv = languageSrv
  }

  ngOnInit(): void {
    this.langSubscription = this.languageSrv.language$.subscribe(lang => {
      this.lang = lang;
    });
  }

  onClick() {
    this.legendService.setBtnValue();

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
