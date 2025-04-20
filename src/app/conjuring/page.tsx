'use client'
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import InputField from '@/components/shared/InputField';
import BtnSquareAdd from '@/components/shared/BtnSquareAdd';
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
        title: 'Personal Information',
        dataKey: 'personalInfo',
        inputProps: {
            type: 'text',
            value: 'Text value 1',
        }
    },
    {
        title: 'Contact Details',
        dataKey: 'contactDetails',
        inputProps: {
            type: 'number',
            value: 123,
        }
    },
    {
        title: 'Address Information',
        dataKey: 'addressInfo',
        children: [
            {
                title: 'Street Address',
                dataKey: 'streetAddress',
                inputProps: {
                    type: 'number',
                    value: 456,
                }
            },
            {
                title: 'Is Current Address',
                dataKey: 'isCurrentAddress',
                inputProps: {
                    type: 'boolean',
                    value: true,
                }
            },
            {
                title: 'Additional Details',
                dataKey: 'additionalDetails',
                children: [
                    {
                        title: 'Special Instructions',
                        dataKey: 'specialInstructions',
                        inputProps: {
                            type: 'text',
                            value: 'Text value 3',
                        }
                    },
                ]
            }
        ]
    },
    {
        title: 'Employment Status',
        dataKey: 'employmentStatus',
        inputProps: {
            type: 'boolean',
            value: true,
        }
    },
    {
        title: 'Education Details',
        dataKey: 'educationDetails',
        children: [
            {
                title: 'Institution Name',
                dataKey: 'institutionName',
                inputProps: {
                    type: 'text',
                    value: 'Text value 2',
                }
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

    const handleAddField = () => {
        alert('handleAddField');
    }

    return (
        <ConjuringContainer ref={containerRef}>
            <ConjuringForm
                id="conjuring-form"
                onSubmit={handleSubmit}
            >
                {formData.map((data, index) => (
                    <InputField
                        key={`[${index}]`}
                        prefixKey={`[${index}]`}
                        data={data}
                        onChange={handleChangeField}
                    />
                ))}
            </ConjuringForm>
            <BtnSquareAdd onClick={handleAddField} />

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