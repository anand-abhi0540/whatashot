import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualTransformationComponent } from './visual-transformation.component';

describe('VisualTransformationComponent', () => {
  let component: VisualTransformationComponent;
  let fixture: ComponentFixture<VisualTransformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualTransformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualTransformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
