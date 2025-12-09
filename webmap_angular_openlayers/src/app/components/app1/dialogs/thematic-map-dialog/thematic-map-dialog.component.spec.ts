import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThematicMapDialogComponent } from './thematic-map-dialog.component';

describe('ThematicMapDialogComponent', () => {
  let component: ThematicMapDialogComponent;
  let fixture: ComponentFixture<ThematicMapDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThematicMapDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThematicMapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
