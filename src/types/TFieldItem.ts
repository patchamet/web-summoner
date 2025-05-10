
type TFieldItemInputType = 'text' | 'number' | 'boolean'


type TFieldItem = {
    _id: string;
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