import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { File } from './file-explorer.service';

export interface OpennedFile {
  name: string
  file: File
}

@Injectable({
  providedIn: 'root'
})
export class EditorContentService {

  private active: File | null = null;
  private openFileEvent: Subject<OpennedFile | null> = new Subject();

  onFile(): Observable<OpennedFile | null> {
    return this.openFileEvent.asObservable();
  }

  openFile(file: OpennedFile | null) {
    this.active = file?.file || null;
    this.openFileEvent.next(file);
  }

  isOpen(file: File): boolean {
    return this.active == file;
  }
}
