import { Component, OnInit } from '@angular/core';
import { DirectoryItem, FileExplorerService } from '../shared/file-explorer.service';

@Component({
  selector: 'app-directory-preview',
  templateUrl: './directory-preview.component.html',
  styleUrls: ['./directory-preview.component.css']
})
export class DirectoryPreviewComponent implements OnInit {

  location: string[] = [];
  items: DirectoryItem[] = [];
  
  constructor(private explorer: FileExplorerService) { }

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

  newFile() {
  }
  
  newFolder() {
  }
}
