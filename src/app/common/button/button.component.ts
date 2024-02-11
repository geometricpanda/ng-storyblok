import { booleanAttribute, Component, input } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[app-button]',
    templateUrl: './button.component.html',
    styleUrl: './button.component.css',
    standalone: true,
    host: {
        '[class.button]': 'true',
        '[class.button--primary]': 'variant() === "primary"',
        '[class.button--secondary]': 'variant() === "secondary"',
        '[class.button--outline]': 'outline()',
    },
})
export class ButtonComponent {
    variant = input<'primary' | 'secondary'>('primary');
    outline = input(false, { transform: booleanAttribute });
}
