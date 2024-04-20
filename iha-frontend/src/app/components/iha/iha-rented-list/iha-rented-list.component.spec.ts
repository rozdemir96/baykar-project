import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaRentedListComponent } from './iha-rented-list.component';

describe('IhaRentedListComponent', () => {
  let component: IhaRentedListComponent;
  let fixture: ComponentFixture<IhaRentedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IhaRentedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IhaRentedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
