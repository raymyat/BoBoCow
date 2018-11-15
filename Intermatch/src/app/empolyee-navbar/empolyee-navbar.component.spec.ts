import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpolyeeNavbarComponent } from './empolyee-navbar.component';

describe('EmpolyeeNavbarComponent', () => {
  let component: EmpolyeeNavbarComponent;
  let fixture: ComponentFixture<EmpolyeeNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpolyeeNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpolyeeNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
