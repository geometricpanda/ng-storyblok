import type { ISbLinkURLObject } from 'storyblok-js-client';

interface ISbLinked {
    id: string;
    anchor?: string;
    fieldtype: 'multilink';
    cached_url: string;
    target?: string;
}

export interface ISbLinkedDocument<T = ISbLinkURLObject> extends ISbLinked {
    linktype: 'story';
    story?: T;
}

export interface ISbLinkedUrl extends ISbLinked {
    linktype: 'url';
    href: string;
    target?: string;
}
