import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  AfterViewChecked,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NavigationService } from '../../../../core/services/navigation.service';
import { ThemesService } from '../../../common/theme';

@Component({
  selector: 'app-layout',
  templateUrl: 'app-layout.component.html',
  styleUrls: ['app-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppLayoutComponent implements OnInit, OnDestroy, AfterViewChecked {
  disclaimerAccepted = false;
/*  currentCompRef = null;
  showModalDlg = false;
  isLoggingOut = false;
  showSessionTimeoutWnd = this.authService.sessionModalSubject$;
  disclaimRoute = false;*/
  hasSmallHeader = false;
  run = 0;
  isSideNavOpen = true;
  contentMargin = 0;
  currentURL = '';
  subscription?: Subscription;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private themeService: ThemesService) {
    // this.disclaimRoute = this.activeRoute.snapshot.routeConfig.path !== 'disclaimer';
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(navEvent => {
      if (navEvent && navEvent instanceof NavigationEnd) {
        if (navEvent.urlAfterRedirects !== this.currentURL) {
          const prevURL = this.currentURL;
          this.currentURL = this.router.url;
          // Force modal body to scroll to top of container DIV
          const dom = document.getElementById('topOfPage');
          if (dom) {
            dom.scrollIntoView();
          }
        }
      }
    });
  }

  scrollEvent = (event: any): void => {
    const headerAndFooterHeight = 175;
    const browserHeight = window.innerHeight;
    const actualScreenHeight = browserHeight - headerAndFooterHeight;
    const contentScrollBarHeight = event.target?.scrollHeight;
    const contentOutOfview = contentScrollBarHeight - actualScreenHeight;
    const percentageOutOfView = contentOutOfview / contentScrollBarHeight;
    if (event.target.localName === 'mat-sidenav-content') {
      // if we have scrolled at least 110 pixels down and content length is at least double the screen view size, then minimize header
      // This is done to avoid a 'jumpy' behavior when header size doesnt really need to reduce.
      if (event.target.scrollTop > 110 && percentageOutOfView >= .50) {
        this.hasSmallHeader = true;
        this.navigationService.setHeaderCollapsed(this.hasSmallHeader);
      } else if (event.target.scrollTop < 50) {
        this.hasSmallHeader = false;
        this.navigationService.setHeaderCollapsed(this.hasSmallHeader);
      }
    }
  };

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrollEvent, true);
    this.isSideNavOpen = this.currentURL !== '/login/dashboard';
    this.navigationService.setNavSidePanelExpanded(this.isSideNavOpen);
    this.contentMargin = 185;
  }

  ngAfterViewChecked(): void {
  }

  onSideNavToggled(): void {
    this.isSideNavOpen = !this.isSideNavOpen;
    this.navigationService.setNavSidePanelExpanded(this.isSideNavOpen);
    if (!this.isSideNavOpen) {
      this.contentMargin = 0;
    } else {
      this.contentMargin = 185;
    }
  }

  canDeactivate(): void {
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollEvent, true);
  }
}
