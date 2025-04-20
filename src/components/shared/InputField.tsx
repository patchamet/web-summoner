import styled from 'styled-components';
import { TFieldItem } from '@/types';

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
    padding: 20px;
    gap: 10px;
`;

const InputField = ({
    data,
    onChange,
}: {
    data: TFieldItem;
    onChange?: (data: TFieldItem) => void;
}) => {

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newData: TFieldItem = { ...data, [name]: value };
        onChange?.(newData);
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        const newData: TFieldItem = { ...data, [name]: checked };
        onChange?.(newData);
    }

    return (
        <FieldContainer>
            <FieldRow>
                <FieldTitle>
                    <label>Title: </label>
                    <input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleValueChange}
                    />
                </FieldTitle>
                <FieldKey>
                    <label>Key: </label>
                    <input
                        type="text"
                        name="dataKey"
                        value={data.dataKey}
                        onChange={handleValueChange}
                    />
                </FieldKey>

                {data.inputProps !== undefined && (
                    <FieldValue>
                        <label>Value: </label>
                        {data.inputProps.type === 'text' && typeof data.inputProps.value === 'string' && (
                            <input
                                type="text"
                                name="value"
                                value={data.inputProps.value}
                                onChange={handleValueChange}
                            />
                        )}

                        {data.inputProps.type === 'number' && typeof data.inputProps.value === 'number' && (
                            <input
                                type="number"
                                name="value"
                                value={data.inputProps.value}
                                onChange={handleValueChange}
                            />
                        )}

                        {data.inputProps.type === 'boolean' && typeof data.inputProps.value === 'boolean' && (
                            <input
                                type="checkbox"
                                name="value"
                                checked={data.inputProps.value}
                                onChange={handleCheckboxChange}
                            />
                        )}
                    </FieldValue>
                )}

                {Array.isArray(data.children) && data.children.length > 0 && (
                    <FieldValue>
                        <span>▼</span>
                    </FieldValue>
                )}
            </FieldRow>

            {Array.isArray(data.children) && data.children.length > 0 && (
                <FieldChildrenContainer>
                    {data.children.map((child) => (
                        <InputField key={child.dataKey} data={child} />
                    ))}
                </FieldChildrenContainer>
            )}
        </FieldContainer>
    )
}


export default InputField;