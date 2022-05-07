import styled from "styled-components";

export const StyledWrapper = styled.main`
    display: grid;
    grid-template-columns: minmax(min(100%, 428px), 1fr);
    gap: 32px;
    @media (min-width: 856px) and (max-width: 1440px) {
        grid-template-columns: minmax(428px, 856px) auto;
    }

    @media (min-width: 1441px) {
        grid-template-columns: 4fr 3fr;
    }
`;
