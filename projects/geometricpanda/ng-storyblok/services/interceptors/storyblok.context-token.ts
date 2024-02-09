import { HttpContextToken } from '@angular/common/http';
import { ISbContentMangmntAPI, ISbStoriesParams, ISbStoryParams } from 'storyblok-js-client/src/interfaces';

const noop = () => null;

export type GetStoryContext = ISbStoryParams;
export const GET_STORY_CONTEXT = new HttpContextToken<GetStoryContext | null>(noop);

export type GetStoriesContext = ISbStoriesParams;
export const GET_STORIES_CONTEXT = new HttpContextToken<GetStoriesContext | null>(noop);

export type GetContext = ISbStoriesParams;
export const GET_CONTEXT = new HttpContextToken<GetContext | null>(noop);

export type GetAllContext = ISbStoriesParams;
export const GET_ALL_CONTEXT = new HttpContextToken<GetAllContext | null>(noop);

export type PostContext = ISbStoriesParams | ISbContentMangmntAPI;
export const POST_CONTEXT = new HttpContextToken<PostContext | null>(noop);

export type DeleteContext = ISbStoriesParams | ISbContentMangmntAPI;
export const DELETE_CONTEXT = new HttpContextToken<DeleteContext | null>(noop);
