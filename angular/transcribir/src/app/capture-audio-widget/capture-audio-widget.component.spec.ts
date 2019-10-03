import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureAudioWidgetComponent } from './capture-audio-widget.component';

describe('CaptureAudioWidgetComponent', () => {
  let component: CaptureAudioWidgetComponent;
  let fixture: ComponentFixture<CaptureAudioWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptureAudioWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureAudioWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
