import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolboxDialogsService } from '../../services/dialogs/toolbox-dialogs.service';
import { LanguageService } from '../../../../languageService/language.service';

@Component({
    selector: 'app-location',
    imports: [MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss', '../toolbox.component.scss']
})
export class LocationComponent implements OnInit {

  lang: string = '';

  el: string = 'Μετάβαση σε συντεταγμένες'

  en: string = 'Go to coordinates'

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
    this.srv.toggleBtnValue("location");
    console.log("clicked")
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
