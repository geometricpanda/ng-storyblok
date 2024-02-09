import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
    NG_STORYBLOK_ACCESS_TOKEN,
    NG_STORYBLOK_PREVIEW,
    StoryblokPreview,
} from '@geometricpanda/ng-storyblok/tokens';
import {
    NgStoryblokFeatureKind,
    NgStoryblokPreviewFeature,
    createNgSbFeature,
} from './_features.config';

const isValidToken = async (
    spaceId: string,
    previewToken: string,
    timestamp: string,
    token: string,
): Promise<boolean> => {
    const enc = new TextEncoder();
    const validationString = [spaceId, previewToken, timestamp].join(':');
    const hash = await crypto.subtle.digest('SHA-1', enc.encode(validationString));
    const computed = Array.from(new Uint8Array(hash))
        .map((v) => v.toString(16).padStart(2, '0'))
        .join('');

    return token === computed;
};

const storyblokPreview: StoryblokPreview['preview'] = async () => {
    const router = inject(Router);
    const accessToken = inject(NG_STORYBLOK_ACCESS_TOKEN);
    const navigation = router.getCurrentNavigation();

    if (!navigation) {
        throw new Error('ngStoryblok: NO_ROUTER_NAVIGATION');
    }

    const { queryParams } = navigation.extractedUrl;
    const searchParams = new Map(Object.entries(queryParams));

    const release = searchParams.get('_storyblok_release');
    const spaceId = searchParams.get('_storyblok_tk[space_id]');
    const timestamp = searchParams.get('_storyblok_tk[timestamp]');
    const token = searchParams.get('_storyblok_tk[token]');

    if (!release || !spaceId || !timestamp || !token || !release) {
        return undefined;
    }

    if (!(await isValidToken(spaceId, accessToken, timestamp, token))) {
        return undefined;
    }

    return {
        version: 'draft',
        from_release: release !== '0' ? release : undefined,
    };
};

export function withPreview(): NgStoryblokPreviewFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.PreviewFeature, [
        {
            provide: NG_STORYBLOK_PREVIEW,
            useValue: <StoryblokPreview>{
                preview: storyblokPreview,
            },
        },
    ]);
}
