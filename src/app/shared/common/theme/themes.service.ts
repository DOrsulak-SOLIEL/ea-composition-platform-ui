import { Injectable, Inject, EventEmitter } from '@angular/core';
import { THEMES, ACTIVE_THEME, Theme, DEFAULT_THEME } from './symbols';
import { lightTheme } from './light-theme';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { darkTheme } from './dark-theme';
import { aquaLightTheme } from './light-theme-green';
import { aquaDarkTheme } from './dark-theme-green';
import { destinyDarkTheme } from './dark-theme-destiny';
import { destinyLightTheme } from './light-theme-destiny';
import { oceanLightTheme } from './light-theme-ocean';
import { oceanDarkTheme } from './dark-theme-ocean';
import { yourMajestyDarkTheme } from './dark-theme-your-majesty';
import { yourMajestyLightTheme } from './light-theme-your-majesty';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ThemesService {
  private baseUrl = 'EAPService/api/v1/';
  currentTheme: Theme = {...DEFAULT_THEME};
  private themeUpdate = new ReplaySubject<any>(1);
  themes: Theme[] = [darkTheme, lightTheme, aquaLightTheme, aquaDarkTheme,
    destinyDarkTheme, destinyLightTheme, oceanLightTheme, oceanDarkTheme, yourMajestyDarkTheme, yourMajestyLightTheme];

  constructor(private http: HttpClient) {
    this.setToDefaultTheme();
  }

  setTheme(theme: Theme = {...this.getThemeObj('standard-light')}): void {
    this.themeUpdate.next(theme);
  }

  getThemeObj(name: string): Theme {
    const theme = this.themes.find(t => t.name === name);
    if (!theme) {
      throw new Error(`Theme not found: '${name}'`);
    }
    return {...theme};
  }

  setToDefaultTheme(): void {
    this.setTheme();
  }

  getActiveTheme(): Observable<any> {
    // return the subject here
    // subscribers will will notified when the data is refreshed
    return this.themeUpdate.asObservable();
  }
}
