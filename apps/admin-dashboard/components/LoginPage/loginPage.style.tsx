import styled from "styled-components";

export const StyledWrapper = styled.div`
	display: flex;
	max-width: 100%;
	min-height: 100vh;
	font-family: ${({ theme }) => theme.font.family};
	overflow: hidden;
`;

export const StyledLoginWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	min-height: fit-content;
	min-width: 350px;
	width: 100%;
	max-width: 650px;
	background-color: ${({ theme }) => theme.colors.background};

	@media screen and (max-width: 768px) {
		min-width: 100%;
		justify-content: start;
		gap: 236.5px;
	}
`;

export const StyledExampleWrapper = styled.div`
	display: flex;
	align-items: center;
	min-width: 1270px;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.primary[100]};

	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const StyledNameWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const StyledName = styled.h1`
	font-size: 64px;
	font-weight: ${({ theme }) => theme.font.weight.bold};
	color: ${({ theme }) => theme.colors.primary[600]};
	margin: 0;
	user-select: none;

	@media screen and (max-width: 768px) {
		margin-top: 50px;
	}
`;

export const StyledSpan = styled.span`
	font-size: ${({ theme }) => theme.font.size.medium};
	font-weight: ${({ theme }) => theme.font.weight.medium};
	color: ${({ theme }) => theme.colors.primary[700]};
	user-select: none;
`;

export const StyledLoginInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	margin-bottom: 200px;

	@media screen and (max-width: 768px) {
		margin-bottom: auto;
	}
`;

export const StyledLoginInfo = styled.span`
	font-size: ${({ theme }) => theme.font.size.xlarge};
	font-weight: ${({ theme }) => theme.font.weight.medium};
	color: ${({ theme }) => theme.colors.primary[700]};
	margin-bottom: 64px;
`;

export const StyledImageWrapper = styled.div`
	width: fit-content;
	max-height: 705px;
	margin-left: 112px;
	border-radius: 8px;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
	overflow: hidden;
`;
