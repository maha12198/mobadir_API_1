import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdTopicComponent } from './ad-topic.component';

describe('AdTopicComponent', () => {
  let component: AdTopicComponent;
  let fixture: ComponentFixture<AdTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdTopicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
