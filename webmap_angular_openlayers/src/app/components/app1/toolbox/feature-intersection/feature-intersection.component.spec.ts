import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureIntersectionComponent } from './feature-intersection.component';

describe('FeatureIntersectionComponent', () => {
  let component: FeatureIntersectionComponent;
  let fixture: ComponentFixture<FeatureIntersectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureIntersectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeatureIntersectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
