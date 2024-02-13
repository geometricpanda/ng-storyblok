import { Component, computed, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';

import hljs from 'highlight.js/lib/core';

import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

import { animate, style, transition, trigger } from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, delay, noop, Subject, switchMap, tap, throttleTime } from 'rxjs';
import { CodeBlok } from './code-blok.interface';

hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', xml);

enum COPIED_STATE {
    HIDE = 'HIDE',
    COPIED = 'COPIED',
    ERROR = 'ERROR',
}

@Component({
    selector: 'app-code-blok',
    templateUrl: './code-blok.component.html',
    styleUrl: './code-blok.component.css',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    animations: [
        trigger('fade', [
            transition('void => *', [style({ opacity: 0 }), animate(150, style({ opacity: 1 }))]),
            transition('* => void', [animate(150, style({ opacity: 0 }))]),
        ]),
    ],
})
export class CodeBlokComponent implements StoryblokBlok<CodeBlok> {
    liveAnnouncer = inject(LiveAnnouncer);

    blok = input.required<CodeBlok>();

    copied = signal<COPIED_STATE>(COPIED_STATE.HIDE);

    COPIED_STATE = COPIED_STATE;

    doCopy = new Subject<void>();
    doCopyAction = this.doCopy
        .pipe(
            takeUntilDestroyed(),
            throttleTime(1000),
            switchMap(() => {
                const blok = this.blok();
                return navigator.clipboard.writeText(blok.code.code);
            }),
            switchMap(() => {
                this.copied.set(COPIED_STATE.COPIED);
                return this.liveAnnouncer.announce('Code copied to clipboard', 'assertive');
            }),
            catchError(() => {
                this.copied.set(COPIED_STATE.ERROR);
                return this.liveAnnouncer.announce('There was en error copying to your clipboard', 'assertive');
            }),
            delay(800),
            tap(() => this.copied.set(COPIED_STATE.HIDE)),
        )
        .subscribe(noop);

    code = computed(() => {
        const blok = this.blok();
        const { code, language } = blok.code;
        return hljs.highlightAuto(code, [language || '']).value;
    });

    copy() {
        this.doCopy.next();
    }
}
