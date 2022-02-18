import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class NavigationService {
  private history: string[] = [];
  private headerIsCollapsed: Subject<boolean> = new BehaviorSubject<boolean>(false);
  private navSidePanelIsExpanded: Subject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private router: Router, private location: Location) {
    // this.router.events.subscribe((event) => {
    //  if (event instanceof NavigationEnd) {
    //    this.history.push(event.urlAfterRedirects);
    //  }
    // });
  }

  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/').then(r => {});
    }
  }

  // moved router subscription to main app.component to ensure it is called for inital page changes

  routeChanged(prevRoute: string, currentRoute: string): void {
    if (!this.history || this.history.length < 1) {
      this.history.push(prevRoute);
    }
    this.history.push(currentRoute);
  }

  isHeaderCollapsed$(): any {
    return this.headerIsCollapsed.asObservable();
  }

  isNavSidePanelExpanded$(): any {
    return this.navSidePanelIsExpanded.asObservable();
  }

  setHeaderCollapsed(isCollapsed: boolean): void {
    this.headerIsCollapsed.next(isCollapsed);
  }

  setNavSidePanelExpanded(isExpanded: boolean): void {
    this.navSidePanelIsExpanded.next(isExpanded);
  }
}
