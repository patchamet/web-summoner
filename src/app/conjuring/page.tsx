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

const ConjuringHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const ConjuringBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const ConjuringFooter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
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

const ConjuringControlsBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const initFormData: TFieldItem[] = [
    {
        _id: '550e8400-e29b-41d4-a716-446655440000',
        title: 'Personal Information',
        dataKey: 'personalInfo',
        inputProps: {
            type: 'text',
            value: 'Text value 1',
        }
    },
    {
        _id: '550e8400-e29b-41d4-a716-446655440001',
        title: 'Contact Details',
        dataKey: 'contactDetails',
        inputProps: {
            type: 'number',
            value: 123,
        }
    },
    {
        _id: '550e8400-e29b-41d4-a716-446655440002',
        title: 'Address Information',
        dataKey: 'addressInfo',
        children: [
            {
                _id: '550e8400-e29b-41d4-a716-446655440003',
                title: 'Street Address',
                dataKey: 'streetAddress',
                inputProps: {
                    type: 'number',
                    value: 456,
                }
            },
            {
                _id: '550e8400-e29b-41d4-a716-446655440004',
                title: 'Is Current Address',
                dataKey: 'isCurrentAddress',
                inputProps: {
                    type: 'boolean',
                    value: true,
                }
            },
            {
                _id: '550e8400-e29b-41d4-a716-446655440005',
                title: 'Additional Details',
                dataKey: 'additionalDetails',
                children: [
                    {
                        _id: '550e8400-e29b-41d4-a716-446655440006',
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
        _id: '550e8400-e29b-41d4-a716-446655440007',
        title: 'Employment Status',
        dataKey: 'employmentStatus',
        inputProps: {
            type: 'boolean',
            value: true,
        }
    },
    {
        _id: '550e8400-e29b-41d4-a716-446655440008',
        title: 'Education Details',
        dataKey: 'educationDetails',
        children: [
            {
                _id: '550e8400-e29b-41d4-a716-446655440009',
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
    const [isExpandChildren, setIsExpandChildren] = useState<boolean>(false);

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
            <ConjuringHeader>
                <h1>Conjuring</h1>
                <ConjuringControlsBar>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 10,
                        }}
                    >
                        <input
                            id="expand-all"
                            type="checkbox"
                            checked={isExpandChildren}
                            onChange={() => setIsExpandChildren(!isExpandChildren)}
                        />
                        <label htmlFor="expand-all">Expand All</label>
                    </div>


                </ConjuringControlsBar>
            </ConjuringHeader>

            <ConjuringBody>
                <ConjuringForm
                    id="conjuring-form"
                    onSubmit={handleSubmit}
                >
                    {formData.map((data, index) => (
                        <InputField
                            key={`[${index}]`}
                            prefixKey={`[${index}]`}
                            data={data}
                            isExpandChildren={isExpandChildren}
                            onChange={handleChangeField}
                        />
                    ))}
                </ConjuringForm>
                <BtnSquareAdd onClick={handleAddField} />
            </ConjuringBody>

            <ConjuringFooter>
                <ConjuringSubmit
                    type="submit"
                    form="conjuring-form"
                >
                    Submit
                </ConjuringSubmit>
            </ConjuringFooter>
        </ConjuringContainer>
    )
}


export default Conjuring;