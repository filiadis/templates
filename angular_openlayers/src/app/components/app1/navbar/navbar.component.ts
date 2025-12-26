import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LanguageService } from '../../../languageService/language.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { MainToolComponent } from './main-tool/main-tool.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatInputModule, FormsModule, MatIconModule, MatTooltipModule, MainToolComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  lang: string = '';

  langSubscription: any;

  infoEl: string = 'Πληροφορίες'
  infoEn: string = 'Info'

  docsEl: string = 'Οδηγίες'
  docsEn: string = 'Guidelines'

  constructor(private languageSrv: LanguageService, private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.langSubscription = this.languageSrv?.language$.subscribe(lang => {
      this.lang = lang;
    });

    this.languageSrv?.setLanguage(this.lang); // Use safe navigation

  }


  onLangChange() {
    this.languageSrv.setLanguage(this.lang);

  }





  infoTooltipText() {
    if (this.lang === 'el') {
      return this.infoEl
    } else if (this.lang === 'en') {
      return this.infoEn
    } else {
      return '';
    }
  }


  docsTooltipText() {
    if (this.lang === 'el') {
      return this.docsEl
    } else if (this.lang === 'en') {
      return this.docsEn
    } else {
      return '';
    }
  }


}
