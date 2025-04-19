'use client'
import { useEffect, useRef, useState, } from 'react';
import styled from 'styled-components';
import { Section } from '@/components/shared';
import { applyDebugBorders } from '@/utils/debugBorder'; // <-- import here

const ConjuringContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 100%;
`;

const Conjuring = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        applyDebugBorders(containerRef.current);
    }, []);

    return (
        <ConjuringContainer ref={containerRef}>
            <Section title="Section 1" dataKey="section1" />
            <Section title="Section 2" dataKey="section2" />
            <Section title="Section 3" dataKey="section3" />
        </ConjuringContainer>
    )
}


export default Conjuring;