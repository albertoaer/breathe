import { Injectable } from '@angular/core';
import { require as req } from 'ace-builds'
import { Observable, Subject } from 'rxjs';

export interface Theme {
  aceName: string;
  displayName: string;
  dark: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  private themes: Theme[] = req('ace/ext/themelist').themes.map((theme: any) => { return {
    aceName: theme.theme,
    displayName: theme.caption,
    dark: theme.isDark
  }});

  private themeChange: Subject<Theme> = new Subject();
  private currentTheme: Theme = this.themes[0];

  available(): Theme[] {
    return this.themes;
  }

  update(theme?: Theme) {
    if (typeof theme !== 'undefined')
      this.currentTheme = theme;
    this.themeChange.next(this.currentTheme);
  }

  getThemeChanges(): Observable<Theme> {
    return this.themeChange.asObservable();
  }
}
