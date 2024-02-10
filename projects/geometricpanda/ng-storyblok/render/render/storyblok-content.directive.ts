import { ComponentRef, Directive, effect, inject, input, ViewContainerRef } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { NG_STORYBLOK_FALLBACK_LOADER, NG_STORYBLOK_LOADERS } from '@geometricpanda/ng-storyblok/tokens';
import { ISbStoryData } from 'storyblok-js-client/src/interfaces';
import { loadComponentChunk } from '../render';

@Directive({
    selector: 'ng-container[storyblokContent]',
    standalone: true,
})
export class StoryblokContentDirective {
    fallbackLoader = inject(NG_STORYBLOK_FALLBACK_LOADER);
    loader = inject(NG_STORYBLOK_LOADERS);
    viewContainerRef = inject(ViewContainerRef);
    previousInstance?: ComponentRef<StoryblokBlok>;

    blok = input.required<ISbStoryData>({ alias: 'storyblokContent' });

    render = effect(async () => {
        const blok = this.blok();

        const Component = await loadComponentChunk({
            fallbackLoader: this.fallbackLoader,
            loaders: this.loader,
            blok: blok.content,
        });

        const instance = this.viewContainerRef.createComponent(Component);
        instance.setInput('blok', blok);

        this.previousInstance?.destroy();
        this.previousInstance = instance;
    });
}
