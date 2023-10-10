import { TestBed } from '@angular/core/testing';

import { BookingStreamService } from './booking-stream.service';

describe('BookingStreamService', () => {
  let service: BookingStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
