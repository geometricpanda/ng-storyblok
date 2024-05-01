import { Provider } from '@angular/core';

/**
 * The list of features as an enum to uniquely type each feature.
 */
export const enum NgStoryblokFeatureKind {
    AccessTokenFeature,
    ApiPluginFeature,
    ApiRegionFeature,
    ApiEndpointFeature,
    ApiHeadersFeature,
    ApiFetcherFeature,
    BlokFeature,
    CacheFeature,
    DefaultPathFeature,
    OAuthTokenFeature,
    NgOptimizedImageFeature,
    PreviewFeature,
    ResolveRelationsFeature,
    ResolveLinksFeature,
    BridgeFeature,
    TitleTemplateFeature,
    SlugRewriteFeature,
}

export type NgStoryblokAccessTokenFeature = NgStoryblokFeature<NgStoryblokFeatureKind.AccessTokenFeature>;
export type NgStoryblokApiPluginFeature = NgStoryblokFeature<NgStoryblokFeatureKind.ApiPluginFeature>;
export type NgStoryblokApiRegionFeature = NgStoryblokFeature<NgStoryblokFeatureKind.ApiRegionFeature>;
export type NgStoryblokApiEndpointFeature = NgStoryblokFeature<NgStoryblokFeatureKind.ApiEndpointFeature>;
export type NgStoryblokApiHeadersFeature = NgStoryblokFeature<NgStoryblokFeatureKind.ApiHeadersFeature>;
export type NgStoryblokApiFetcherFeature = NgStoryblokFeature<NgStoryblokFeatureKind.ApiFetcherFeature>;
export type NgStoryblokBloksFeature = NgStoryblokFeature<NgStoryblokFeatureKind.BlokFeature>;
export type NgStoryblokCacheFeature = NgStoryblokFeature<NgStoryblokFeatureKind.CacheFeature>;
export type NgStoryblokDefaultPathFeature = NgStoryblokFeature<NgStoryblokFeatureKind.DefaultPathFeature>;
export type NgStoryblokOAuthTokenFeature = NgStoryblokFeature<NgStoryblokFeatureKind.OAuthTokenFeature>;
export type NgStoryblokNgOptimizedImageFeature = NgStoryblokFeature<NgStoryblokFeatureKind.NgOptimizedImageFeature>;
export type NgStoryblokPreviewFeature = NgStoryblokFeature<NgStoryblokFeatureKind.PreviewFeature>;
export type NgStoryblokResolveRelationsFeature = NgStoryblokFeature<NgStoryblokFeatureKind.ResolveRelationsFeature>;
export type NgStoryblokResolveLinksFeature = NgStoryblokFeature<NgStoryblokFeatureKind.ResolveLinksFeature>;
export type NgStoryblokBridgeFeature = NgStoryblokFeature<NgStoryblokFeatureKind.BridgeFeature>;
export type NgStoryblokTitleTemplateFeature = NgStoryblokFeature<NgStoryblokFeatureKind.TitleTemplateFeature>;
export type NgStoryblokSlugRewriteFeature = NgStoryblokFeature<NgStoryblokFeatureKind.SlugRewriteFeature>;

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
    | NgStoryblokApiEndpointFeature
    | NgStoryblokBloksFeature
    | NgStoryblokCacheFeature
    | NgStoryblokDefaultPathFeature
    | NgStoryblokOAuthTokenFeature
    | NgStoryblokNgOptimizedImageFeature
    | NgStoryblokPreviewFeature
    | NgStoryblokResolveRelationsFeature
    | NgStoryblokResolveLinksFeature
    | NgStoryblokBridgeFeature
    | NgStoryblokTitleTemplateFeature
    | NgStoryblokSlugRewriteFeature
    | NgStoryblokApiHeadersFeature
    | NgStoryblokApiFetcherFeature;
