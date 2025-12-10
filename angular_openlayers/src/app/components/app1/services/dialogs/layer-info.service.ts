import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LayerInfoService {

  // toggle btn
  public layerInfoBtn = new BehaviorSubject<boolean>(false);
  layerInfoBtn$ = this.layerInfoBtn.asObservable();

  // Lyaer info from server
  public jsonResponce = new BehaviorSubject<Record<string, any>>({});
  jsonResponce$ = this.jsonResponce.asObservable();

  // Lyaer info from server
  public layerInfoLoading = new BehaviorSubject<boolean>(false);
  layerInfoLoading$ = this.layerInfoLoading.asObservable();

  constructor(private http: HttpClient) { }



  toggleBtn() {
    this.layerInfoBtn.next(!this.layerInfoBtn.getValue());

  }

  toggleLoading() {
    this.layerInfoLoading.next(!this.layerInfoLoading.getValue());

  }
}
