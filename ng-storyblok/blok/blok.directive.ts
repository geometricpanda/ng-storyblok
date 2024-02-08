import { Directive, effect, input } from '@angular/core';
import { ISbComponentType } from 'storyblok-js-client/src/interfaces';

@Directive({
    selector: '[ngsbBlok]',
    standalone: true,
})
export class NgSbBlokDirective {
    ngsbBlok = input.required<ISbComponentType<string>>();

    render = effect(() => {
        const blok = this.ngsbBlok();
        console.log(blok);
    });
}
