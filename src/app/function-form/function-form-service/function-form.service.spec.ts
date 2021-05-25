import { TestBed } from '@angular/core/testing';

import { FunctionFormService } from './function-form.service';

describe('FunctionFormService', () => {
  let service: FunctionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
