import * as I from '../../../interfaces/common.interface';

import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  forHome,
  forResearch
} from './state';

import { AppUtilityService } from '../../../../core/services/utility.service';
import { filter } from 'rxjs/operators';
import { INavigationUIItemState } from '../../../interfaces/common.interface';

@Component({
  selector: 'app-left-hand-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() isSideNavOpen = true;
  lastNavItem: I.INavigationUIItemState | null = null; // used to remember last selection
  lastURL = '';
  isInit = true;
  currentNavTree: I.INavigationUIItemState[] = [];
  lastTabSelection = '';

  constructor(
    public utilService: AppUtilityService,
    public router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(navEvent => {
      if (navEvent && navEvent instanceof NavigationEnd) {
        if (navEvent.urlAfterRedirects !== this.lastURL) {
          this.lastURL = navEvent.urlAfterRedirects;
          if (this.lastTabSelection !== this.utilService.getRootURL(this.lastURL)) {
            this.setNavigations();
            this.lastTabSelection = this.utilService.getRootURL(this.lastURL);
          }
          this.navChangeSetup();
        }
      }
    });
  }

  ngOnInit(): void {
    if (!this.lastURL && this.router && this.router.url) {
      this.lastURL = this.router.url;
      this.setNavigations();
      this.navChangeSetup();
      this.lastTabSelection = this.utilService.getRootURL(this.lastURL);
    }
  }

  // sets all the values needed for sidebar to get correct info
  navChangeSetup(): void {
    this.collapseAllExcept(this.currentNavTree, this.findSelectedItemFromHref(this.currentNavTree, this.lastURL));
    const item = this.findSelectedItemFromHref(this.currentNavTree, this.lastURL);
    const parent = this.getParent(item);
    if (this.isInit && item && parent?.initalStateClosed) {
      parent.expanded = false;
      this.collapseAllExcept(this.currentNavTree, null);
    }
    this.lastNavItem = item;
    this.scrollToLocation(item);
  }

  // checks selected from root-> children
  parentHasExpanded(item: I.INavigationUIItemState): boolean {
    let foundExpanded = false;
    if (item && item.expanded) {
      return true;
    }
    if (item && item.childItems && item.childItems.length > 0) {
      item.childItems.forEach((child) => {
        if (child.expanded === true) {
          foundExpanded = true;
        } else if (child.childItems && !foundExpanded) {
          foundExpanded = this.parentHasExpanded(child);
        }
      });
    }
    return foundExpanded;
  }

  getParent(item?: I.INavigationUIItemState | null): I.INavigationUIItemState | null {
    if (item && item.parent) {
      return this.getParent(item.parent);
    }
    return item || null;
  }

  // When we dont received selected item from nav bar we need to search from URL
  findSelectedItemFromHref(tree: I.INavigationUIItemState[], selectedHref: string): I.INavigationUIItemState | null {
    let foundSelectedItem: I.INavigationUIItemState | null = null;
    if (tree && selectedHref) {
      tree.forEach((item: I.INavigationUIItemState) => {
        if (item) {
          if ((item.href === selectedHref || (item.alternateHref && item.alternateHref.indexOf(selectedHref) !== -1)) && !item.homeless) {
            foundSelectedItem = item;
          } else if (item.childItems && item.childItems.length > 0) {
            const foundItem = this.findSelectedItemFromHref(item.childItems, selectedHref);
            if (foundItem) {
              foundSelectedItem = foundItem;
            }
          }
          return foundSelectedItem;
        }
        return null;
      });
    }
    return foundSelectedItem;
  }

  // sets expanded from root (parent)-> child(parent) -> selected child
  setParentsExpanded(parentItem: I.INavigationUIItemState | null, selectedItem: I.INavigationUIItemState
    | null): I.INavigationUIItemState | null {
    if (parentItem && selectedItem && this.parentHasExpanded(parentItem)) {
      parentItem.expanded = true;
      parentItem.childItemsVisible = true;
      if (parentItem.childItems) {
        parentItem.childItems.forEach((childItem: any, i: number) => {
          if (parentItem.childItems) {
            parentItem.childItems[i] = (this.setParentsExpanded(childItem, selectedItem) as INavigationUIItemState);
          }
        });
      }
    }
    return parentItem || null;
  }

  // collapses all items except for param 2 parents
  collapseAllExcept(tree: I.INavigationUIItemState[], except: I.INavigationUIItemState | null): I.INavigationUIItemState[] | null {
    if (tree && except) {
      return tree.map((item: I.INavigationUIItemState) => {
        if (item && except) {
          if ((!this.isParent(item, except) || (item.initalStateClosed && this.isInit)) && item.name !== except.name) {
            item.expanded = false;
            item.childItemsVisible = false;
          }
          if (item.childItems) {
            item.childItems = this.collapseAllExcept(item.childItems, except);
          }
        }
        return item;
      });
    }
    return null;
  }

  // find out if param 1 (parent) is a parent of param 2 (item)
  isParent(parent: I.INavigationUIItemState, item: I.INavigationUIItemState): boolean {
    if (item && item.parent && parent) {
      if (item.parent.name === parent.name) {
        return true;
      } else if (item.parent) {
        return this.isParent(parent, item.parent);
      }
    }
    return false;
  }

  // html function
  // holds expand/ collapse toggle logic from link selection
  onNavChange(item: I.INavigationUIItemState | null): void {
    this.isInit = false;
    const lastNavItem = this.lastNavItem;
    if (item) {
      // only toggle expanded for nav links that are homeless (no navigation page)
      if (item.homeless) {
        item.expanded = !item.expanded;
        item.childItemsVisible = !item.childItemsVisible;
      } else {
        // for scroll to work, <component>.ts file must have matching value after
        // # to the active page's html id attribute on a <div>
        if ((lastNavItem && item.href === lastNavItem.href) || item.href?.indexOf('#') !== -1) {
          if (item.href !== this.router.url) {
            this.router.navigateByUrl(item.href || '');
          }
          this.scrollToLocation(item);
        }
        // if most recent side selection matches previous selection, just toggle expanded
        if ((lastNavItem && lastNavItem.name === item.name) || item.homeless) {
          item.expanded = !item.expanded;
          item.childItemsVisible = !item.childItemsVisible;
        } else if (!lastNavItem || lastNavItem.name !== item.name) {
          this.collapseAllExcept(this.currentNavTree, item);
          item.expanded = true;
          item.childItemsVisible = true;
          // make sure we dont have open children with closed parents
          this.setParentsExpanded(this.getParent(item), item);
        }
      }
      this.lastNavItem = item;
    }
  }

  // if we need to scroll, we use hash (#) to designate location from url/ href
  scrollToLocation(item: I.INavigationUIItemState | null): void {
    if (item && item.href && item.href.indexOf('#') !== -1) {
      const i = item.href.indexOf('#');
      const scrollLocation = item.href.substring(i + 1, item.href.length);
      const dom = document.getElementById(scrollLocation);
      if (dom) {
        dom.scrollIntoView();
      }
    }
  }

  // this is the main nav data entry point
  setNavigations(): void {
    this.getNavigationOf(this.utilService.getRootURL(this.lastURL));
  }

  // html function
  get visible(): boolean {
    return this.currentNavTree && this.currentNavTree.length > 0;
  }

  // html function
  hasChildItems(item: I.INavigationUIItemState): boolean {
    if (item.childItems && item.childItems.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  // html function
  iconClasses(item: I.INavigationUIItemState): string {
    return this.utilService.iconClasses(item, false);
  }

  // html function
  iconDownArrow(item: I.INavigationUIItemState): I.IIconUIState {
    const cssClasses: I.IIconUIState = {fa: true, 'fa-lg-1': true};
    cssClasses['fa-angle-down'] = true;

    if (item.color) {
      cssClasses['text-' + item.color] = true;
    }
    return cssClasses;
  }

  // html function
  isLinkEnabled(item: I.INavigationUIItemState): boolean {
    return true;
  }

  private getNavigationOf(name: string): void {
    // some urls pass # for scroll position, that is not relevant when returning side panel link items
    name = name.toLowerCase().split('#')[0];
    switch (name) {
      case 'home': {
        this.currentNavTree = this.onParent(forHome);
        return;
      }
      case 'research': {
        this.currentNavTree = this.onParent(forResearch);
        return;
      }
      default: {
        this.currentNavTree = this.onParent(forHome);
        return;
      }
    }
  }

  private onParent(item: I.INavigationUIItemState[]): I.INavigationUIItemState[] {
    const returnItems: I.INavigationUIItemState[] = [];
    if (item) {
      item.forEach(x => {
        const returnItem: I.INavigationUIItemState = {...x};
        returnItem.parent = null;
        if (returnItem.childItems) {
          this.parentNodeHelper(returnItem, returnItem.childItems);
        }
        returnItems.push(returnItem);
      });
    }
    return returnItems;
  }

  private parentNodeHelper(parent: I.INavigationUIItemState, children: I.INavigationUIItemState[]): void {
    (children || []).forEach(x => {
      x.parent = Object.assign({}, parent);
      x.parent.childItems = [];
      if (x.childItems) {
        this.parentNodeHelper(x, x.childItems);
      }
    });
  }
}
