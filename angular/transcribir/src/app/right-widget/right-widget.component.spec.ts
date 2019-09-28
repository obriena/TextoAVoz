import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightWidgetComponent } from './right-widget.component';

describe('RightWidgetComponent', () => {
  let component: RightWidgetComponent;
  let fixture: ComponentFixture<RightWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
