import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Storyblok } from '@geometricpanda/ng-storyblok/services';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [RouterModule],
    styleUrl: './app.component.css',
})
export class AppComponent {
    storyblok = inject(Storyblok);
}
