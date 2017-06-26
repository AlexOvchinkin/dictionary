import { TestBed, inject } from '@angular/core/testing';

import { AlgorithmsContainerService } from './algorithms-container.service';

describe('AlgorithmsContainerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlgorithmsContainerService]
    });
  });

  it('should be created', inject([AlgorithmsContainerService], (service: AlgorithmsContainerService) => {
    expect(service).toBeTruthy();
  }));
});
