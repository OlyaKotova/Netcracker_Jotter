import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Collection3Component } from './collection3.component';

describe('Collection3Component', () => {
  let component: Collection3Component;
  let fixture: ComponentFixture<Collection3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Collection3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Collection3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
