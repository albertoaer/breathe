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
  dialog!: DialogComponent;

  @ViewChild('confirmInput')
  confirmInput!: TemplateRef<any>;
  @ViewChild('nameInput')
  nameInput!: TemplateRef<any>;
  @ViewChild('errorBox')
  errorBox!: TemplateRef<any>;

  errorMessage: string = '';

  constructor(protected explorer: FileExplorerService) { }

  ngOnInit(): void {
    this.explorer.getItems().subscribe(items => this.items = items);
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
    this.dialog.showComponent(this.confirmInput, (res: boolean) => {
      if (res)
        this.explorer.deleteElement(item.name);
    });
    event.stopPropagation();
  }

  createItem(method: (name: string) => void) {
    this.dialog.showComponent(this.nameInput, (name: string | undefined) => {
      if (name) {
        if (this.explorer.includes(name)) {
          this.errorMessage = 'Name already registered';
          this.dialog.onceClosed(x => x.showComponent(this.errorBox));
        }
        else
          method(name);
      }
    });
  }

  addDirectory(name: string) {
    this.explorer.addDirectory(name);
  }

  addFile(name: string) {
    this.explorer.addFile(name);
  }
}
