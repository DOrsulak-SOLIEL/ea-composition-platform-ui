import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

export enum StorageKey {
}

@Injectable()
export class AppStorageService {
  private reset = new BehaviorSubject<any>(false);
  resetSubject$: Observable<any> = this.reset.asObservable();
  private sessionStorage = window.sessionStorage;
  private localStorage = window.localStorage;

  constructor(private router: Router) {
    const state = this;
    // this function only runs if localStorage is changed directly
    window.addEventListener('storage', (e): void => {
      state.resetSubject$.pipe(take(1))
        .subscribe((val) => {
          if (!val) {
            state.router.navigateByUrl('/disclaimer');
            state.removeAll();
            console.log('something was altered', e.key, e.newValue);
            state.setItem(e.key, e.newValue);
            state.reset.next(true);
            return;
          }
          return;
        });
    });
  }

  public getItem(key: any): any {
    return this.sessionStorage.getItem(key);
  }

  setItem(key: any, val: any): void {
    this.localStorage.setItem(key, val); // To be removed later. It's for backward compatability.
    this.sessionStorage.setItem(key, val);
  }

  removeItem(key: string): void {
    this.localStorage.removeItem(key);
    this.sessionStorage.removeItem(key);
  }

  removeAll(): void {
    this.localStorage.clear();
    this.sessionStorage.clear();
  }

  removeSession(): void {
    for (const value of this.enumKeys(StorageKey)) {
      if (StorageKey[value] !== 'disclaimer-accepted') {
        localStorage.removeItem(StorageKey[value]);
        sessionStorage.removeItem(StorageKey[value]);
      }
    }
  }

  private enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
  }
}
