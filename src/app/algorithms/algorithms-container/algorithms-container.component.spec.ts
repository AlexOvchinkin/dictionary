import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmsContainerComponent } from './algorithms-container.component';

describe('AlgorithmsContainerComponent', () => {
  let component: AlgorithmsContainerComponent;
  let fixture: ComponentFixture<AlgorithmsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
