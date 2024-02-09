import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { TransferState, inject, makeStateKey } from '@angular/core';
import { NG_STORYBLOK_CACHE, NG_STORYBLOK_CLIENT } from '@geometricpanda/ng-storyblok/tokens';
import { ISbStory } from '@storyblok/js';
import { from, map, tap } from 'rxjs';
import { ISbResult, ISbStories } from 'storyblok-js-client/src/interfaces';
import {
    DELETE_CONTEXT,
    GET_ALL_CONTEXT,
    GET_CONTEXT,
    GET_STORIES_CONTEXT,
    GET_STORY_CONTEXT,
    POST_CONTEXT,
} from './storyblok.context-token';

export const storyblokInterceptor: HttpInterceptorFn = (req, next) => {
    const storyblok = inject(NG_STORYBLOK_CLIENT);
    const transferState = inject(TransferState);
    const useCache = inject(NG_STORYBLOK_CACHE, { optional: true }) ?? false;
    const getCtx = req.context.get(GET_CONTEXT);
    const getStoryCtx = req.context.get(GET_STORY_CONTEXT);
    const getStoriesCtx = req.context.get(GET_STORIES_CONTEXT);
    const getAllCtx = req.context.get(GET_ALL_CONTEXT);
    const postCtx = req.context.get(POST_CONTEXT);
    const deleteCtx = req.context.get(DELETE_CONTEXT);

    if (getCtx) {
        const key = makeStateKey<ISbResult>(`sb:${req.url}.${JSON.stringify(getCtx)}`);
        const cache = transferState.get(key, null);

        if (useCache && cache) {
            return from([new HttpResponse({ body: cache })]);
        }

        return from(storyblok.get(req.url, getCtx))
            .pipe(tap((story) => useCache && transferState.set(key, story)))
            .pipe(map((story) => new HttpResponse({ body: story })));
    }

    if (getStoryCtx) {
        const key = makeStateKey<ISbStory>(`sb:${req.url}.${JSON.stringify(getStoryCtx)}`);
        const cache = transferState.get(key, null);

        if (useCache && cache) {
            return from([new HttpResponse({ body: cache })]);
        }

        return from(storyblok.getStory(req.url, getStoryCtx))
            .pipe(tap((story) => useCache && transferState.set(key, story)))
            .pipe(map((story) => new HttpResponse({ body: story })));
    }

    if (getStoriesCtx) {
        const key = makeStateKey<ISbStories>(`sb:${req.url}.${JSON.stringify(getStoriesCtx)}`);
        const cache = transferState.get(key, null);

        if (useCache && cache) {
            return from([new HttpResponse({ body: cache })]);
        }

        return from(storyblok.getStories(getStoriesCtx))
            .pipe(tap((stories) => useCache && transferState.set(key, stories)))
            .pipe(map((stories) => new HttpResponse({ body: stories })));
    }

    if (getAllCtx) {
        const key = makeStateKey<Array<unknown>>(`sb:${req.url}.${JSON.stringify(getAllCtx)}`);
        const cache = transferState.get(key, null);

        if (useCache && cache) {
            return from([new HttpResponse({ body: cache })]);
        }

        return from(storyblok.getAll(req.url, getAllCtx))
            .pipe(tap((stories) => useCache && transferState.set(key, stories)))
            .pipe(map((stories) => new HttpResponse({ body: stories })));
    }

    if (postCtx) {
        return from(storyblok.post(req.url, postCtx)).pipe(
            map((story) => new HttpResponse({ body: story })),
        );
    }

    if (deleteCtx) {
        return from(storyblok.delete(req.url, deleteCtx)).pipe(
            map((story) => new HttpResponse({ body: story })),
        );
    }

    return next(req);
};
