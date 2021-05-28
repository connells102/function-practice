import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FunctionFormService } from './function-form-service/function-form.service';
declare var anime: any;

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

  ngAfterViewInit(): void {
    // Wrap every letter in a span
var textWrapper = document.querySelector('.an-2') ;
if(textWrapper)
{
  if(textWrapper.textContent)
  {
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  }
}

  //anime.timeline({loop: true})
  // .add({
  //   targets: '.an-2 .letter',
  //   opacity: [0,1],
  //   easing: "easeInOutQuad",
  //   duration: 2250,
  //   delay: 150
  // }).add({
  //   targets: '.an-2',
  //   opacity: 0,
  //   duration: 1000,
  //   easing: "easeOutExpo",
  //   delay: 1000
  // });

  anime.timeline({
    targets: '.result-string',
    loop: true,
    rotate:  {
      value: 360,
      duration: 1800,
      easing: 'easeInOutSine'
    },
    scale: {
      value: 2,
      duration: 1600,
      delay: 800,
      easing: 'easeInOutQuart'
    },
    easing: "easeOutExpo"

  })
}
}
