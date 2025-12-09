import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureLineComponent } from './measure-line.component';

describe('MeasureLineComponent', () => {
  let component: MeasureLineComponent;
  let fixture: ComponentFixture<MeasureLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasureLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeasureLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
