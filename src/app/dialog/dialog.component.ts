import { Component, ElementRef, HostListener, TemplateRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  protected template?: TemplateRef<any>;
  protected output: Subject<any> = new Subject();
  private subcriptions: Subscription[] = [];

  constructor(public element: ElementRef) { }

  show() {
    this.element.nativeElement.style.display = 'block';
  }
  
  showComponent<T>(template: TemplateRef<any>, onResult?: ((arg: T) => void)) {
    this.template = template;
    this.subcriptions.push(this.output.subscribe(res => {
      if (onResult)
      onResult(res as T);
    }));
    this.show();
  }

  hide() {
    this.element.nativeElement.style.display = 'none';
    this.subcriptions.forEach(x => x.unsubscribe());
    this.subcriptions = [];
  }

  hideOnResult(event: any) {
    this.output.next(event);
    this.hide();
  }
  
  @HostListener('click', ['$event.target'])
  onClick(target: Element) {
    if (target == this.element.nativeElement)
      this.hide();
  }
}
