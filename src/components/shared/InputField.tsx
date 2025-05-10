import styled from 'styled-components';
import { TFieldItem } from '@/types';

type TDisplayInput = {
    showLabel?: boolean;
    showValue?: boolean;
    editable?: boolean;
}

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 1px solid #fff;
    border-radius: 10px;
`;

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    width: 100%;
    padding: 20px;
    gap: 10px;
`;

const FieldTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;

    input {
        color: #000;
        text-align: center;
    }
`;

const FieldKey = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;

    input {
        color: #000;
        text-align: center;
    }
`;

const FieldValue = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;

    input {
        color: #000;
        text-align: center;
    }
`;

const FieldChildrenContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0px 20px 20px 20px;
    gap: 10px;
`;

const IconExpand = styled.span`
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
`;

const ReadOnlyInput = styled.b`
    min-width: 200px;
`;

const InputField = ({
    prefixKey,
    data,
    expandChildrenIds = [],
    displayTitle = {
        showLabel: true,
        showValue: true,
        editable: true,
    },
    displayKey = {

        showLabel: true,
        showValue: true,
        editable: true,
    },
    displayValue = {

        showLabel: true,
        showValue: true,
        editable: true,
    },
    onChange,
    onClickExpand,
}: {
    prefixKey?: string;
    data: TFieldItem;
    expandChildrenIds?: string[];
    displayTitle?: TDisplayInput;
    displayKey?: TDisplayInput;
    displayValue?: TDisplayInput;
    onChange?: ({ key, value }: { key: string; value: any }) => void;
    onClickExpand?: ({ _id }: { _id: string }) => void;
}) => {

    const handleChangeString = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange?.({ key: `${prefixKey}.${name}`, value });
    }

    const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange?.({ key: `${prefixKey}.${name}`, value: Number(value) });
    }

    const handleChangeBoolean = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        onChange?.({ key: `${prefixKey}.${name}`, value: checked });
    }

    return (
        <FieldContainer>
            <FieldRow>
                <FieldTitle>
                    {displayTitle.showLabel && (
                        <label>Title: </label>
                    )}
                    {displayTitle.showValue && (
                        displayTitle.editable
                            ? <input
                                type="text"
                                name="title"
                                value={data.title}
                                onChange={handleChangeString}
                            />
                            : <ReadOnlyInput>{data.title}: </ReadOnlyInput>
                    )}
                </FieldTitle>
                <FieldKey>
                    {displayKey.showLabel && (
                        <label>Key: </label>
                    )}
                    {displayKey.showValue && (
                        displayKey.editable
                            ? <input
                                type="text"
                                name="dataKey"
                                value={data.dataKey}
                                onChange={handleChangeString}
                            />
                            : <ReadOnlyInput>{data.dataKey}</ReadOnlyInput>
                    )}
                </FieldKey>

                {/* input value */}
                {data.inputProps !== undefined && (
                    <FieldValue>
                        {data.inputProps.type === 'text' && typeof data.inputProps.value === 'string' && (
                            <>
                                {displayValue.showLabel && (
                                    <label>Text: </label>
                                )}
                                {displayValue.showValue && (
                                    displayValue.editable
                                        ? <input
                                            type="text"
                                            name="inputProps.value"
                                            value={data.inputProps.value}
                                            onChange={handleChangeString}
                                        />
                                        : <ReadOnlyInput>{data.inputProps.value}</ReadOnlyInput>
                                )}
                            </>
                        )}

                        {data.inputProps.type === 'number' && typeof data.inputProps.value === 'number' && (
                            <>
                                {displayValue.showLabel && (
                                    <label>Number: </label>
                                )}
                                {displayValue.showValue && (
                                    displayValue.editable
                                        ? <input
                                            type="number"
                                            name="inputProps.value"
                                            value={data.inputProps.value}
                                            onChange={handleChangeNumber}
                                        />
                                        : <ReadOnlyInput>{data.inputProps.value}</ReadOnlyInput>
                                )}
                            </>
                        )}

                        {data.inputProps.type === 'boolean' && typeof data.inputProps.value === 'boolean' && (
                            <>
                                {displayValue.showLabel && (
                                    <label>Boolean: </label>
                                )}
                                {displayValue.showValue && (
                                    displayValue.editable
                                        ? <input
                                            type="checkbox"
                                            name="inputProps.value"
                                            checked={data.inputProps.value}
                                            onChange={handleChangeBoolean}
                                        />
                                        : <ReadOnlyInput>{data.inputProps.value ? '✅' : '❌'}</ReadOnlyInput>
                                )}
                            </>
                        )}

                    </FieldValue>
                )}

                {/* if children is array show symbol */}
                {Array.isArray(data.children) && data.children.length > 0 && (
                    <FieldValue>
                        {displayValue.showLabel && (
                            <label>Total Children: {data.children.length}</label>
                        )}
                        <IconExpand
                            style={{
                                transform: expandChildrenIds.includes(data._id) ? 'rotate(0deg)' : 'rotate(90deg)'
                            }}
                            onClick={() => onClickExpand?.({
                                _id: data._id,
                            })}
                        >
                            ▼
                        </IconExpand>
                    </FieldValue>
                )}
            </FieldRow>

            {/* children handle */}
            {Array.isArray(data.children) && data.children.length > 0 && (
                <FieldChildrenContainer
                    style={{
                        display: expandChildrenIds.includes(data._id) ? 'flex' : 'none'
                    }}
                >
                    {data.children.map((child, index) => {
                        const childPrefixKey = `${prefixKey}.children[${index}]`;
                        return (
                            <InputField
                                key={childPrefixKey}
                                prefixKey={childPrefixKey}
                                data={child}
                                expandChildrenIds={expandChildrenIds}
                                displayTitle={displayTitle}
                                displayKey={displayKey}
                                displayValue={displayValue}
                                onClickExpand={onClickExpand}
                                onChange={onChange}
                            />
                        )
                    })}
                </FieldChildrenContainer>
            )}
        </FieldContainer>
    )
}


export default InputField;
export type { TDisplayInput };
