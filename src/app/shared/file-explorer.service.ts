import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface File {
  content: string
}

type ItemType = File | Directory

interface Directory {
  entries: {[name: string]: ItemType }
}

export type ItemKind = 'file' | 'dir';

export interface DirectoryItem {
  name: string
  kind: ItemKind
}

function getKind(tp: ItemType): ItemKind {
  if ('content' in tp) return 'file';
  return 'dir';
}

@Injectable({
  providedIn: 'root'
})
export class FileExplorerService {

  private treeRoot: Directory = {
    entries: {}
  }
  
  private current: Directory = this.treeRoot

  private itemsChange: Subject<DirectoryItem[]> = new Subject();

  constructor() { }

  updateItems() {
    return this.itemsChange.next(Object.entries(this.current.entries).map(([k, v]) =>
      { return { name: k, kind: getKind(v) }; }))
  }

  getItems(): Observable<DirectoryItem[]> {
    return this.itemsChange.asObservable();
  }

  /**
   * Moves to a directory
   * @param path The path to walk through into the directory
   * @returns if the acction was succesful
   */
  moveTo(path: string[]): boolean {
    let current: Directory = this.treeRoot;
    for (const entry in path) {
      let next = current.entries[path[parseInt(entry)]];
      if (typeof next === undefined) return false;
      if (getKind(next) != 'dir') return false;
      current = next as Directory;
    }
    this.current = current;
    this.updateItems();
    return true;
  }

  addDirectory(name: string) {
    this.current.entries[name] = {
      entries: {}
    }
    this.updateItems();
  }

  addFile(name: string) {
    this.current.entries[name] = {
      content: ""
    }
    this.updateItems();
  }
}
