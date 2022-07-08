import styled from "styled-components";

export const StyledPageWrapper = styled.div`
	width: 100%;
	padding: 80px 32px 0;
	background-color: ${({ theme }) => theme.colors.background};
	font-family: ${({ theme }) => theme.font.family};
`;
