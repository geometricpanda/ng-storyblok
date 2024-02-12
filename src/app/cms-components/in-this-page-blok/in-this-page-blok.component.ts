import { Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { NG_STORYBLOK_CONTEXT } from '@geometricpanda/ng-storyblok/tokens';
import { NgIcon } from '@ng-icons/core';
import slugify from 'slugify';
import { BLOK } from '../index';
import { TextBlok } from '../text-blok/text-blok.interface';
import { InThisPageBlok } from './in-this-page-blok.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getInThisPage = (acc: Set<string>, block: any): Set<string> => {
    if (!block) {
        return acc;
    }

    if (Array.isArray(block)) {
        block.forEach((item) => getInThisPage(acc, item));
    }

    if (typeof block === 'object') {
        if (block.component === BLOK.TEXT) {
            const textBlok = <TextBlok>block;
            if (textBlok.inThisPage) {
                acc.add(textBlok.content);
            }
        }

        Object.values(block).forEach((child) => getInThisPage(acc, child));
    }

    return acc;
};

@Component({
    selector: 'app-in-this-page-blok',
    templateUrl: './in-this-page-blok.component.html',
    styleUrl: './in-this-page-blok.component.css',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RouterLink, NgIcon],
})
export class InThisPageBlokComponent implements StoryblokBlok<InThisPageBlok> {
    context = inject(NG_STORYBLOK_CONTEXT);
    blok = input.required<InThisPageBlok>();

    links = computed(() => {
        const links = new Set<string>();
        const context = this.context();
        const inThisPage = getInThisPage(links, context.content);
        return [...inThisPage].map((text) => ({ text, fragment: slugify(text, { lower: true }) }));
    });
}
