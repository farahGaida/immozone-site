import { Directive, HostListener, Input, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appNavbarStyle]'
})
export class NavbarStyleDirective {
  @Input() fixedColorRoutes: string[] = [];
  private isScrolled = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!this.isFixedColorRoute()) {
      this.isScrolled = window.scrollY > 50;
      this.updateStyle();
    }
  }

  ngOnInit() {
    this.updateStyle();
    this.router.events.subscribe(() => {
      this.updateStyle();
    });
  }

  private isFixedColorRoute(): boolean {
    return this.fixedColorRoutes.some(route => 
      this.router.url.includes(route)
    );
  }

  private updateStyle() {
    if (this.isFixedColorRoute()) {
      this.applyFixedColorStyle();
    } else {
      this.applyScrollStyle();
    }
  }

  private applyFixedColorStyle() {
    this.renderer.addClass(this.el.nativeElement, 'bg-indigo-600');
    this.renderer.addClass(this.el.nativeElement, 'shadow-lg');
    this.renderer.removeClass(this.el.nativeElement, 'bg-transparent');
  }

  private applyScrollStyle() {
    if (this.isScrolled) {
      this.renderer.addClass(this.el.nativeElement, 'bg-indigo-600');
      this.renderer.addClass(this.el.nativeElement, 'shadow-lg');
      this.renderer.removeClass(this.el.nativeElement, 'bg-transparent');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'bg-transparent');
      this.renderer.removeClass(this.el.nativeElement, 'bg-indigo-600');
      this.renderer.removeClass(this.el.nativeElement, 'shadow-lg');
    }
  }
}