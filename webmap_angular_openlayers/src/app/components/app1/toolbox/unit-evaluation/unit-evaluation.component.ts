import { Component, OnInit, Renderer2, HostListener } from '@angular/core';
import { ToolboxDialogsService } from '../../services/dialogs/toolbox-dialogs.service';
import { LanguageService } from '../../../../languageService/language.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
    selector: 'app-unit-evaluation',
    imports: [MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './unit-evaluation.component.html',
    styleUrls: ['./unit-evaluation.component.scss', '../toolbox.component.scss']
})
export class UnitEvaluationComponent implements OnInit {
  isActive = false;

  lang: string = '';

  el: string = 'Αξιολόγηση μονάδας'

  en: string = 'Unit evaluation'

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
    this.srv.toggleBtnValue('evaluation');
    this.isActive = !this.isActive;
  }
  /*
    changeCursor() {
      // Check if btnOn is true before changing the cursor
      if (this.btnOn) {
        // Set cursor to crosshair
        this.renderer.setStyle(
          document.getElementById('map'),
          'cursor',
          'crosshair'
        );
      } else {
        // Reset cursor to default
        this.renderer.setStyle(document.getElementById('map'), 'cursor', 'auto');
      }
    }*/





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