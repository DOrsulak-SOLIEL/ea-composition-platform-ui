import { TestBed } from '@angular/core/testing';

import { BlazegraphService } from './blazegraph.service';

describe('BlazegraphService', () => {
  let service: BlazegraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlazegraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
