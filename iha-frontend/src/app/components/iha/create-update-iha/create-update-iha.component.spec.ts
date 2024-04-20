import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateIhaComponent } from './create-update-iha.component';

describe('CreateUpdateIhaComponent', () => {
  let component: CreateUpdateIhaComponent;
  let fixture: ComponentFixture<CreateUpdateIhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateIhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateIhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
