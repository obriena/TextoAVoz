import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationConfirmationWidgetComponent } from './registration-confirmation-widget.component';

describe('RegistrationConfirmationWidgetComponent', () => {
  let component: RegistrationConfirmationWidgetComponent;
  let fixture: ComponentFixture<RegistrationConfirmationWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationConfirmationWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationConfirmationWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
