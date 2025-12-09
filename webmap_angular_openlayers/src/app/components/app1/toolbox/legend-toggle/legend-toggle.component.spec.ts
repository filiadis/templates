import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendToggleComponent } from './legend-toggle.component';

describe('LegendToggleComponent', () => {
  let component: LegendToggleComponent;
  let fixture: ComponentFixture<LegendToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegendToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegendToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
