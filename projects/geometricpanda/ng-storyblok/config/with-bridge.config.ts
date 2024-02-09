import { NG_STORYBLOK_BRIDGE } from '@geometricpanda/ng-storyblok/tokens';
import { createNgSbFeature, NgStoryblokBridgeFeature, NgStoryblokFeatureKind } from './_features.config';

export function withBridge(): NgStoryblokBridgeFeature {
    return createNgSbFeature(NgStoryblokFeatureKind.BridgeFeature, [
        {
            provide: NG_STORYBLOK_BRIDGE,
            useValue: true,
        },
    ]);
}
