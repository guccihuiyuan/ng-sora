import { Schema as ComponentSchema } from '@schematics/angular/component/schema';

export interface Schema extends ComponentSchema {
    /**
     * 表格类型 basic | checkbox | sort | expand | tree | external-request | internal-request | styles | group
     */
    tableType?: string;
}
