import { TestBed } from '@angular/core/testing';

import { IhaService } from './iha.service';

describe('IhaService', () => {
  let service: IhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
