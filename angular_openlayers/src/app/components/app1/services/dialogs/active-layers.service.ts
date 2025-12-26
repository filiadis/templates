import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveLayersService {

  // Active layers array with BehaviorSubject to track changes
  private activeLayersSubject = new BehaviorSubject<string[]>([]);
  public activeLayers$ = this.activeLayersSubject.asObservable();

  constructor() { }

  // Method to add a layer to the active layers array
  addLayer(layerName: string): void {
    const currentLayers = this.activeLayersSubject.value;
    if (!currentLayers.includes(layerName)) {
      const updatedLayers = [...currentLayers, layerName];
      this.activeLayersSubject.next(updatedLayers);
    }
  }

  // Method to remove a layer from the active layers array
  removeLayer(layerName: string): void {
    const currentLayers = this.activeLayersSubject.value;
    const updatedLayers = currentLayers.filter(layer => layer !== layerName);
    this.activeLayersSubject.next(updatedLayers);
  }

  // Method to get the current active layers array
  getActiveLayers(): string[] {
    return this.activeLayersSubject.value;
  }
}

