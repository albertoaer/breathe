import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { edit, Ace }  from 'ace-builds';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements AfterViewInit {

  @ViewChild('editor')
  editorView!: ElementRef;
  
  editor!: Ace.Editor;

  ngAfterViewInit(): void {
    let editor = edit(this.editorView.nativeElement, {
      mode: "ace/mode/javascript",
      selectionStyle: "text",
      cursorStyle: 'slim',
      enableAutoIndent: true
    });
    editor.setTheme('ace/theme/clouds_midnight');
    editor.setFontSize(15);
    editor.setShowPrintMargin(false);

    editor.focus();
  }
}
