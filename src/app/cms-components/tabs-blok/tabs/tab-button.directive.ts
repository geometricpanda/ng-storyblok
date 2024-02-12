import { FocusableOption } from '@angular/cdk/a11y';
import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
    selector: '[appTabButton]',
    standalone: true,
})
export class TabButtonDirective implements FocusableOption {
    elementRef = inject(ElementRef);

    focus() {
        this.elementRef.nativeElement.focus();
    }
}
