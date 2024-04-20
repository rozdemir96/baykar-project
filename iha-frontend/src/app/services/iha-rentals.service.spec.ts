import { TestBed } from '@angular/core/testing';

import { IhaRentalsService } from './iha-rentals.service';

describe('IhaRentalsService', () => {
  let service: IhaRentalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IhaRentalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
