import styled from 'styled-components';
import { TFieldItem } from '@/types';

const FieldContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    width: 100%;
    padding: 20px;
    gap: 10px;
    border: 1px solid #fff;
    border-radius: 10px;    
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
            {data.value !== undefined && (
                <FieldValue>
                    <label>Value: </label>
                    {typeof data.value === 'string' && (
                        <input
                            type="text"
                            name="value"
                            value={data.value}
                            onChange={handleValueChange}
                        />
                    )}

                    {typeof data.value === 'number' && (
                        <input
                            type="number"
                            name="value"
                            value={data.value}
                            onChange={handleValueChange}
                        />
                    )}

                    {typeof data.value === 'boolean' && (
                        <input
                            type="checkbox"
                            name="value"
                            checked={data.value}
                            onChange={handleCheckboxChange}
                        />
                    )}
                </FieldValue>
            )}
        </FieldContainer>
    )
}


export default InputField;