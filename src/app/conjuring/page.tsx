'use client'
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Section } from '@/components/shared';
import { applyDebugBorders } from '@/utils/debugBorder';

const ConjuringContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
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
            <Section 
                formData={{
                    title: 'Section 1',
                    dataKey: 'section1',
                }}
            />
            <Section 
                formData={{
                    title: 'Section 2',
                    dataKey: 'section2',
                }}
            />
        </ConjuringContainer>
    )
}


export default Conjuring;