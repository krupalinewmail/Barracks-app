import { TestBed } from '@angular/core/testing';

import { ProgramFeaturesService } from './program-features.service';

describe('ProgramFeaturesService', () => {
  let service: ProgramFeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramFeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
