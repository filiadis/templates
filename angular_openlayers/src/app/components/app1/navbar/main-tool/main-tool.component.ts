import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { ToolboxDialogsService } from '../../services/dialogs/toolbox-dialogs.service';
import { LanguageService } from '../../../../languageService/language.service';

@Component({
  selector: 'app-main-tool',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './main-tool.component.html',
  styleUrl: './main-tool.component.scss'
})
export class MainToolComponent implements OnInit {

  isActive = false;

  lang: string = '';

  el: string = 'Επικάλυψη επιπέδων'

  en: string = 'Layer overlay'

  langSubscription: any;




  constructor(private srv: ToolboxDialogsService,
    private languageSrv: LanguageService, private renderer: Renderer2) {
    this.languageSrv = languageSrv
  }

  ngOnInit(): void {
    this.langSubscription = this.languageSrv.language$.subscribe(lang => {
      this.lang = lang;
    });
  }

  onClick() {
    this.srv.toggleBtnValue('eval2');
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
