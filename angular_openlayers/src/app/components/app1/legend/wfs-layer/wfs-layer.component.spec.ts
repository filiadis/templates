import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WfsLayerComponent } from './wfs-layer.component';

describe('WfsLayerComponent', () => {
  let component: WfsLayerComponent;
  let fixture: ComponentFixture<WfsLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WfsLayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WfsLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
