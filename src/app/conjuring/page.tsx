'use client'
import styled from 'styled-components';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const BtnAddSection = styled.button`
    background-color: #000;
    color: #fff;
    border-radius: 5px;
    border: 1px solid #fff;
    cursor: pointer;
    margin: 10px;
    padding: 10px 20px;
    :hover {
        background-color: #fff;
        color: #000;
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #fff;
`

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #fff;
    width: 100%;
`

const SectionHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    border: 1px solid #fff;
    width: 100%;
`

const SectionTitle = styled.input`
    border: 1px solid #fff;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 5px;
    font-size: 16px;
    font-weight: bold;
    color: #000;
    background-color: #fff;
    :focus {
        outline: none;
    }
`

type TSection = {
    key: string;
    title: string;
    content: string;
}

const Conjuring = () => {
    const [sections, setSections] = useState<TSection[]>([]);

    const handleAddSection = () => {

        const key = prompt('Enter the key for the new section', uuidv4());
        const isKeyExists = sections.find((section) => section.key === key);
        if (isKeyExists) {
            alert(`Key ${key} already exists`);
            return;
        }

        if (key) {
            setSections([
                ...sections, {
                    key: key,
                    title: 'New Section',
                    content: 'New Content',
                }
            ]);
        } else {
            alert('Please enter a key');
        }
    }

    const handleChangeTitle = (key: string, title: string) => {
        setSections(sections.map((section) => section.key === key ? { ...section, title: title } : section));
    }

    return (
        <>
            <Container>
                {sections.map((section) => (
                    <Section key={section.key}>
                        <SectionHeader>
                            <SectionTitle
                                type="text"
                                value={section.title}
                                onChange={(e) => handleChangeTitle(section.key, e.target.value)}
                            />
                            <small><i>{section.key}</i></small>
                        </SectionHeader>
                        <p>{section.content}</p>
                    </Section>
                ))}
                <BtnAddSection
                    onClick={handleAddSection}
                >
                    Add Section
                </BtnAddSection>
            </Container>

        </>
    )
}


export default Conjuring;