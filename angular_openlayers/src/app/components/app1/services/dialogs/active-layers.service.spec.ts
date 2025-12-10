import { TestBed } from '@angular/core/testing';

import { ActiveLayersService } from './active-layers.service';

describe('ActiveLayersService', () => {
  let service: ActiveLayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveLayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
