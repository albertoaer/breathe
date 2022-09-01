import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input('default')
  isDefault: boolean = false;

  @Output('click')
  clickEvent: EventEmitter<Event> = new EventEmitter();

  constructor() { }
}
