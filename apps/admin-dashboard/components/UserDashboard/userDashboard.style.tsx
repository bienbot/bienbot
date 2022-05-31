import styled from "styled-components";

export const StyledWrapper = styled.main`
    min-height: 100vh;
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 410px), 1fr));
    gap: 32px;
`;

export const StyledUserWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    min-width: 0;
    padding-top: 32px;
`;

export const StyledUserDataWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100%;
`;

export const StyledCardsWrapper = styled.div`
    max-width: 100%;
`;

export const StyledEventsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 32px 0;
`;

export const StyledHeading = styled.h1`
    margin-bottom: 26px;
    font-size: ${({ theme }) => theme.font.size.large};
    font-weight: ${({ theme }) => theme.font.weight.extraBold};
    color: ${({ theme }) => theme.colors.primary[700]};
`;
