import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductshellComponent } from './productshell.component';

describe('ProductshellComponent', () => {
  let component: ProductshellComponent;
  let fixture: ComponentFixture<ProductshellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductshellComponent]
    });
    fixture = TestBed.createComponent(ProductshellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
