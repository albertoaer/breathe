import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { DirectoryItem, FileExplorerService } from '../shared/file-explorer.service';

@Component({
  selector: 'app-directory-preview',
  templateUrl: './directory-preview.component.html',
  styleUrls: ['./directory-preview.component.css']
})
export class DirectoryPreviewComponent implements OnInit {

  location: string[] = [];
  items: DirectoryItem[] = [];

  @ViewChild(DialogComponent)
  confirmDialog!: DialogComponent<boolean>;
  @ViewChild(DialogComponent)
  nameDialog!: DialogComponent<string | undefined>;

  @ViewChild('sureInput')
  confirm!: TemplateRef<any>;
  @ViewChild('nameInput')
  name!: TemplateRef<any>;

  constructor(protected explorer: FileExplorerService) { }

  ngOnInit(): void {
    this.explorer.getItems().subscribe(items => this.items = items);
  }

  getDialog<T>(): DialogComponent<T> {
    return ViewChild(DialogComponent);
  }

  moveRelative(idx: number) {
    this.moveTo(this.location.slice(0, idx+1));
  }

  moveTo(location: string[]) {
    if (this.explorer.moveTo(location)) {
      this.location = location;
    }
  }

  openItem(event: Event, item: DirectoryItem) {
    event.stopPropagation();
  }

  delete(event: Event, item: DirectoryItem) {
    const sub = this.confirmDialog.showComponent(this.confirm).subscribe(res => {
      if (res)
        this.explorer.deleteElement(item.name);
      sub.unsubscribe();
    });
    event.stopPropagation();
  }

  createItem(method: (name: string) => void) {
    const sub = this.nameDialog.showComponent(this.name).subscribe(name => {
      console.log(name);
      if (name)
        method(name);
      sub.unsubscribe();
    });
  }

  addDirectory(name: string) {
    this.explorer.addDirectory(name);
  }

  addFile(name: string) {
    this.explorer.addFile(name);
  }
}
