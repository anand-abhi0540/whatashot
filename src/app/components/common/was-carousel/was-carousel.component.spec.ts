import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasCarouselComponent } from './was-carousel.component';

describe('WasCarouselComponent', () => {
  let component: WasCarouselComponent;
  let fixture: ComponentFixture<WasCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WasCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WasCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
