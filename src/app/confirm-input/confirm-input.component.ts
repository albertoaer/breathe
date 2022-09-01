import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-input',
  templateUrl: './confirm-input.component.html',
  styleUrls: ['./confirm-input.component.css']
})
export class ConfirmInputComponent {

  @Output('result')
  result: EventEmitter<boolean> = new EventEmitter();
  
  constructor() { }
}
