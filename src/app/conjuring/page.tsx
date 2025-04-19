'use client'
import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 100%;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border: 1px solid red;
`;

type TSection = {
    key: string;
    title: string;
    content: string;
}

const Conjuring = () => {
    const [sections, setSections] = useState<TSection[]>([]);

    return (
        <Container>
           <Section>Section 1</Section>
           <Section>Section 2</Section>
           <Section>Section 3</Section>
        </Container>
    )
}


export default Conjuring;