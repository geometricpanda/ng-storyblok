import { Component, effect, input, signal } from '@angular/core';
import { ISbStory } from '@storyblok/js';
import { StoryblokContentDirective } from '../content';

@Component({
    selector: 'storyblok-root',
    templateUrl: './storyblok-root.component.html',
    standalone: true,
    imports: [StoryblokContentDirective],
})
export class StoryblokRootComponent {
    story = input.required<ISbStory>();
    storyData = signal<undefined | ISbStory>(undefined);

    sync = effect(
        () => {
            const story = this.story();
            this.storyData.set(story);
        },
        { allowSignalWrites: true },
    );
}
