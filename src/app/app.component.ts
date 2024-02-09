import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoryblokBlokDirective } from '@geometricpanda/ng-storyblok/render';
import { Storyblok } from '@geometricpanda/ng-storyblok/services';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [RouterModule, StoryblokBlokDirective],
    styleUrl: './app.component.css',
})
export class AppComponent {
    storyblok = inject(Storyblok);
}
