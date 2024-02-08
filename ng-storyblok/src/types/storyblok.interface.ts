import { ISbStoryData } from 'storyblok-js-client/src/interfaces';

export interface ISbResponseData {
    link_uuids: string[];
    links: string[];
    rel_uuids: string[];
    rels: any;
    story: ISbStoryData;
    stories: Array<ISbStoryData>;
}
