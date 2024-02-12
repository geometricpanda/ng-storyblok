import { Component, computed, effect, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';

import hljs from 'highlight.js/lib/core';

import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

import { animate, style, transition, trigger } from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CodeBlok } from './code-blok.interface';

hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', xml);

@Component({
    selector: 'app-code-blok',
    templateUrl: './code-blok.component.html',
    styleUrl: './code-blok.component.css',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    animations: [
        trigger('fade', [
            transition('void => *', [style({ opacity: 0 }), animate(300, style({ opacity: 1 }))]),
            transition('* => void', [animate(300, style({ opacity: 0 }))]),
        ]),
    ],
})
export class CodeBlokComponent implements StoryblokBlok<CodeBlok> {
    liveAnnouncer = inject(LiveAnnouncer);

    blok = input.required<CodeBlok>();

    copied = signal(false);
    copiedError = signal(false);

    onCopied = effect(
        () => {
            const copied = this.copied();
            if (copied) {
                setTimeout(() => this.copied.set(false), 1000);
            }
        },
        { allowSignalWrites: true },
    );

    onCopiedError = effect(
        () => {
            const copiedError = this.copiedError();
            if (copiedError) {
                setTimeout(() => this.copiedError.set(false), 1500);
            }
        },
        { allowSignalWrites: true },
    );

    code = computed(() => {
        const blok = this.blok();
        const { code, language } = blok.code;
        return hljs.highlightAuto(code, [language || '']).value;
    });

    async copy() {
        const blok = this.blok();
        const { code } = blok.code;
        try {
            await navigator.clipboard.writeText(code);
            this.copied.set(true);
            await this.liveAnnouncer.announce('Code copied to clipboard', 'assertive');
        } catch (error) {
            this.copiedError.set(true);
            await this.liveAnnouncer.announce('There was en error copying to your clipboard', 'assertive');
        }
    }
}
