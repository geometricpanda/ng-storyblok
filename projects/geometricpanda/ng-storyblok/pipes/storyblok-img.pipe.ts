import { Pipe, PipeTransform } from '@angular/core';

const regex = /https:\/\/a\.storyblok\.com\/f\/\d+\/(\d+)x(\d+)\//;

export const storyblokImg = (url: string) => {
    const pattern = url.match(regex);

    if (!pattern) {
        console.error(`ngStoryblok: INVALID_IMG_FILENAME
Height and width could not be extracted from the image filename: ${url}.

Is it a valid Storyblok image URL?`);
        throw new Error('ngStoryblok: INVALID_IMG_FILENAME');
    }

    const [, width, height] = pattern;

    return {
        width: +width,
        height: +height,
    };
};

@Pipe({
    name: 'storyblokImgWidth',
    standalone: true,
})
export class StoryblokImgWidthPipe implements PipeTransform {
    transform(value: string): number {
        const { width } = storyblokImg(value);
        return width;
    }
}

@Pipe({
    name: 'storyblokImgHeight',
    standalone: true,
})
export class StoryblokImgHeightPipe implements PipeTransform {
    transform(value: string): number {
        const { height } = storyblokImg(value);
        return height;
    }
}
