import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThematicMapComponent } from './thematic-map.component';

describe('ThematicMapComponent', () => {
  let component: ThematicMapComponent;
  let fixture: ComponentFixture<ThematicMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThematicMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThematicMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
