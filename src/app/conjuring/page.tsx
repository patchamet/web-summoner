'use client'
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import InputField from '@/components/shared/InputField';
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

const ConjuringForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const ConjuringSubmit = styled.button`
    display: flex;
    flex-direction: column;     
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #333;
    } 

    &:active {
        background-color: #666;
    }
`;

const Conjuring = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        applyDebugBorders(containerRef.current);
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Submit');
    }

    return (
        <ConjuringContainer ref={containerRef}>
            <ConjuringForm
                id="conjuring-form"
                onSubmit={handleSubmit}
            >
                <InputField
                    data={{
                        title: 'Section 1',
                        dataKey: 'section1',
                        value: 'Hello, world!',
                    }}
                />
                <InputField
                    data={{
                        title: 'Section 2',
                        dataKey: 'section2',
                        value: 123,
                    }}
                />
                <InputField
                    data={{
                        title: 'Section 2',
                        dataKey: 'section2',
                        value: true,
                    }}
                />
            </ConjuringForm>

            <ConjuringSubmit
                type="submit"
                form="conjuring-form"
            >
                Submit
            </ConjuringSubmit>
        </ConjuringContainer>
    )
}


export default Conjuring;