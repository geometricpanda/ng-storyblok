import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISbStory } from '@storyblok/js';
import { map } from 'rxjs';
import { StoryblokBlokDirective, StoryblokContentDirective } from '../render';

@Component({
    selector: 'storyblok-root',
    templateUrl: './storyblok-root.component.html',
    standalone: true,
    imports: [StoryblokContentDirective, StoryblokBlokDirective, AsyncPipe],
})
export class StoryblokRootComponent {
    #activatedRoute = inject(ActivatedRoute);
    #data = this.#activatedRoute.data;

    story = this.#data
        .pipe(map((data) => data['story'] as ISbStory))
        .pipe(map((story: ISbStory) => story.data.story));
}
