import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitEvalComponent } from './unit-eval.component';

describe('UnitEvalComponent', () => {
  let component: UnitEvalComponent;
  let fixture: ComponentFixture<UnitEvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitEvalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
