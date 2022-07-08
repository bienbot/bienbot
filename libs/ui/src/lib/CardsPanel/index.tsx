import Link from "next/link";
import styled from "styled-components";

/* eslint-disable-next-line */

export interface CardsPanelProps {
	children: React.ReactNode;
	heading: string;
	href?: string;
}

export function CardsPanel(props: CardsPanelProps) {
	return (
		<div>
			<StyledHeadingContainer>
				<StyledHeading>{props.heading}</StyledHeading>
				{props.href ? (
					<Link href={props.href}>
						<StyledSeeMore>See more</StyledSeeMore>
					</Link>
				) : null}
			</StyledHeadingContainer>
			<StyledMessagesPanel>{props.children}</StyledMessagesPanel>
		</div>
	);
}

const StyledHeadingContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
`;

const StyledSeeMore = styled.a`
	font-size: ${({ theme }) => theme.font.size.large};
	font-family: ${({ theme }) => theme.font.family};
	font-weight: 700;
	color: ${({ theme }) => theme.colors.primary[400]};
	cursor: pointer;
`;

const StyledHeading = styled.h2`
	font-size: ${({ theme }) => theme.font.size.large};
	font-family: ${({ theme }) => theme.font.family};
	font-weight: 800;
	color: ${({ theme }) => theme.colors.primary[700]};
`;
const StyledMessagesPanel = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export default CardsPanel;
