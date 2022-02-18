import styled from "styled-components";

export interface InfoCardProps {
    label?: string;
    text: string;
}

export function InfoCard(props: InfoCardProps) {
    return (
        <StyledInfoCard>
            <StyledLabel>{props.label}</StyledLabel>
            <StyledText>{props.text}</StyledText>
        </StyledInfoCard>
    );
}

const StyledInfoCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 150px;
    height: 68px;
    padding: 16px;
    background: #f1f1fd;
    border-radius: 8px;
    font-family: Outfit;
`;

const StyledLabel = styled.span`
    font-size: 13px;
    font-weight: 500;
    color: #67678e;
`;

const StyledText = styled.span`
    font-size: 16px;
    font-weight: 700;
    color: #09095d;
`;

export default InfoCard;
