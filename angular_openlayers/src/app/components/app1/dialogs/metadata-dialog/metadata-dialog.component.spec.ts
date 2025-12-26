import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataDialogComponent } from './metadata-dialog.component';

describe('MetadataDialogComponent', () => {
  let component: MetadataDialogComponent;
  let fixture: ComponentFixture<MetadataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetadataDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetadataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
