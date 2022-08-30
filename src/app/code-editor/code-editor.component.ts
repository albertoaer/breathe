import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { edit, Ace }  from 'ace-builds';
import { ThemesService } from '../shared/themes.service';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements AfterViewInit {

  @ViewChild('editor')
  editorView!: ElementRef;
  
  editor!: Ace.Editor;

  constructor(private themes: ThemesService) {}

  ngAfterViewInit(): void {
    let editor = edit(this.editorView.nativeElement, {
      mode: "ace/mode/javascript",
      selectionStyle: "text",
      cursorStyle: 'slim',
      enableAutoIndent: true
    });
    editor.renderer.setScrollMargin(10, 10, 10, 10);
    editor.setFontSize(15);
    editor.setShowPrintMargin(false);
    editor.focus();

    this.themes.getThemeChanges().subscribe(theme => editor.setTheme(theme.aceName));
    this.themes.update();
  }
}
