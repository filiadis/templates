import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitEvaluationComponent } from './unit-evaluation.component';

describe('UnitEvaluationComponent', () => {
  let component: UnitEvaluationComponent;
  let fixture: ComponentFixture<UnitEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitEvaluationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
