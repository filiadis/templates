import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapSyncService {
  private resetViewSource = new Subject<void>();

  resetView$ = this.resetViewSource.asObservable();

  triggerResetView() {
    this.resetViewSource.next();
  }
}
