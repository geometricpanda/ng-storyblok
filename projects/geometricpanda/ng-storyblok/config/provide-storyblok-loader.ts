import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

import { Provider, isDevMode } from '@angular/core';

const ngDevMode = isDevMode();

/** Taken from https://github.com/angular/angular/blob/main/packages/common/src/directives/ng_optimized_image/url.ts */

export type ImageLoaderInfo = {
    name: string;
    testUrl: (url: string) => boolean;
};

export function isAbsoluteUrl(src: string): boolean {
    return /^https?:\/\//.test(src);
}

/** End of Taken from https://github.com/angular/angular/blob/main/packages/common/src/directives/ng_optimized_image/url.ts */

/**
 * Name and URL tester for Netlify.
 */
export const StoryblokLoaderInfo: ImageLoaderInfo = {
    name: 'Storyblok',
    testUrl: isStoryblokUrl,
};

const STORYBLOK_LOADER_REGEX = /https?:\/\/a.storyblok\.com\/.+/;

/**
 * Tests whether a URL is from the Storyblok Asset CDN. This won't catch sites with a custom domain,
 * but it's a good start for sites in development. This is only used to warn users who haven't
 * configured an image loader.
 */
function isStoryblokUrl(url: string): boolean {
    return STORYBLOK_LOADER_REGEX.test(url);
}

interface ProvideStoryblokLoaderProps {
    quality?: number;
}

/**
 * Function that generates an ImageLoader for Storyblok and turns it into an Angular provider.
 *
 * @param options - Configuration options for the Storyblok loader.
 */
export function provideStoryblokLoader(options?: ProvideStoryblokLoaderProps): Array<Provider> {
    const loaderFn = (config: ImageLoaderConfig) => {
        const url = createStoryblokUrl(config, options);
        console.log('image-url', url);
        return url;
    };

    return [
        {
            provide: IMAGE_LOADER,
            useValue: loaderFn,
        },
    ];
}

// The radius of the blur to apply to the image, between 0  and 150
type BlurRadius = number;
// The sigma value to use in Gaussian blur.
type BlurSigma = number;

// The rounded corners to apply to the image
type RoundedRadius = number;
// RGB color to use for the rounded corners
type RoundedRgb = [number, number, number];
// Opacity of the rounded corners
type RoundedOpacity = number;

export interface StoryblokImageLoaderParams {
    // The format to convert the image to.
    format?: 'webp' | 'png' | 'jpeg';
    // The quality of the image, from 0 to 100
    quality?: number;
    // Whether to convert the image to greyscale.
    greyscale?: boolean;
    // The amount of blur to apply to the image. Use second value for sigma to use in Gaussian blur.
    blur?: BlurRadius | [BlurRadius, BlurSigma];
    // The amount to rotate the image, in degrees.
    rotate?: 90 | 180 | 270;
    // Whether to flip the image horizontally, vertically, or both.
    flip?: 'horizontal' | 'vertical' | 'both';
    // The brightness of the image, from -100 to 100
    brightness?: number;
    // The rounded corners to apply to the image
    rounded?: RoundedRadius | [RoundedRadius, RoundedRgb] | [RoundedRadius, RoundedRgb, RoundedOpacity];
}

function createStoryblokUrl(config: ImageLoaderConfig, options: ProvideStoryblokLoaderProps = {}): string {
    try {
        // Note: `src` can be undefined, in which case we throw an error, which will return the original URL.
        const url = new URL(config.src);

        if (url.pathname.endsWith('.svg') || !config.width) {
            // If we try and perform Image CDN operations an SVG, storyblok will try and format it as WEBP
            return config.src;
        }

        const loaderParams = <StoryblokImageLoaderParams | undefined>config.loaderParams;

        const width =
            loaderParams?.flip === 'horizontal' || loaderParams?.flip === 'both' ? config.width * -1 : config.width;

        const height = loaderParams?.flip === 'vertical' || loaderParams?.flip === 'both' ? '-0' : '0';

        url.pathname = `${url.pathname}/m/${width}x${height}`;

        // Filters

        const filters = new Map();

        if (loaderParams?.quality) {
            filters.set('quality', loaderParams.quality);
        } else if (options.quality) {
            filters.set('quality', options.quality);
        }

        if (loaderParams?.format) {
            filters.set('format', loaderParams.format);
        }

        if (loaderParams?.greyscale) {
            filters.set('greyscale', '');
        }

        if (loaderParams?.blur) {
            Array.isArray(loaderParams.blur)
                ? filters.set('blur', loaderParams.blur.join(','))
                : filters.set('blur', loaderParams.blur);
        }

        if (loaderParams?.rotate) {
            filters.set('rotate', loaderParams.rotate);
        }

        if (loaderParams?.flip) {
            filters.set('flip', loaderParams.flip);
        }

        if (loaderParams?.brightness) {
            filters.set('brightness', loaderParams.brightness);
        }

        if (loaderParams?.rounded) {
            if (Array.isArray(loaderParams.rounded)) {
                const [radius, rgb, alpha] = loaderParams.rounded;

                // Storyblok uses a 0-1 scale for transparency, so we need to invert it for alpha to make sense.
                const transparency = alpha ? 1 - alpha : 1;
                const rgbValue = rgb || [255, 255, 255];
                filters.set('round_corner', `${[radius, rgbValue, transparency]}`);
            } else {
                const radius = loaderParams.rounded;
                const rgbValue = [255, 255, 255];
                filters.set('round_corner', `${[radius, rgbValue, 1]}`);
            }
        }

        const filterString = Array.from(filters.entries())
            .map(([key, value]) => `${key}(${value})`)
            .join(':');

        url.pathname = `${url.pathname}/filters:${filterString}`;

        return url.toString();
    } catch (e) {
        if (ngDevMode && isAbsoluteUrl(config.src)) {
            console.error(
                `Image loader has detected an invalid absolute path (\`${config.src}\`). ` +
                    `To fix this, please ensure that the path is a valid Storyblok asset URL. `,
            );
        }
    }
    return config.src;
}
