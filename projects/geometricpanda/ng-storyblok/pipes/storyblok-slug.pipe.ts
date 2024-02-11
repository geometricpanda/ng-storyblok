import { inject, Pipe, PipeTransform } from '@angular/core';
import { NG_STORYBLOK_SLUG_REWRITE } from '@geometricpanda/ng-storyblok/tokens';
import { ISbStoryData } from 'storyblok-js-client/src/interfaces';

@Pipe({
    name: 'storyblokSlug',
    standalone: true,
})
export class StoryblokSlugPipe implements PipeTransform {
    rewrite = inject(NG_STORYBLOK_SLUG_REWRITE, { optional: true });

    transform({ slug }: ISbStoryData): Array<string> {
        const finalSlug = this.rewrite?.toUrl(slug) || slug;
        return finalSlug.split('/');
    }
}

@Pipe({
    name: 'storyblokSlugFragment',
    standalone: true,
})
export class StoryblokSlugFragmentPipe implements PipeTransform {
    transform({ slug }: ISbStoryData): string | undefined {
        const split = slug.split('#');
        return split[1] || undefined;
    }
}
