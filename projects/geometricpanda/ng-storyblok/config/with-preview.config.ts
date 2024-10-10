import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NG_STORYBLOK_ACCESS_TOKEN, NG_STORYBLOK_PREVIEW, StoryblokPreview } from '@geometricpanda/ng-storyblok/tokens';
import { NgStoryblokFeatureKind, NgStoryblokPreviewFeature, createNgSbFeature } from './_features.config';

export interface ValidateStoryblokPreview {
    spaceId: string;
    accessToken: string;
    timestamp: string;
    token: string;
}

const validateStoryblokPreview = async ({
    spaceId,
    accessToken,
    timestamp,
    token,
}: ValidateStoryblokPreview): Promise<void> => {
    const enc = new TextEncoder();
    const validationString = [spaceId, accessToken, timestamp].join(':');
    const hash = await crypto.subtle.digest('SHA-1', enc.encode(validationString));
    const computed = Array.from(new Uint8Array(hash))
        .map((v) => v.toString(16).padStart(2, '0'))
        .join('');

    if (token !== computed) {
        throw new Error('ngStoryblok: INVALID_PREVIEW_TOKEN');
    }
};

export interface WithPreviewOptions {
    validateToken?: boolean;
    from_release?: string;
}

export function withPreview({ validateToken = true, from_release }: WithPreviewOptions): NgStoryblokPreviewFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.PreviewFeature, [
        {
            provide: NG_STORYBLOK_PREVIEW,
            useValue: <StoryblokPreview>{
                preview: async () => {
                    const router = inject(Router);
                    const accessToken = inject(NG_STORYBLOK_ACCESS_TOKEN);
                    const navigation = router.getCurrentNavigation();

                    if (!navigation) {
                        throw new Error('ngStoryblok: NO_ROUTER_NAVIGATION');
                    }

                    const { queryParams } = navigation.extractedUrl;

                    const release = from_release ?? queryParams['_storyblok_release'];
                    const spaceId = queryParams['_storyblok_tk[space_id]'];
                    const timestamp = queryParams['_storyblok_tk[timestamp]'];
                    const token = queryParams['_storyblok_tk[token]'];

                    try {
                        if (validateToken) {
                            await validateStoryblokPreview({ spaceId, accessToken, timestamp, token });
                        }

                        return {
                            version: 'draft',
                            from_release: release !== '0' ? release : undefined,
                        };
                    } catch (e) {
                        return undefined;
                    }
                },
            },
        },
    ]);
}
