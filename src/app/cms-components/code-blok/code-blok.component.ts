import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { StoryblokBlok } from '@geometricpanda/ng-storyblok';

import hljs from 'highlight.js/lib/core';

import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

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
    host: {
        // ['[class.code-blok]']: 'true',
    },
})
export class CodeBlokComponent implements StoryblokBlok<CodeBlok> {
    blok = input.required<CodeBlok>();

    code = computed(() => {
        const blok = this.blok();
        const { code, language } = blok.code;
        return hljs.highlightAuto(code, [language || '']).value;
    });

    async copy() {
        const blok = this.blok();
        const { code } = blok.code;
        await navigator.clipboard.writeText(code);
    }
}
