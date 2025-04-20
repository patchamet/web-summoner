import React from 'react';
import styled from 'styled-components';

const BtnSquareAddContainer = styled.button`
    display: flex;
    flex-direction: column;     
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: #000;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
    font-weight: bold;  
    color: #fff;
    &:hover {
        background-color: #333;
    }
    &:active {
        background-color: #666;
    }
    &:focus {
        outline: none;
    }
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const BtnSquareAddText = styled.span`
    font-size: 1.2em;
    font-weight: bold;  
    color: #fff;       
    text-align: center;
    
`;

const BtnSquareAdd = ({
    onClick,
}: {
    onClick?: () => void;
}) => {
    return (
        <BtnSquareAddContainer onClick={onClick}>
            <BtnSquareAddText>+</BtnSquareAddText>
        </BtnSquareAddContainer>
    )
}

export default BtnSquareAdd;
