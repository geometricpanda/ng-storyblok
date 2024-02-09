import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import {
    NgStoryblokFeatureKind,
    NgStoryblokNgOptimizedImageFeature,
    createNgSbFeature,
} from './_features.config';

export interface NgOptimizedImageConfig {
    quality?: number;
}

export function withNgOptimisedImage({
    quality = 75,
}: NgOptimizedImageConfig = {}): NgStoryblokNgOptimizedImageFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.NgOptimizedImageFeature, [
        {
            provide: IMAGE_LOADER,
            useValue: (config: ImageLoaderConfig) => {
                if (config.src.startsWith('https://a.storyblok.com')) {
                    return config.width
                        ? `${config.src}/m/${config.width}x0/filters:quality(${quality})`
                        : `${config.src}/m/0x0/filters:quality(${quality})`;
                }

                return config.src;
            },
        },
    ]);
}
