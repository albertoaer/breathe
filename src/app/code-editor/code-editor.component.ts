import { AfterViewInit, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { edit, Ace }  from 'ace-builds';
import { EditorContentService } from '../shared/editor-content.service';
import { ThemesService } from '../shared/themes.service';
import { File } from '../shared/file-explorer.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements AfterViewInit {

  @ViewChild('editor')
  editorView!: ElementRef;
  editor!: Ace.Editor;
  active: File | null = null;


  @ViewChild(DialogComponent)
  dialog!: DialogComponent;

  @ViewChild('errorBox')
  errorBox!: TemplateRef<any>;

  errorMessage: string = '';

  constructor(private content: EditorContentService, private themes: ThemesService) {}

  ngAfterViewInit(): void {
    this.editor = edit(this.editorView.nativeElement, {
      mode: "ace/mode/javascript",
      selectionStyle: "text",
      cursorStyle: 'slim',
      enableAutoIndent: true
    });
    this.editor.renderer.setScrollMargin(10, 10, 10, 10);
    this.editor.setFontSize(15);
    this.editor.setShowPrintMargin(false);
    this.editor.focus();

    this.themes.getThemeChanges().subscribe(theme => this.editor.setTheme(theme.aceName));
    this.themes.update();

    this.editor.getSession().on('change', () => {
      if (this.active)
        this.active.content = this.editor.getSession().getValue();
      else if (this.editor.getSession().getValue()) {
        this.editor.getSession().setValue('');
        this.errorMessage = "No file open";
        this.dialog.showComponent(this.errorBox);
      }
    });

    this.content.onFile().subscribe(o => {
      this.active = o?.file || null;
      this.editor.getSession().setValue(o ? o.file.content : '');
    });
  }
}
