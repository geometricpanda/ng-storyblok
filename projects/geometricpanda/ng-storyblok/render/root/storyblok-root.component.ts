import { Component, input } from '@angular/core';
import { ISbStory } from '@storyblok/js';
import { StoryblokContentDirective } from '../render';

@Component({
    selector: 'storyblok-root',
    templateUrl: './storyblok-root.component.html',
    standalone: true,
    imports: [StoryblokContentDirective],
})
export class StoryblokRootComponent {
    story = input.required<ISbStory>();
}
