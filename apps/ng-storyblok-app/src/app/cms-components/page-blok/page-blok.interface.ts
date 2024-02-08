import { SbContentBlok, SbNestedBlok } from '@geometricpanda/ng-storyblok/types';
import { BLOK } from '../index';

export interface PageBlok extends SbContentBlok<BLOK.PAGE> {
    body: Array<SbNestedBlok>;
}
