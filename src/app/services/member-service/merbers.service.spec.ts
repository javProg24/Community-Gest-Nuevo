import { TestBed } from '@angular/core/testing';

import { MerbersService } from './merbers.service';

describe('MerbersService', () => {
  let service: MerbersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerbersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
