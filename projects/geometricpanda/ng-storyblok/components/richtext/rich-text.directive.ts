import { Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { ISbLinkedDocument, ISbLinkedUrlRichText } from '@geometricpanda/ng-storyblok';
import { NG_STORYBLOK_SLUG_REWRITE } from '@geometricpanda/ng-storyblok/tokens';
import type { ISbRichtext } from 'storyblok-js-client';

const enableResolveLinksErr = `ngStoryblok Rich Text Directive:
Unable to create link. Please enable ngStoryblok with "withResolveLinks('story')"`;

interface DocumentNode {
    type: string;
    content?: DocumentNode[];
    attrs?: Record<string, string>;
    marks?: MarkNode[];
    text?: string;
}

export interface MarkNode {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attrs?: any;
}

enum NodeType {
    CODE_BLOCK = 'code_block',
    HARD_BREAK = 'hard_break',
    PARAGRAPH = 'paragraph',
    HORIZONTAL_RULE = 'horizontal_rule',
    HEADING = 'heading',
    IMAGE = 'image',
    ORDERED_LIST = 'ordered_list',
    BULLET_LIST = 'bullet_list',
    LIST_ITEM = 'list_item',
    QUOTE = 'blockquote',
    EMOJI = 'emoji',
    TEXT = 'text',
    BLOK = 'blok',
}

enum MarkType {
    BOLD = 'bold',
    ITALIC = 'italic',
    STRIKE = 'strike',
    LINK = 'link',
    ANCHOR = 'anchor',
    SUPERSCRIPT = 'superscript',
    SUBSCRIPT = 'subscript',
    CODE = 'code',
    HIGHLIGHT = 'highlight',
    TEXT_STYLE = 'textStyle',
    UNDERLINE = 'underline',
}

@Directive({
    selector: '[storyblokRichText]',
    standalone: true,
})
export class RichTextRendererDirective {
    el = inject(ElementRef);
    renderer = inject(Renderer2);
    slugToUrl = inject(NG_STORYBLOK_SLUG_REWRITE, { optional: true })?.toUrl;

    storyblokRichText = input.required<ISbRichtext>();

    onChange = effect(() => {
        const doc = this.storyblokRichText();
        this.el.nativeElement.innerHTML = '';

        if (!doc.content) {
            return;
        }

        doc.content
            .map((node) => this.renderNode(node))
            .forEach((node) => this.renderer.appendChild(this.el.nativeElement, node));
    });

    private renderNode(node: DocumentNode): HTMLElement | Text | null {
        if (node.type === NodeType.TEXT && node.text) {
            const text = this.renderer.createText(node.text);
            return node.marks ? this.applyMarks(text, node.marks) : text;
        }

        if (node.type === NodeType.BLOK) {
            console.warn(new Error(`Rendering of bloks is not currently supported`));
            return null;
        }

        const element = this.createElement(node);

        if (!node.content) {
            return element;
        }

        node.content
            .map((child) => this.renderNode(child))
            .forEach((child) => child && this.renderer.appendChild(element, child));

        return element;
    }

    private createElement(node: DocumentNode): HTMLElement | null {
        switch (node.type) {
            case NodeType.PARAGRAPH:
                return this.createHtmlElement('p', node);
            case NodeType.HEADING:
                return this.createHtmlElement(`h${node.attrs!['level']}`, node);
            case NodeType.IMAGE:
                return this.createHtmlElement('img', node);
            case NodeType.ORDERED_LIST:
                return this.createHtmlElement('ol', node);
            case NodeType.BULLET_LIST:
                return this.createHtmlElement('ul', node);
            case NodeType.LIST_ITEM:
                return this.createHtmlElement('li', node);
            case NodeType.HORIZONTAL_RULE:
                return this.createHtmlElement('hr', node);
            case NodeType.QUOTE:
                return this.createHtmlElement('blockquote', node);
            case NodeType.EMOJI:
                return this.createEmojiElement(node);
            case NodeType.HARD_BREAK:
                return this.renderer.createElement('br');
            case NodeType.CODE_BLOCK:
                return this.createHtmlElement('pre', node);
            default:
                console.warn(new Error(`Unhandled node type: ${node.type}`));
                return null;
        }
    }

    private createEmojiElement(node: DocumentNode): HTMLElement | null {
        const { emoji, fallbackImage, name } = node.attrs!;

        if (emoji) {
            const element = this.renderer.createElement('span');
            this.renderer.setAttribute(element, 'data-type', 'emoji');
            this.renderer.setAttribute(element, 'data-name', name);
            element.innerHTML = emoji;
            return element;
        }

        if (!fallbackImage) {
            const element = this.renderer.createElement('span');
            this.renderer.setAttribute(element, 'data-type', 'emoji');
            this.renderer.setAttribute(element, 'data-name', name);
            element.innerHTML = name;
            return element;
        }

        const element = this.renderer.createElement('img');
        this.renderer.setAttribute(element, 'data-type', 'emoji');
        this.renderer.setAttribute(element, 'data-name', name);
        this.renderer.setAttribute(element, 'src', fallbackImage);
        this.renderer.setAttribute(element, 'alt', name);
        this.renderer.setAttribute(element, 'align', 'absmiddle');
        this.renderer.setAttribute(element, 'loading', 'lazy');
        this.renderer.setAttribute(element, 'draggable', 'false');
        return element;
    }

    private createHtmlElement(tag: string, node: DocumentNode): HTMLElement {
        const element = this.renderer.createElement(tag);

        if (node.attrs) {
            Object.entries(node.attrs).forEach(([key, value]) => this.renderer.setAttribute(element, key, value));
        }

        return element;
    }

    private applyMarks(element: HTMLElement, marks: MarkNode[]): HTMLElement {
        let wrappedElement = element;
        marks.forEach((mark) => {
            switch (mark.type) {
                case MarkType.UNDERLINE:
                    wrappedElement = this.wrapWithMark(wrappedElement, 'u');
                    break;
                case MarkType.BOLD:
                    wrappedElement = this.wrapWithMark(wrappedElement, 'strong');
                    break;
                case MarkType.ITALIC:
                    wrappedElement = this.wrapWithMark(wrappedElement, 'em');
                    break;
                case MarkType.STRIKE:
                    wrappedElement = this.wrapWithMark(wrappedElement, 'del');
                    break;
                case MarkType.SUBSCRIPT:
                    wrappedElement = this.wrapWithMark(wrappedElement, 'sub');
                    break;
                case MarkType.SUPERSCRIPT:
                    wrappedElement = this.wrapWithMark(wrappedElement, 'sup');
                    break;
                case MarkType.CODE:
                    wrappedElement = this.wrapWithMark(wrappedElement, 'code');
                    break;
                case MarkType.HIGHLIGHT:
                    wrappedElement = this.wrapWithMark(wrappedElement, 'span', {
                        style: `background-color: ${mark.attrs.color};`,
                    });
                    break;
                case MarkType.TEXT_STYLE:
                    wrappedElement = this.wrapWithMark(wrappedElement, 'span', {
                        style: `color: ${mark.attrs.color};`,
                    });
                    break;
                case MarkType.LINK:
                    wrappedElement = this.createLink(wrappedElement, mark.attrs);
                    break;
                case MarkType.ANCHOR:
                    wrappedElement = this.wrapWithMark(wrappedElement, 'span', mark.attrs);
                    break;
                default:
                    console.warn(`Unhandled mark type: ${mark.type}`, mark);
                    break;
            }
        });
        return wrappedElement;
    }

    private createLink(element: HTMLElement, attrs: ISbLinkedUrlRichText | ISbLinkedDocument): HTMLElement {
        if (attrs['linktype'] === 'story') {
            if (attrs['story']) {
                const slug = attrs['story'].full_slug;
                const anchor = attrs.anchor;
                const href = this.slugToUrl ? this.slugToUrl(slug) : slug;
                const target = [href, anchor].filter(Boolean).join('#');

                return this.wrapWithMark(element, 'a', { href: target, 'data-internal-link': '' });
            }

            console.error(new Error(enableResolveLinksErr));
        }

        return this.wrapWithMark(element, 'a', {
            href: (<ISbLinkedUrlRichText>attrs).href,
            target: attrs.target,
        });
    }

    private wrapWithMark(
        element: HTMLElement,
        tagName: string,
        attrs: Record<string, string | undefined> = {},
    ): HTMLElement {
        const markElement = this.renderer.createElement(tagName);
        Object.entries(attrs).forEach(([key, value]) => value && this.renderer.setAttribute(markElement, key, value));
        this.renderer.appendChild(markElement, element);
        return markElement;
    }
}
