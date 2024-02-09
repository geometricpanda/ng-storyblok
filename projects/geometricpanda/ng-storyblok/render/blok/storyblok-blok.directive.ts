import { Directive, effect, inject, input, ViewContainerRef } from '@angular/core';
import { NG_STORYBLOK_LOADERS } from '@geometricpanda/ng-storyblok/tokens';
import { ISbComponentType } from 'storyblok-js-client/src/interfaces';
import { render } from '../render';

@Directive({
    selector: 'ng-container[storyblokBlok]',
    standalone: true,
})
export class StoryblokBlokDirective {
    loader = inject(NG_STORYBLOK_LOADERS);
    viewContainerRef = inject(ViewContainerRef);

    blok = input.required<ISbComponentType<string>>({ alias: 'storyblokBlok' });

    render = effect(async () => {
        const blok = this.blok();
        const instance = await render({
            viewContainerRef: this.viewContainerRef,
            loaders: this.loader,
            blok,
        });

        instance.setInput('blok', blok);
    });
}
