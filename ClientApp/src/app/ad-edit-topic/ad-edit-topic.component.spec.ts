import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdEditTopicComponent } from './ad-edit-topic.component';

describe('AdEditTopicComponent', () => {
  let component: AdEditTopicComponent;
  let fixture: ComponentFixture<AdEditTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdEditTopicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdEditTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
