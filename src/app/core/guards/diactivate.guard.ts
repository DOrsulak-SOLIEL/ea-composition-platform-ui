
import { MatDialog } from '@angular/material/dialog';
import { AppStorageService } from '../services/storage.service';
import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor(
    private dialog: MatDialog,
    private storageService: AppStorageService,
  ) {
  }

  canDeactivate(component: CanComponentDeactivate, currentRoute: any, currentState: any, nextState: any): Promise<boolean> | boolean {
    return true;
  }
}
