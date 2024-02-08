import { Directive, effect, inject, input, ViewContainerRef } from '@angular/core';
import { NG_STORYBLOK_BLOKS } from '@geometricpanda/ng-storyblok/tokens';
import { ISbStoryData } from 'storyblok-js-client/src/interfaces';
import { render } from '../render';

@Directive({
    selector: 'ng-container[storyblokContent]',
    standalone: true,
})
export class StoryblokContentDirective {
    loader = inject(NG_STORYBLOK_BLOKS);
    viewContainerRef = inject(ViewContainerRef);

    blok = input.required<ISbStoryData>({ alias: 'storyblokContent' });

    render = effect(async () => {
        const blok = this.blok();
        const instance = await render({
            viewContainerRef: this.viewContainerRef,
            loaders: this.loader,
            blok: blok.content,
        });

        instance.setInput('blok', blok);
    });
}
