import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { FunctionFormService } from './function-form-service/function-form.service';

import { FunctionFormComponent } from './function-form.component';

describe('FunctionFormComponent', () => {
  let component: FunctionFormComponent;
  let fixture: ComponentFixture<FunctionFormComponent>;

  let mockFunctionFormService = jasmine.createSpyObj('mockFunctionFormService', {
    'getResponseString': new Observable<any>(),
  });
  mockFunctionFormService.item = '';
  mockFunctionFormService.price = '';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatInputModule
      ],
      declarations: [ FunctionFormComponent ],
      providers: [
        { provide: FunctionFormService, useValue: mockFunctionFormService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the correct values', () => {
    component.functionForm.controls.item.setValue('water bottle');
    component.functionForm.controls.price.setValue('19.99');

    component.submit();

    expect(mockFunctionFormService.item).toBe('water bottle');
    expect(mockFunctionFormService.price).toBe('$19.99');

    mockFunctionFormService.getResponseString.and.returnValue(of(
      `You've chosen to purchase ${mockFunctionFormService.item} at the price of ${mockFunctionFormService.price}.`));

    expect(mockFunctionFormService.getResponseString).toHaveBeenCalled();
    component.responseString.subscribe(value => {
      return expect(value).toBe(`You've chosen to purchase water bottle at the price of $19.99.`);
    });
  });
});
