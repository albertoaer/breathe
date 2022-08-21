import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(public element: ElementRef) { }

  show() {
    this.element.nativeElement.style.display = 'block';
  }
  
  @HostListener('click', ['$event.target'])
  onClick(target: Element) {
    if (target == this.element.nativeElement)
      this.element.nativeElement.style.display = 'none';
  }
}
