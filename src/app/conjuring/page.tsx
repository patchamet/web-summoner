'use client'
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
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
        inputProps: {
            type: 'text',
            value: 'Text value 1',
        }
    },
    {
        title: 'Section 2',
        dataKey: 'section2',
        inputProps: {
            type: 'number',
            value: 123,
        }
    },
    {
        title: 'Section 3',
        dataKey: 'section3',
        inputProps: {
            type: 'boolean',
            value: true,
        }
    },
    {
        title: 'Section 4',
        dataKey: 'section4',
        children: [
            {
                title: 'Subsection 1',
                dataKey: 'subsection1',
                inputProps: {
                    type: 'text',
                    value: 'Text value 2',
                }
            },
            {
                title: 'Subsection 2',
                dataKey: 'subsection2',
                children: [
                    {
                        title: 'Subsubsection 1',
                        dataKey: 'subsubsection1',
                        inputProps: {
                            type: 'number',
                            value: 456,
                        }
                    },
                    {
                        title: 'Subsubsection 2',
                        dataKey: 'subsubsection2',
                        inputProps: {
                            type: 'boolean',
                            value: true,
                        }
                    },
                    {
                        title: 'Subsubsection 3',
                        dataKey: 'subsubsection3',
                        children: [
                            {
                                title: 'Subsubsection 3.1',
                                dataKey: 'subsubsection3.1',
                                inputProps: {
                                    type: 'text',
                                    value: 'Text value 3',
                                }
                            },
                        ]
                    }
                ]
            },
        ]
    }
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
        key,
        value,
    }: {
        key: string;
        value: any;
    }) => {
        const newFormData = _.set(_.cloneDeep(formData), key, value);
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
                        prefixKey={`[${index}]`}
                        key={index}
                        data={data}
                        onChange={handleChangeField}
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