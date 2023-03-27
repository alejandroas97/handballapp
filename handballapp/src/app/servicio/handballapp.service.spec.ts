import { TestBed } from '@angular/core/testing';

import { HandballappService } from './handballapp.service';

describe('HandballappService', () => {
  let service: HandballappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandballappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
