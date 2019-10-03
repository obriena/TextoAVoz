import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationWidgetComponent } from './registration-widget.component';

describe('RegistrationWidgetComponent', () => {
  let component: RegistrationWidgetComponent;
  let fixture: ComponentFixture<RegistrationWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
