import { ComponentRef, Directive, effect, inject, input, ViewContainerRef } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import {
    NG_STORYBLOK_BRIDGE,
    NG_STORYBLOK_FALLBACK_LOADER,
    NG_STORYBLOK_LOADERS,
} from '@geometricpanda/ng-storyblok/tokens';
import { storyblokEditable } from '@storyblok/js';
import { SbBlokData } from '@storyblok/js/dist/types/types';
import { ISbComponentType } from 'storyblok-js-client/src/interfaces';
import { loadComponentChunk } from '../render';

@Directive({
    selector: 'ng-container[storyblokBlok]',
    standalone: true,
})
export class StoryblokBlokDirective {
    fallbackLoader = inject(NG_STORYBLOK_FALLBACK_LOADER);
    loader = inject(NG_STORYBLOK_LOADERS);
    bridge = inject(NG_STORYBLOK_BRIDGE, { optional: true });
    viewContainerRef = inject(ViewContainerRef);
    previousInstance?: ComponentRef<StoryblokBlok>;

    blok = input.required<ISbComponentType<string>>({ alias: 'storyblokBlok' });

    render = effect(async () => {
        const blok = this.blok();

        const Component = await loadComponentChunk({
            fallbackLoader: this.fallbackLoader,
            loaders: this.loader,
            blok,
        });

        const instance = this.viewContainerRef.createComponent(Component);
        instance.setInput('blok', blok);

        this.previousInstance?.destroy();
        this.previousInstance = instance;

        if (this.bridge) {
            const options = storyblokEditable(<SbBlokData>blok);
            instance.location.nativeElement.setAttribute('data-blok-c', options['data-blok-c']);
            instance.location.nativeElement.setAttribute('data-blok-uid', options['data-blok-uid']);
            instance.location.nativeElement.classList.add('storyblok__outline');
        }
    });
}
