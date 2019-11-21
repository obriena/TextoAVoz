import { TestBed } from '@angular/core/testing';

import { UserDataStoreService } from './user-data-store.service';

describe('UserDataStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDataStoreService = TestBed.get(UserDataStoreService);
    expect(service).toBeTruthy();
  });
});
