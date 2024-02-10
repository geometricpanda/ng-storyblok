import { Pipe, PipeTransform } from '@angular/core';

export const storyblokSlug = (slug: string) => slug.split('/');
export const storyblokSlugFragment = (slug: string) => {
    const split = slug.split('#');
    return split[1] || undefined;
};

@Pipe({
    name: 'storyblokSlug',
    standalone: true,
})
export class StoryblokSlugPipe implements PipeTransform {
    transform = storyblokSlug;
}

@Pipe({
    name: 'storyblokSlugFragment',
    standalone: true,
})
export class StoryblokSlugFragmentPipe implements PipeTransform {
    transform = storyblokSlugFragment;
}
