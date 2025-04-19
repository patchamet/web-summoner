import styled from 'styled-components';

const SectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 100%;
    border: 1px solid #808080;
`;

const SectionHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    width: 100%;
    padding: 10px;
    gap: 10px;
`;

const SectionTitle = styled.div`
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

const SectionDataKey = styled.div`
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

const SectionValue = styled.div`
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

type SectionData = {
    title: string;
    dataKey: string;
    value: string;
}

const Section = ({
    formData,
    onChange,
}: {
    formData: SectionData;
    onChange?: (data: SectionData) => void;
}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange?.({ ...formData, [name]: value });
    }

    return (
        <SectionContainer>
            <SectionHeader>
                <SectionTitle>
                    <label>Title: </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </SectionTitle>
                <SectionDataKey>
                    <label>Key: </label>
                    <input
                        type="text"
                        name="dataKey"
                        value={formData.dataKey}
                        onChange={handleChange}
                    />
                </SectionDataKey>
                <SectionValue>
                    <label>Value: </label>
                    <input
                        type="text"
                        name="value"
                        value={formData.value}
                        onChange={handleChange}
                    />
                </SectionValue>
            </SectionHeader>
        </SectionContainer>
    )
}


export default Section;
export type { SectionData };