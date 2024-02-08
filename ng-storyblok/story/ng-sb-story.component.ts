import { Component, input } from '@angular/core';
import { ISbStoryData } from 'storyblok-js-client/src/interfaces';

@Component({
    selector: 'ngsb-story',
    templateUrl: './ng-sb-story.component.html',
    standalone: true,
})
export class NgSbStoryComponent {
    story = input.required<ISbStoryData>();
}
