import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { MenubarComponent } from './menubar/menubar.component';
import { DialogComponent } from './dialog/dialog.component';
import { DirectoryPreviewComponent } from './directory_preview/directory-preview.component';
import { NameInputComponent } from './name-input/name-input.component';
import { ConfirmInputComponent } from './confirm-input/confirm-input.component';
import { ButtonComponent } from './button/button.component';
import { ErrorBoxComponent } from './error-box/error-box.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeEditorComponent,
    MenubarComponent,
    DialogComponent,
    DirectoryPreviewComponent,
    NameInputComponent,
    ConfirmInputComponent,
    ButtonComponent,
    ErrorBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
