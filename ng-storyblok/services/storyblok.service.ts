import { inject, Injectable } from '@angular/core';
import { NG_STORYBLOK_CLIENT } from '@geometricpanda/ng-storyblok/tokens';
import { ISbContentMangmntAPI, ISbResult, ISbStoriesParams } from '@storyblok/js';
import { first, from, Observable } from 'rxjs';
import { ISbStoryParams } from 'storyblok-js-client/src/interfaces';
import { ISbResponseData } from '../types/storyblok.interface';

@Injectable({
    providedIn: 'root',
})
export class Storyblok {
    #storyblokClient = inject(NG_STORYBLOK_CLIENT);

    public get<T extends ISbResult = ISbResult>(slug: string, params: ISbStoriesParams = {}) {
        const response = this.#storyblokClient.get(slug, params) as Promise<T>;
        return from(response).pipe(first());
    }

    public getAll(slug: string, params: ISbStoriesParams = {}, entity?: string) {
        const response = this.#storyblokClient.getAll(slug, params, entity);
        return from(response).pipe(first());
    }

    public post(slug: string, params: ISbStoriesParams | ISbContentMangmntAPI = {}): Observable<ISbResponseData> {
        const response = this.#storyblokClient.post(slug, params);
        return from(response).pipe(first());
    }

    public delete(slug: string, params: ISbStoriesParams | ISbContentMangmntAPI = {}): Observable<ISbResponseData> {
        const response = this.#storyblokClient.delete(slug, params);
        return from(response).pipe(first());
    }

    public getStories(params: ISbStoriesParams = {}) {
        const response = this.#storyblokClient.getStories(params);
        return from(response).pipe(first());
    }

    public getStory(slug: string, params: ISbStoryParams = {}) {
        const response = this.#storyblokClient.getStory(slug, params);
        return from(response).pipe(first());
    }
}
