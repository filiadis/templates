import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureAreaDialogComponent } from './measure-area-dialog.component';

describe('MeasureAreaDialogComponent', () => {
  let component: MeasureAreaDialogComponent;
  let fixture: ComponentFixture<MeasureAreaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasureAreaDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeasureAreaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
