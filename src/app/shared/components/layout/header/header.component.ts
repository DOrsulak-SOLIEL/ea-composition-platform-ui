import * as I from '../../../interfaces/common.interface';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { AppUtilityService } from '../../../../core/services/utility.service';
import { IMainNavUIItemState } from '../../../interfaces/common.interface';
import { filter, takeUntil } from 'rxjs/operators';
import { mainNavigationModel } from './state/navigation.state';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header-banner',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class DisaBannerComponent implements OnInit, OnDestroy {
  @Output() navToggle: EventEmitter<any> = new EventEmitter<any>();
  @Input() hasNav = true;
  @Input() hasSmallHeader = false;
  public currentlocation = '';
  avatarSrc: any;
  activeTab = '';
  unreadMessageCount = 0;
  navigation = mainNavigationModel;
  isOpen = true;              // used for nav open/ close
  private destroyed$ = new Subject();

  constructor(
    private utilService: AppUtilityService,
    private router: Router,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(navEvent => {
      if (navEvent && navEvent instanceof NavigationEnd) {
        this.activeTab = this.utilService.getRootURL(navEvent.urlAfterRedirects);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  ngOnInit(): void {
  }


  setUnreadMessageCount(unreadMessageCount: number): void {
    this.unreadMessageCount = unreadMessageCount;
  }

  get navigations(): IMainNavUIItemState[] {
    return this.navigation;
  }

  toggleNav(): void {
    this.isOpen = !this.isOpen;
    this.navToggle.emit(this.isOpen);
  }

  // html function
  iconClasses(item: I.INavigationUIItemState): string {
    return this.utilService.iconClasses(item, false);
  }
}
