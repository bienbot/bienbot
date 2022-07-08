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
	flex-direction: column;
	gap: 16px;
	max-width: fit-content;
	margin-bottom: 32px;
`;

export const StyledHeading = styled.h1`
	font-size: ${({ theme }) => theme.font.size.xlarge};
	color: ${({ theme }) => theme.colors.primary[700]};

	@media screen and (max-width: 768px) {
		font-size: ${({ theme }) => theme.font.size.large};
	}
`;

export const StyledHeadingWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

export const StyledSpan = styled.span`
	color: ${({ theme }) => theme.colors.primary[400]};
`;

export const StyledInput = styled.input`
	width: 100%;
	padding: 8px;
	background-color: ${({ theme }) => theme.colors.primary[100]};
	border: 2px solid ${({ theme }) => theme.colors.primary[300]};
	border-radius: 8px;
	color: ${({ theme }) => theme.colors.primary[500]};
	font-family: ${({ theme }) => theme.font.family};
	font-size: ${({ theme }) => theme.font.size.large};
	outline: none;
	transition: border-color 0.1s linear, box-shadow 0.1s linear;

	:focus {
		border-color: ${({ theme }) => theme.colors.primary[500]};
		box-shadow: 0px 0px 2px 0.1px
			${({ theme }) => theme.colors.primary[500]};
	}

	::placeholder {
		color: ${({ theme }) => theme.colors.primary[300]};
	}
`;
