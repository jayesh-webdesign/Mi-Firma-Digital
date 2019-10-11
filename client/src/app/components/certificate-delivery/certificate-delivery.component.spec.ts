import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateDeliveryComponent } from './certificate-delivery.component';

describe('CertificateDeliveryComponent', () => {
  let component: CertificateDeliveryComponent;
  let fixture: ComponentFixture<CertificateDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
