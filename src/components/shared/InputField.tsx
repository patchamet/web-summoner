import styled from 'styled-components';

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 100%;
    border: 1px solid #808080;
`;

 const FieldHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    width: 100%;
    padding: 10px;
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

type FieldItem = {
    title: string;
    dataKey: string;
    value?: string | number | boolean;
}

const InputField = ({
    data,
    onChange,
}: {
    data: FieldItem;
    onChange?: (data: FieldItem) => void;
}) => {

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange?.({ ...data, [name]: value });
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        onChange?.({ ...data, [name]: checked });
    }

    return (
        <FieldContainer>
            <FieldHeader>
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
                <FieldValue>
                    <label>Value: </label>
                    {data.value && typeof data.value === 'string' && (
                        <input
                            type="text"
                            name="value"
                            value={data.value}
                            onChange={handleValueChange}
                        />
                    )}

                    {data.value && typeof data.value === 'number' && (
                        <input
                            type="number"
                            name="value"
                            value={data.value}
                            onChange={handleValueChange}
                        />
                    )}

                    {data.value && typeof data.value === 'boolean' && (
                        <input
                            type="checkbox"
                            name="value"
                            checked={data.value}
                            onChange={handleCheckboxChange}
                        />
                    )}
                </FieldValue>
            </FieldHeader>
        </FieldContainer>
    )
}


export default InputField;