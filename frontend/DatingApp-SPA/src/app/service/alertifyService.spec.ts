/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlertifyService } from './alertifyService';

describe('Service: Alertify.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertifyService]
    });
  });

  it('should ...', inject([AlertifyService], (service: AlertifyService) => {
    expect(service).toBeTruthy();
  }));
});
