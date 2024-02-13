import { ResolveFn } from '@angular/router';
import { ISbStory } from '@storyblok/js';

export const resolveStory: ResolveFn<ISbStory> = (route) => {
    const storyData = route.data!['ɵNgStoryblokStoryData'];
    return storyData;
};
