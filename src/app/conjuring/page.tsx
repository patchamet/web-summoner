'use client'
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import InputField from '@/components/shared/InputField';
import { applyDebugBorders } from '@/utils/debugBorder';
import { TFieldItem } from '@/types';

const ConjuringContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 20px;
    width: 100%;
`;

const ConjuringForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
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

const initFormData: TFieldItem[] = [
    {
        title: 'Section 1',
        dataKey: 'section1',
        value: 'Hello, world!',
    },
    {
        title: 'Section 2',
        dataKey: 'section2',
        value: 123,
    },
    {
        title: 'Section 3',
        dataKey: 'section3',
        value: true,
    },
];

const getDuplicateDataKeyItems = (data: TFieldItem[]): TFieldItem[] => {
    const duplicateDataKeyItems = data.filter((item, index, self) =>
        self.findIndex(t => t.dataKey === item.dataKey) !== index
    );
    return duplicateDataKeyItems;
}

const Conjuring = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState<TFieldItem[]>([]);

    useEffect(() => {
        applyDebugBorders(containerRef.current);
        console.log("===initFormData===", initFormData);
        setFormData(initFormData);
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const duplicateDataKeyItems = getDuplicateDataKeyItems(formData);
        if (duplicateDataKeyItems.length > 0) {
            const errorItems = duplicateDataKeyItems
                .map(item => [
                    `Key: ${item.dataKey}`,
                    `Title: ${item.title}`,
                ].join('\n')).join(', ');
            alert(`Duplicate data key items found: ${errorItems}`);
            return;
        }

        alert('Submit');
    }

    const handleChangeField = ({
        index,
        data,
    }: {
        index: number;
        data: TFieldItem;
    }) => {
        const newFormData = formData.map((item, i) => i === index ? data : item);
        setFormData(newFormData);
    }

    return (
        <ConjuringContainer ref={containerRef}>
            <ConjuringForm
                id="conjuring-form"
                onSubmit={handleSubmit}
            >
                {formData.map((data, index) => (
                    <InputField
                        key={index}
                        data={data}
                        onChange={e => handleChangeField({ index, data: e })}
                    />
                ))}
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