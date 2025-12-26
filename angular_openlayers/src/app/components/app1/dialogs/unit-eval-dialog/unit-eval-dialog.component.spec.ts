import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitEvalDialogComponent } from './unit-eval-dialog.component';

describe('UnitEvalDialogComponent', () => {
  let component: UnitEvalDialogComponent;
  let fixture: ComponentFixture<UnitEvalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitEvalDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitEvalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
