import { TestBed } from '@angular/core/testing';

import { EntrancetestService } from './entrancetest.service';

describe('EntrancetestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntrancetestService = TestBed.get(EntrancetestService);
    expect(service).toBeTruthy();
  });
});
