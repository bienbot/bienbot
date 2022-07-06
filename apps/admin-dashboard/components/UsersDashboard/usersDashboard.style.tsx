import styled from "styled-components";

export const StyledWrapper = styled.main`
    min-height: 100vh;
    max-width: 100%;
    padding: 32px 0;
`;

export const StyledUsersWrapper = styled.div`
    min-width: 0;
    display: grid;
    grid-template-columns: repeat(
        auto-fill,
        minmax(min(100%/1, max(340px, 100%/5)), 1fr)
    );
    gap: 32px;
`;

export const StyledUsersInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;
`;

export const StyledHeading = styled.h1`
    font-size: ${({ theme }) => theme.font.size.xlarge};
    color: ${({ theme }) => theme.colors.primary[700]};

    @media screen and (max-width: 768px) {
        font-size: ${({ theme }) => theme.font.size.large};
    }
`;

export const StyledSpan = styled.span`
    color: ${({ theme }) => theme.colors.primary[400]};
`;
