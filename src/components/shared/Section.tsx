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
`;

const SectionTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const SectionKey = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const Section = ({
    title,
    dataKey,
}: {
    title: string;
    dataKey: string;
}) => {
    return (
        <SectionContainer>
            <SectionHeader>
                <SectionTitle>{title}</SectionTitle>
                <SectionKey>{dataKey}</SectionKey>
            </SectionHeader>
            <SectionHeader>
                <SectionTitle>{title}</SectionTitle>
                <SectionKey>{dataKey}</SectionKey>
            </SectionHeader>
        </SectionContainer>
    )
}


export default Section;