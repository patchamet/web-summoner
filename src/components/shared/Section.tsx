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
`;

const SectionTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const SectionDataKey = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

type SectionData = {
    title: string;
    dataKey: string;
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
                    Title:
                    <input
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </SectionTitle>
                <SectionDataKey>
                    Data Key:
                    <input
                        type="text"
                        value={formData.dataKey}
                        onChange={handleChange}
                    />
                </SectionDataKey>
            </SectionHeader>
        </SectionContainer>
    )
}


export default Section;
export type { SectionData };