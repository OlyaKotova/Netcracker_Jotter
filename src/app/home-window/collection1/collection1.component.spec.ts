import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Collection1Component } from './collection1.component';

describe('Collection1Component', () => {
  let component: Collection1Component;
  let fixture: ComponentFixture<Collection1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Collection1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Collection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
