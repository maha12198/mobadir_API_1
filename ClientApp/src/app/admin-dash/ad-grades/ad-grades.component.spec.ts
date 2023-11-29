import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdGradesComponent } from './ad-grades.component';

describe('AdGradesComponent', () => {
  let component: AdGradesComponent;
  let fixture: ComponentFixture<AdGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdGradesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
