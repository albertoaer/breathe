import { Component, Input, OnInit } from '@angular/core';
import { ThemesService, Theme } from '../shared/themes.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  @Input()
  title: string = String()

  constructor(private themes: ThemesService) { }

  ngOnInit(): void {
  }

  availableThemes(): Theme[] {
    return this.themes.available();
  }

  useTheme(theme: Theme) {
    this.themes.update(theme);
  }
}
