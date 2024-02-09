import { ComponentRef, Directive, effect, inject, input, ViewContainerRef } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { NG_STORYBLOK_LOADERS } from '@geometricpanda/ng-storyblok/tokens';
import { ISbComponentType } from 'storyblok-js-client/src/interfaces';
import { loadComponentChunk } from '../render';

@Directive({
    selector: 'ng-container[storyblokBlok]',
    standalone: true,
})
export class StoryblokBlokDirective {
    loader = inject(NG_STORYBLOK_LOADERS);
    viewContainerRef = inject(ViewContainerRef);
    previousInstance?: ComponentRef<StoryblokBlok>;

    blok = input.required<ISbComponentType<string>>({ alias: 'storyblokBlok' });

    render = effect(async () => {
        const blok = this.blok();

        const Component = await loadComponentChunk({
            loaders: this.loader,
            blok,
        });

        const instance = this.viewContainerRef.createComponent(Component);
        instance.setInput('blok', blok);

        this.previousInstance?.destroy();
        this.previousInstance = instance;
    });
}