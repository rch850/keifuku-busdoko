import { TestBed, inject } from '@angular/core/testing';

import { KeifukuService } from './keifuku.service';

describe('KeifukuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeifukuService]
    });
  });

  it('should be created', inject([KeifukuService], (service: KeifukuService) => {
    expect(service).toBeTruthy();
  }));
});
