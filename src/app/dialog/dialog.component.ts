import { Component, ElementRef, HostListener, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent<T> {
  protected template?: TemplateRef<any>;
  protected output: Subject<T> = new Subject();

  constructor(public element: ElementRef) { }

  show() {
    this.element.nativeElement.style.display = 'block';
  }
  
  showComponent(template: TemplateRef<any>): Observable<T> {
    this.template = template;
    this.show();
    return this.output.asObservable();
  }

  hide() {
    this.element.nativeElement.style.display = 'none';
  }

  hideOnResult(event: T) {
    this.output.next(event);
    this.hide();
  }
  
  @HostListener('click', ['$event.target'])
  onClick(target: Element) {
    if (target == this.element.nativeElement)
      this.element.nativeElement.style.display = 'none';
  }
}
