import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-name-input',
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.css']
})
export class NameInputComponent {

  @Output('result')
  result: EventEmitter<string | undefined> = new EventEmitter();

  constructor() { }
}
