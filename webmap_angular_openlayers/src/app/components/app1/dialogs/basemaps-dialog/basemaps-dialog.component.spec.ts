import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasemapsDialogComponent } from './basemaps-dialog.component';

describe('BasemapsDialogComponent', () => {
  let component: BasemapsDialogComponent;
  let fixture: ComponentFixture<BasemapsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasemapsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasemapsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
