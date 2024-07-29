import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  ReservcComponent } from './reservc.component';

describe(' ReservcComponent', () => {
  let component: ReservcComponent;
  let fixture: ComponentFixture< ReservcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [  ReservcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent( ReservcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
