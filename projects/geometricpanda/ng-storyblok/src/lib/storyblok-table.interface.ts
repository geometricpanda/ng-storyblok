import type { ISbComponentType } from 'storyblok-js-client';

export interface ISbTableCell extends ISbComponentType<string> {
    component: '_table_col' | '_table_head';
    value: string;
}

export interface ISbTableRow extends ISbComponentType<string> {
    component: '_table_row';
    body: Array<ISbTableCell>;
}

export interface ISbTable extends ISbComponentType<string> {
    fieldtype: 'table';
    tbody: Array<ISbTableRow>;
    thead: Array<ISbTableCell>;
}
