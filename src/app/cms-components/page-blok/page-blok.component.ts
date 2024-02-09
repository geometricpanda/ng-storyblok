import { JsonPipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { StoryblokBlokDirective } from '@geometricpanda/ng-storyblok/render';
import { PageBlok } from './page-blok.interface';

@Component({
    selector: 'app-page-blok',
    templateUrl: './page-blok.component.html',
    styleUrl: './page-blok.component.css',
    standalone: true,
    imports: [StoryblokBlokDirective, JsonPipe],
})
export class PageBlokComponent implements StoryblokBlok<PageBlok>, OnInit {
    title = inject(Title);

    blok = input.required<PageBlok>();

    ngOnInit() {
        this.title.setTitle(this.blok().name);
    }
}
