import { TestBed } from '@angular/core/testing';

import { MediaDataStoreService } from './media-data-store.service';

describe('MediaDataStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaDataStoreService = TestBed.get(MediaDataStoreService);
    expect(service).toBeTruthy();
  });
});
