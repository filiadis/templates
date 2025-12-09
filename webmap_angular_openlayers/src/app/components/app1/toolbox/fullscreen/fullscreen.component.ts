import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolboxDialogsService } from '../../services/dialogs/toolbox-dialogs.service';
import { LanguageService } from '../../../../languageService/language.service';

@Component({
    selector: 'app-fullscreen',
    imports: [MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './fullscreen.component.html',
    styleUrls: ['./fullscreen.component.scss', '../toolbox.component.scss']
})
export class FullscreenComponent implements OnInit {

  toggle: boolean = false;

  lang: string = '';

  el: string = 'Πλήρης οθόνη'

  en: string = 'Fullscreen'

  langSubscription: any;

  btnSubscription: any;


  constructor(private srv: ToolboxDialogsService, private languageSrv: LanguageService) {
    this.languageSrv = languageSrv
  }

  ngOnInit(): void {
    this.langSubscription = this.languageSrv.language$.subscribe(lang => {
      this.lang = lang;
    });
  }


  ngAfterViewInit(): void {
    this.btnSubscription = this.srv.fullscreenBtn$.subscribe(btnValue => {
      this.toggle = btnValue;
    })

  }

  ngOnDestroy() {
    this.btnSubscription.unsubscribe();
  }

  onClick() {
    this.srv.toggleFullscreen(); // Toggle fullscreen
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
