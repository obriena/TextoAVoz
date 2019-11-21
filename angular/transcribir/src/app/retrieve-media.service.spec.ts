import { TestBed } from '@angular/core/testing';

import { RetrieveMediaService } from './retrieve-media.service';

describe('RetrieveMediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetrieveMediaService = TestBed.get(RetrieveMediaService);
    expect(service).toBeTruthy();
  });
});
