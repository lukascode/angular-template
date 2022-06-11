import {AfterViewChecked, ChangeDetectorRef, Component, Renderer2} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  animations: [
    trigger('mobileNavInOut', [
      transition(':enter', [
        style({ 'max-height': 0 }),
        animate('500ms ease',
          style({ 'max-height': '100%'}))
      ]),
      transition(':leave', [
        style({ 'max-height': '100%' }),
        animate('500ms ease',
          style({ 'max-height': 0 }))
      ])
    ])
  ]
})
export class MainNavComponent implements AfterViewChecked {

  // (md && gt-md) media query
  mediaQuery = window.matchMedia('(min-width: 960px)');
  mobileNavHidden = true;

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {
  }

  ngAfterViewChecked() {
    if (this.mediaQuery.matches) {
      this.mobileNavHidden = true;
      this.cdr.detectChanges();
    }
  }

  toggleMobileNav() {
    this.mobileNavHidden = !this.mobileNavHidden;
  }

  toggleDarkMode() {
    const clazz = 'dark-mode';
    if (document.body.classList.contains(clazz)) {
      this.renderer.removeClass(document.body, clazz);
    } else {
      this.renderer.addClass(document.body, clazz);
    }
  }
}