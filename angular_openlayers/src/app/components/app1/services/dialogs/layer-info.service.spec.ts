import { TestBed } from '@angular/core/testing';

import { LayerInfoService } from './layer-info.service';

describe('LayerInfoService', () => {
  let service: LayerInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayerInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
