import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FunctionFormService } from './function-form-service/function-form.service';

@Component({
  selector: 'app-function-form',
  templateUrl: './function-form.component.html',
  styleUrls: ['./function-form.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1000ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class FunctionFormComponent implements OnInit {
  functionForm = new FormGroup({
    item: new FormControl(''),
    price: new FormControl('')
  });

  isShown: boolean = true;

  responseString: Observable<string> = new Observable<string>();

  constructor(private functionFormService: FunctionFormService) { }

  ngOnInit(): void {
    this.responseString = this.functionFormService.getResponseString();
  }

  submit(): void {
    this.functionFormService.item = this.functionForm.controls.item.value;
    this.functionFormService.price = `$${this.functionForm.controls.price.value}`;

    this.responseString = this.functionFormService.getResponseString();
  }
}
