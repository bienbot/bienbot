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
    min-width: 150px;
    height: 68px;
    padding: 16px;
    background: ${({ theme }) => theme.colors.primary[100]};
    border-radius: 8px;
    font-family: ${({ theme }) => theme.font.family};
`;

const StyledLabel = styled.span`
    font-size: ${({ theme }) => theme.font.size.small};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary[500]};
`;

const StyledText = styled.span`
    font-size: ${({ theme }) => theme.font.size.medium};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary[700]};
`;

export default InfoCard;
