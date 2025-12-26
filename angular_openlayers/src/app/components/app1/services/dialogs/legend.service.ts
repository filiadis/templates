import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LegendService {

  private legendBtn = new BehaviorSubject<boolean>(true);

  legendBtn$ = this.legendBtn.asObservable();

  constructor() { }

  getBtnValue() {
    return this.legendBtn.getValue();
  }

  setBtnValue() {
    const currentValue = this.legendBtn.getValue();
    const newValue = !currentValue;
    this.legendBtn.next(newValue);
  }
}
