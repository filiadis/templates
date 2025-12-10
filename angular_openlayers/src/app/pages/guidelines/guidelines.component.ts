import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../languageService/language.service';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-guidelines',
  imports: [MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './guidelines.component.html',
  styleUrl: './guidelines.component.scss'
})
export class GuidelinesComponent implements OnInit {

  lang: string = '';

  langSubscription: any;

  constructor(private languageSrv: LanguageService) {
    this.languageSrv = languageSrv
  }

  ngOnInit(): void {
    this.langSubscription = this.languageSrv.language$.subscribe(lang => {
      this.lang = lang;
    });
  }

}
