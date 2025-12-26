import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private language = new BehaviorSubject<string>('el');
  language$ = this.language.asObservable();

  constructor() { }


  setLanguage(lang: string) {
    this.language.next(lang);

  }

}
