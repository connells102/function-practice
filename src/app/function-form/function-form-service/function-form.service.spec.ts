import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FunctionFormService } from './function-form.service';

describe('FunctionFormService', () => {
  let http: HttpTestingController;
  let service: FunctionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(FunctionFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the response string', () => {
    const uri = 'https://sample-function-app-sac.azurewebsites.net/api/PracticeHttpTrigger?code=mu1mykKrVH8b2HTcb7e2gasfZJNf2FeXIctnMXzhneaCfmOqJxNleg==';
    service.item = 'tea cup';
    service.price = '2';
    const url = `${uri}&item=${service.item}&price=${service.price}`;

    service.getResponseString().subscribe(value => {
      return expect(value).toBe(`You've chosen to purchase ${service.item} at the price of $${service.price}.`);
    });

    const result = http.expectOne(url);
    result.flush(`You've chosen to purchase ${service.item} at the price of $${service.price}.`);
    http.verify();
  });
});
