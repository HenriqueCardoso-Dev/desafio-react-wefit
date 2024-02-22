import styled from "styled-components";

const backgroundFalse = '#009EDD';
const backgroundTrue = '#039B00'

export const Wrapper = styled.div `
    width: 100%;
    max-width: 960px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;
    margin: 42px auto;

    @media (max-width: 500px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const Card = styled.div `
    background-color: #fff;
    color: #333333;
    font-size: 12px;
    font-weight: 700;
    height: 100%;
    width: 100%;
    max-width: 309.33px;
    max-height: 305px;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const CardButton = styled.button `
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:${props => props.active ? backgroundTrue : backgroundFalse};
    color: #fff;
    width: 100%;
    height: 40px;
    border-radius: 4px;
`;