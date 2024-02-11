import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ISbResponseData } from '@geometricpanda/ng-storyblok';
import { ISbResult, ISbStory } from '@storyblok/js';
import { Observable } from 'rxjs';
import { ISbStories } from 'storyblok-js-client/src/interfaces';
import {
    DELETE_CONTEXT,
    DeleteContext,
    GET_ALL_CONTEXT,
    GET_CONTEXT,
    GET_STORIES_CONTEXT,
    GET_STORY_CONTEXT,
    GetAllContext,
    GetContext,
    GetStoriesContext,
    GetStoryContext,
    POST_CONTEXT,
    PostContext,
} from './interceptors';

/**
 * Storyblok service
 * Intercepts Angular HttpClient with the Storyblok API
 * This enables the use of standard Angular HttpClient testing methods
 */

@Injectable({
    providedIn: 'root',
})
export class Storyblok {
    #httpClient = inject(HttpClient);

    public get(slug: string, params: GetContext = {}) {
        const context = new HttpContext().set(GET_CONTEXT, params);
        return this.#httpClient.get<ISbResult>(slug, { context });
    }

    public getAll<T = unknown>(slug: string, params: GetAllContext = {}) {
        const context = new HttpContext().set(GET_ALL_CONTEXT, params);
        return this.#httpClient.get<Array<T>>(slug, { context });
    }

    public post(slug: string, params: PostContext = {}) {
        const context = new HttpContext().set(POST_CONTEXT, params);
        return this.#httpClient.post<ISbResponseData>(slug, params, { context });
    }

    public delete(slug: string, params: DeleteContext = {}): Observable<ISbResponseData> {
        const context = new HttpContext().set(DELETE_CONTEXT, params);
        return this.#httpClient.delete<ISbResponseData>(slug, { context });
    }

    public getStories(params: GetStoriesContext = {}) {
        const context = new HttpContext().set(GET_STORIES_CONTEXT, params);
        return this.#httpClient.get<ISbStories>(`stories`, { context });
    }

    public getStory(slug: string, params: GetStoryContext = {}) {
        const context = new HttpContext().set(GET_STORY_CONTEXT, params);
        return this.#httpClient.get<ISbStory>(slug, { context });
    }
}
