import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTopicsOfSubjectComponent } from './all-topics-of-subject.component';

describe('AllTopicsOfSubjectComponent', () => {
  let component: AllTopicsOfSubjectComponent;
  let fixture: ComponentFixture<AllTopicsOfSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllTopicsOfSubjectComponent]
    });
    fixture = TestBed.createComponent(AllTopicsOfSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
