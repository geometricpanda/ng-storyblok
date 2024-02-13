import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';
import { afterNextRender, Component, effect, input, QueryList, signal, ViewChildren } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';
import { StoryblokBlokDirective } from '@geometricpanda/ng-storyblok/render';
import { TabBlokComponent } from '../tab';
import { TabButtonDirective } from './tab-button.directive';
import { TabsBlok } from './tabs-blok.interface';

@Component({
    selector: 'app-tabs-blok',
    templateUrl: './tabs-blok.component.html',
    styleUrl: './tabs-blok.component.css',
    standalone: true,
    imports: [TabBlokComponent, StoryblokBlokDirective, TabButtonDirective],
})
export class TabsBlokComponent implements StoryblokBlok<TabsBlok> {
    @ViewChildren(TabButtonDirective)
    buttonElements?: QueryList<TabButtonDirective>;

    fkm?: FocusKeyManager<FocusableOption>;

    blok = input.required<TabsBlok>();
    activeTabId = signal<string | undefined>(undefined);

    onBlokChange = effect(
        () => {
            const blok = this.blok();
            if (blok.children.length > 0) {
                const [first] = blok.children;
                this.activeTabId.set(first._uid);
            }
        },
        {
            allowSignalWrites: true,
        },
    );

    constructor() {
        afterNextRender(() => {
            this.fkm = new FocusKeyManager(this.buttonElements!);
            this.fkm.updateActiveItem(0);
            this.fkm.withHorizontalOrientation('ltr');
        });
    }

    syncFocus(index: number) {
        this.fkm?.updateActiveItem(index);
    }

    setActiveTab(tab: string, index: number) {
        this.activeTabId.set(tab);
        this.fkm?.updateActiveItem(index);
    }
}
