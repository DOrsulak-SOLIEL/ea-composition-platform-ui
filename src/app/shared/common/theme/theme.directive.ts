import { Directive, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Theme } from './symbols';
import { ThemesService } from './themes.service';

@Directive({
  selector: '[appTheme]',
})
export class ThemeDirective implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  previousTheme = '';

  constructor(
    private elementRef: ElementRef,
    private themeService: ThemesService,
  ) {}

  ngOnInit(): void {
    this.themeService.getActiveTheme().pipe(takeUntil(this.destroy$))
      .subscribe((theme: Theme) => {
        this.updateTheme(theme);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  updateTheme(theme: Theme): void {
    // project properties onto the element
    for (const key in theme.properties) {
      if (theme.properties.hasOwnProperty(key)) {
        this.elementRef.nativeElement.style.setProperty(key, theme.properties[key]);
      }
    }
  }

}
