import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaAvailableListComponent } from './iha-available-list.component';

describe('IhaAvailableListComponent', () => {
  let component: IhaAvailableListComponent;
  let fixture: ComponentFixture<IhaAvailableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IhaAvailableListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IhaAvailableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
