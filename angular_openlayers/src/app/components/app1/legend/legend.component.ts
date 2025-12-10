import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { LayersComponent } from './layers/layers.component';
import { LegendService } from '../services/dialogs/legend.service';
import { LanguageService } from '../../../languageService/language.service';



@Component({
    selector: 'app-legend',
    imports: [MatExpansionModule, MatCardModule, LayersComponent],
    templateUrl: './legend.component.html',
    styleUrl: './legend.component.scss',
    animations: [
        trigger('slideInOut', [
            state('true', style({
                transform: 'translateX(0%)'
            })),
            state('false', style({
                transform: 'translateX(-200%)'
            })),
            transition('true <=> false', animate('300ms ease-in-out'))
        ])
    ]
})
export class LegendComponent implements OnInit {
  toggle: boolean = true;
  legendBtnSubscription: any;

  lang: string = '';

  langSubscription: any;

  constructor(private legendService: LegendService, private languageSrv: LanguageService) {
    this.languageSrv = languageSrv
  }

  ngOnInit() {
    this.legendBtnSubscription = this.legendService.legendBtn$.subscribe(btnValue => {
      this.toggle = btnValue;
    });

    this.langSubscription = this.languageSrv.language$.subscribe(lang => {
      this.lang = lang;

    });
  }

  ngOnDestroy() {
    this.legendBtnSubscription.unsubscribe();
    this.langSubscription.unsubscribe();
  }

  toggleSide() {
    this.legendService.setBtnValue();
  }
}
