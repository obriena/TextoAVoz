import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftWidgetComponent } from './left-widget.component';

describe('LeftWidgetComponent', () => {
  let component: LeftWidgetComponent;
  let fixture: ComponentFixture<LeftWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
