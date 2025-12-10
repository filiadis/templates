import { TestBed } from '@angular/core/testing';

import { ToolboxDialogsService } from './toolbox-dialogs.service';

describe('ToolboxDialogsService', () => {
  let service: ToolboxDialogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolboxDialogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
