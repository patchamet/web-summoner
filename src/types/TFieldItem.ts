
type TFieldItemInputType = 'text' | 'number' | 'boolean'


type TFieldItem = {
    title: string;
    dataKey: string;
    inputProps?: {
        type: TFieldItemInputType;
        value?: string | number | boolean;
    }
    children?: TFieldItem[];
}

export type {
    TFieldItem,
    TFieldItemInputType,
};