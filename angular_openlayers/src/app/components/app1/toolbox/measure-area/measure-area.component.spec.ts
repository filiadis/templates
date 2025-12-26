import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureAreaComponent } from './measure-area.component';

describe('MeasureAreaComponent', () => {
  let component: MeasureAreaComponent;
  let fixture: ComponentFixture<MeasureAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasureAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeasureAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
