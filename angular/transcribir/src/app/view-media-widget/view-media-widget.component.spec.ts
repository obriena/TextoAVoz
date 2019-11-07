import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMediaWidgetComponent } from './view-media-widget.component';

describe('ViewMediaWidgetComponent', () => {
  let component: ViewMediaWidgetComponent;
  let fixture: ComponentFixture<ViewMediaWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMediaWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMediaWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
