import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCodeVerificationComponent } from './purchase-code-verification.component';

describe('PurchaseCodeVerificationComponent', () => {
  let component: PurchaseCodeVerificationComponent;
  let fixture: ComponentFixture<PurchaseCodeVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseCodeVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseCodeVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
