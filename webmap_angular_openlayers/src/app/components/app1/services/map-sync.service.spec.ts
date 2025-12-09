import { TestBed } from '@angular/core/testing';

import { MapSyncService } from './map-sync.service';

describe('MapSyncService', () => {
  let service: MapSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
