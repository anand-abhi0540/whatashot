import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasButtonComponent } from './was-button.component';

describe('WasButtonComponent', () => {
  let component: WasButtonComponent;
  let fixture: ComponentFixture<WasButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WasButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WasButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
