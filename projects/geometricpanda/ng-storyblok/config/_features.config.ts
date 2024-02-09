import { Provider } from '@angular/core';

/**
 * The list of features as an enum to uniquely type each feature.
 */
export const enum NgStoryblokFeatureKind {
    AccessTokenFeature,
    ApiPluginFeature,
    ApiRegionFeature,
    BlokFeature,
    CacheFeature,
    DefaultPathFeature,
    OAuthTokenFeature,
    NgOptimizedImageFeature,
    PreviewFeature,
}

export type NgStoryblokAccessTokenFeature =
    NgStoryblokFeature<NgStoryblokFeatureKind.AccessTokenFeature>;
export type NgStoryblokApiPluginFeature =
    NgStoryblokFeature<NgStoryblokFeatureKind.ApiPluginFeature>;
export type NgStoryblokApiRegionFeature =
    NgStoryblokFeature<NgStoryblokFeatureKind.ApiRegionFeature>;
export type NgStoryblokBloksFeature = NgStoryblokFeature<NgStoryblokFeatureKind.BlokFeature>;
export type NgStoryblokCacheFeature = NgStoryblokFeature<NgStoryblokFeatureKind.CacheFeature>;
export type NgStoryblokDefaultPathFeature =
    NgStoryblokFeature<NgStoryblokFeatureKind.DefaultPathFeature>;
export type NgStoryblokOAuthTokenFeature =
    NgStoryblokFeature<NgStoryblokFeatureKind.OAuthTokenFeature>;
export type NgStoryblokNgOptimizedImageFeature =
    NgStoryblokFeature<NgStoryblokFeatureKind.NgOptimizedImageFeature>;
export type NgStoryblokPreviewFeature = NgStoryblokFeature<NgStoryblokFeatureKind.PreviewFeature>;

export interface NgStoryblokFeature<FeatureKind extends NgStoryblokFeatureKind> {
    ɵkind: FeatureKind;
    ɵproviders: Provider[];
}

export function createNgSbFeature<FeatureKind extends NgStoryblokFeatureKind>(
    kind: FeatureKind,
    providers: Provider[],
): NgStoryblokFeature<FeatureKind> {
    return {
        ɵkind: kind,
        ɵproviders: providers,
    };
}

export type NgStoryblokFeatures =
    | NgStoryblokAccessTokenFeature
    | NgStoryblokApiPluginFeature
    | NgStoryblokApiRegionFeature
    | NgStoryblokBloksFeature
    | NgStoryblokCacheFeature
    | NgStoryblokDefaultPathFeature
    | NgStoryblokOAuthTokenFeature
    | NgStoryblokNgOptimizedImageFeature
    | NgStoryblokPreviewFeature;
