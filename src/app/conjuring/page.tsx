'use client'
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import InputField, { TDisplayInput } from '@/components/shared/InputField';
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
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const ConjuringControlsBarItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 1px solid #fff;
    border-radius: 10px;
    padding: 10px;
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
            value: false,
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

const getIdsWithChildren = (items: TFieldItem[]): string[] => {
    const result: string[] = [];

    function traverse(itemList: TFieldItem[]) {
        for (const item of itemList) {
            if (item.children && item.children.length > 0) {
                result.push(item._id);
                traverse(item.children);
            }
        }
    }

    traverse(items);
    return result;
}

const DisplayInputControl = ({
    label,
    data,
    onChange,
}: {
    label: string;
    data: TDisplayInput;
    onChange?: (data: TDisplayInput) => void;
}) => {
    const [inputData, setInputData] = useState<TDisplayInput>(data);

    const handleChange = (args: { [key: string]: boolean }) => {
        console.log('handleChange args', args);
        const updateData: TDisplayInput = {
            ...data,
            ...args,
        }
        setInputData(updateData);
        if (onChange) onChange(updateData)
    }

    return (
        <>
            <label><b>{label}:</b></label>
            
            <input
                id={`${label}-display-title-show-label`}
                type="checkbox"
                checked={inputData.showLabel}
                onChange={(e) => handleChange({ showLabel: e.target.checked })}
            />
            <label htmlFor={`${label}-display-title-show-label`}>Label</label>

            <input
                id={`${label}-display-title-show-value`}
                type="checkbox"
                checked={inputData.showValue}
                onChange={(e) => handleChange({ showValue: e.target.checked })}
            />
            <label htmlFor={`${label}-display-title-show-value`}>Value</label>

            <input
                id={`${label}-display-title-editable`}
                type="checkbox"
                checked={inputData.editable}
                onChange={(e) => handleChange({ editable: e.target.checked })}
            />
            <label htmlFor={`${label}-display-title-editable`}>Editable</label>
        </>
    )
}

const Conjuring = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState<TFieldItem[]>([]);
    const [expandChildrenIds, setExpandChildrenIds] = useState<string[]>([]);
    const [isExpandAll, setIsExpandAll] = useState<boolean>(true);
    const [displayTitle, setDisplayTitle] = useState<TDisplayInput>({
        showLabel: true,
        showValue: true,
        editable: true,
    });
    const [displayKey, setDisplayKey] = useState<TDisplayInput>({
        showLabel: true,
        showValue: true,
        editable: true,
    });
    const [displayValue, setDisplayValue] = useState<TDisplayInput>({
        showLabel: true,
        showValue: true,
        editable: true,
    });

    // handle isExpandAll
    useEffect(() => {
        const allExpandChildrenIds = getIdsWithChildren(formData);
        const isExpandAll = allExpandChildrenIds.length > 0 && allExpandChildrenIds.every(id => expandChildrenIds.includes(id));
        setIsExpandAll(isExpandAll);
    }, [formData, expandChildrenIds])

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

    const handleClickExpand = ({ _id }: { _id: string }) => {
        const isInclude = expandChildrenIds.includes(_id);
        if (isInclude) {
            setExpandChildrenIds(expandChildrenIds.filter(id => id !== _id));
        } else {
            setExpandChildrenIds([...expandChildrenIds, _id]);
        }
    }

    const handleExpandAll = () => {
        if (isExpandAll) {
            setExpandChildrenIds([]);
        } else {
            setExpandChildrenIds(getIdsWithChildren(formData));
        }
    }

    console.log('displayTitle', displayTitle);
    console.log('displayKey', displayKey);
    console.log('displayValue', displayValue);

    return (
        <ConjuringContainer ref={containerRef}>
            <ConjuringHeader>
                <h1>Conjuring</h1>
                <ConjuringControlsBar>
                    <ConjuringControlsBarItem>
                        <label htmlFor="expand-all"><b>Expand All:</b></label>
                        <input
                            id="expand-all"
                            type="checkbox"
                            checked={isExpandAll}
                            onChange={handleExpandAll}
                        />
                    </ConjuringControlsBarItem>
                    <ConjuringControlsBarItem>
                        <DisplayInputControl
                            label="Title"
                            data={displayTitle}
                            onChange={setDisplayTitle}
                        />
                    </ConjuringControlsBarItem>
                    <ConjuringControlsBarItem>
                        <DisplayInputControl
                            label="Key"
                            data={displayKey}
                            onChange={setDisplayKey}
                        />
                    </ConjuringControlsBarItem>
                    <ConjuringControlsBarItem>
                        <DisplayInputControl
                            label="Value"
                            data={displayValue}
                            onChange={setDisplayValue}
                        />
                    </ConjuringControlsBarItem>
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
                            expandChildrenIds={expandChildrenIds}
                            displayTitle={displayTitle}
                            displayKey={displayKey}
                            displayValue={displayValue}
                            onClickExpand={handleClickExpand}
                            onChange={handleChangeField}
                        />
                    ))}
                </ConjuringForm>
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