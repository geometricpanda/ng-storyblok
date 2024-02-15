import { Component, effect, ElementRef, inject, input, Renderer2, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ISbRichtext, renderRichText } from '@storyblok/js';

@Component({
    selector: 'storyblok-richtext',
    templateUrl: './richtext.component.html',
    standalone: true,
})
export class RichtextComponent {
    domSanitizer = inject(DomSanitizer);
    elementRef = inject(ElementRef<HTMLElement>);
    renderer = inject(Renderer2);

    content = input.required<ISbRichtext>();

    constructor() {
        effect(() => {
            const content = this.content();
            const textContent = renderRichText(content);
            const safeContent = this.domSanitizer.sanitize(SecurityContext.HTML, textContent);

            if (this.elementRef.nativeElement.children.length) {
                for (const child of this.elementRef.nativeElement.children) {
                    this.renderer.removeChild(this.elementRef.nativeElement, child);
                }
            }

            this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', safeContent);
        });
    }
}
