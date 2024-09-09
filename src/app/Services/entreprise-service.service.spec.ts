import { TestBed } from '@angular/core/testing';

import { EntrepriseService } from './entreprise.service';

describe('EntrepriseServiceService', () => {
  let service: EntrepriseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrepriseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
