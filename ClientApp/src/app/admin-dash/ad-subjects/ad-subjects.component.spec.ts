import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSubjectsComponent } from './ad-subjects.component';

describe('AdSubjectsComponent', () => {
  let component: AdSubjectsComponent;
  let fixture: ComponentFixture<AdSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdSubjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
