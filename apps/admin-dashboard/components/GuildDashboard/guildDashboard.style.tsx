import styled from "styled-components";

export const StyledWrapper = styled.main`
    min-height: 100vh;
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 410px), 1fr));
    gap: 32px;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const StyledUsersWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    min-width: 0;
    padding: 32px 0;

    @media screen and (max-width: 1012px) {
        padding: 32px 0 0;
    }
`;

export const StyledUsersDataWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100%;
`;

export const StyledEventsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 32px 0;
`;
