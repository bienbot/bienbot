import styled from "styled-components";

export const StyledWrapper = styled.main`
    display: grid;
    gap: 32px;

    grid-template-columns: repeat(auto-fit, minmax(min(100%, 410px), 1fr));
`;
