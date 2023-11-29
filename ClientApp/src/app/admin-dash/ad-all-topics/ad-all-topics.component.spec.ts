import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdAllTopicsComponent } from './ad-all-topics.component';

describe('AdAllTopicsComponent', () => {
  let component: AdAllTopicsComponent;
  let fixture: ComponentFixture<AdAllTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdAllTopicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdAllTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
