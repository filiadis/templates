import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolboxDialogsService {

  //Basemaps
  private basemapBtn = new BehaviorSubject<boolean>(false);
  basemapBtn$ = this.basemapBtn.asObservable();

  //Print
  private printBtn = new BehaviorSubject<boolean>(false);
  printBtn$ = this.printBtn.asObservable();

  //Location
  private locationBtn = new BehaviorSubject<boolean>(false);
  locationBtn$ = this.locationBtn.asObservable();

  //Measure line
  private measureLineBtn = new BehaviorSubject<boolean>(false);
  measureLineBtn$ = this.measureLineBtn.asObservable();

  //Measure line
  private measureAreaBtn = new BehaviorSubject<boolean>(false);
  measureAreaBtn$ = this.measureAreaBtn.asObservable();

  //Thematic map
  private thematicMapBtn = new BehaviorSubject<boolean>(false);
  thematicMapBtn$ = this.thematicMapBtn.asObservable();

  //Fullscreen
  private fullscreenBtn = new BehaviorSubject<boolean>(false);
  fullscreenBtn$ = this.fullscreenBtn.asObservable();

  // Feature Info
  private featureInfoBtn = new BehaviorSubject<boolean>(false);
  featureInfoBtn$ = this.featureInfoBtn.asObservable();

  // Unit evaluation
  private unitEvalBtn = new BehaviorSubject<boolean>(false);
  unitEvalBtn$ = this.unitEvalBtn.asObservable();

  // Unit evaluation
  private unitEvalv2Btn = new BehaviorSubject<boolean>(false);
  unitEvalv2Btn$ = this.unitEvalv2Btn.asObservable();

  constructor() { }

  toggleBtnValue(btn: string) {

    if (btn === "print") {

      //Toggle value
      this.printBtn.next(!this.printBtn.getValue());

      this.basemapBtn.next(false)
      this.locationBtn.next(false)
      this.measureLineBtn.next(false)
      this.measureAreaBtn.next(false)
      this.featureInfoBtn.next(false)
      this.unitEvalBtn.next(false)
      this.unitEvalv2Btn.next(false)

    } else if (btn === "basemaps") {

      //Toggle value
      this.basemapBtn.next(!this.basemapBtn.getValue());

      this.printBtn.next(false)
      this.locationBtn.next(false)
      this.measureLineBtn.next(false)
      this.measureAreaBtn.next(false)
      this.featureInfoBtn.next(false)
      this.featureInfoBtn.next(false)
      this.unitEvalBtn.next(false)
      this.unitEvalv2Btn.next(false)

    } else if (btn === "location") {

      //Toggle value
      this.locationBtn.next(!this.locationBtn.getValue());

      this.printBtn.next(false)
      this.basemapBtn.next(false)
      this.measureLineBtn.next(false)
      this.measureAreaBtn.next(false)
      this.featureInfoBtn.next(false)
      this.unitEvalBtn.next(false)
      this.unitEvalv2Btn.next(false)

    } else if (btn === "measureLine") {

      //Toggle value
      this.measureLineBtn.next(!this.measureLineBtn.getValue());

      this.printBtn.next(false)
      this.basemapBtn.next(false)
      this.locationBtn.next(false)
      this.measureAreaBtn.next(false)
      this.featureInfoBtn.next(false)
      this.unitEvalBtn.next(false)
      this.unitEvalv2Btn.next(false)

    } else if (btn === "measureArea") {

      //Toggle value
      this.measureAreaBtn.next(!this.measureAreaBtn.getValue());

      this.printBtn.next(false)
      this.basemapBtn.next(false)
      this.locationBtn.next(false)
      this.measureLineBtn.next(false)
      this.featureInfoBtn.next(false)
      this.unitEvalBtn.next(false)
      this.unitEvalv2Btn.next(false)

    } else if (btn === "featureInfo") {

      //Toggle value
      this.featureInfoBtn.next(!this.featureInfoBtn.getValue());

      this.printBtn.next(false)
      this.basemapBtn.next(false)
      this.locationBtn.next(false)
      this.measureLineBtn.next(false)
      this.measureAreaBtn.next(false)
      this.unitEvalBtn.next(false)
      this.unitEvalv2Btn.next(false)

    } else if (btn === "evaluation") {

      //Toggle value
      this.unitEvalBtn.next(!this.unitEvalBtn.getValue());

      this.printBtn.next(false)
      this.basemapBtn.next(false)
      this.locationBtn.next(false)
      this.measureLineBtn.next(false)
      this.measureAreaBtn.next(false)
      this.featureInfoBtn.next(false)
      this.unitEvalv2Btn.next(false)

    } else if (btn === "eval2") {

      //Toggle value
      this.unitEvalv2Btn.next(!this.unitEvalv2Btn.getValue());

      this.printBtn.next(false)
      this.basemapBtn.next(false)
      this.locationBtn.next(false)
      this.measureLineBtn.next(false)
      this.measureAreaBtn.next(false)
      this.featureInfoBtn.next(false)
      this.unitEvalBtn.next(false)


    }


  }

  toggleThematicMap() {
    this.thematicMapBtn.next(!this.thematicMapBtn.getValue());

  }

  toggleFullscreen() {
    this.fullscreenBtn.next(!this.fullscreenBtn.getValue());

  }


}
