import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasBreadcrumbComponent } from './was-breadcrumb.component';

describe('WasBreadcrumbComponent', () => {
  let component: WasBreadcrumbComponent;
  let fixture: ComponentFixture<WasBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WasBreadcrumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WasBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
