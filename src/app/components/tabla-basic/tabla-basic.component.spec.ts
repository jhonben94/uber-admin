import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaBasicComponent } from './tabla-basic.component';

describe('TablaBasicComponent', () => {
  let component: TablaBasicComponent;
  let fixture: ComponentFixture<TablaBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
