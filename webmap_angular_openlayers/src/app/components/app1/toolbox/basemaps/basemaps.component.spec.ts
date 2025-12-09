import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasemapsComponent } from './basemaps.component';

describe('BasemapsComponent', () => {
  let component: BasemapsComponent;
  let fixture: ComponentFixture<BasemapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasemapsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasemapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
