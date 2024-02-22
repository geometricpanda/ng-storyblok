import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { NG_STORYBLOK_TITLE_TEMPLATE } from '@geometricpanda/ng-storyblok/tokens';

export const resolveTitle: ResolveFn<string> = async (route) => {
    const storyData = route.data!['ɵNgStoryblokStoryData'];
    const titleTemplate = inject(NG_STORYBLOK_TITLE_TEMPLATE, { optional: true });

    if (!titleTemplate) {
        return storyData.data.story.name;
    }

    const { template, render, env, cb } = titleTemplate;
    return render(template, storyData.data.story, env, cb);
};
