import { TestBed } from '@angular/core/testing';

import { BrasilApiservice } from './brasil-apiservice';

describe('BrasilApiservice', () => {
  let service: BrasilApiservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrasilApiservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
