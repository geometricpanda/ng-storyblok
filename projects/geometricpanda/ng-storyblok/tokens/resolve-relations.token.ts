import { InjectionToken } from '@angular/core';
import { ISbStoryParams } from 'storyblok-js-client/src/interfaces';

export const NG_STORYBLOK_RESOLVE_RELATIONS = new InjectionToken<ISbStoryParams['resolve_relations']>(
    'NG_STORYBLOK_RESOLVE_RELATIONS',
);
