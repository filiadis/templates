import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureLineDialogComponent } from './measure-line-dialog.component';

describe('MeasureLineDialogComponent', () => {
  let component: MeasureLineDialogComponent;
  let fixture: ComponentFixture<MeasureLineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasureLineDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeasureLineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
