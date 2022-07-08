import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export interface SearchModalProps {
	children: React.ReactNode;
	search: string;
	setSearch: (value: string) => void;
}

const sectionVariants = {
	hidden: {
		height: "0px",
		paddingTop: "0px",
	},
	visible: {
		height: "279px",
		paddingTop: "22px",
	},
};

const contentVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
};

export function SearchModal(props: SearchModalProps) {
	const hasChildren = React.Children.count(props.children) > 0;

	return (
		<SearchModalContainer>
			<SearchInput placeholder="Search"></SearchInput>
			<SearchResultsContainer
				variants={sectionVariants}
				animate={hasChildren ? "visible" : "hidden"}
				transition={{ duration: 0.3, delay: hasChildren ? 0 : 0.3 }}
			>
				<SearchResults
					variants={contentVariants}
					transition={{ duration: 0.3, delay: hasChildren ? 0.3 : 0 }}
				>
					<h3>Results</h3>
					<ResultCardsContainer>
						{props.children}
					</ResultCardsContainer>
				</SearchResults>
			</SearchResultsContainer>
		</SearchModalContainer>
	);
}

const ResultCardsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const SearchInput = styled.input`
	position: absolute;
	z-index: 10;
	width: 100%;
	height: 41px;
	box-sizing: border-box;
	border: 2px solid ${({ theme }) => theme.colors.primary[300]};
	border-radius: 8px;
	color: ${({ theme }) => theme.colors.primary[500]};
	font-size: 16px;
	font-family: ${({ theme }) => theme.font.family};
	padding-left: 16px;
	::placeholder {
		color: ${({ theme }) => theme.colors.primary[300]};
	}

	box-shadow: 0px 4px 4px rgba(235, 235, 255, 0.35);
	transition: border-color 0.1s linear, box-shadow 0.1s linear;

	outline: none;
	:focus {
		border-color: ${({ theme }) => theme.colors.primary[500]};
		box-shadow: 0px 4px 4px rgba(235, 235, 255, 0.5);
	}
`;

const SearchResultsContainer = styled(motion.section)`
	position: absolute;
	z-index: 5;
	top: 17px;
	width: 100%;
	border: 2px solid ${({ theme }) => theme.colors.primary[300]};
	box-sizing: border-box;
	border-radius: 8px;
	padding-inline: 16px;
`;

const SearchResults = styled(motion.div)`
	color: ${({ theme }) => theme.colors.primary[400]};

	h3 {
		font-weight: 600;
		font-family: ${({ theme }) => theme.font.family};
		font-size: 13px;
		padding: 24px 0;
	}
`;

const SearchModalContainer = styled.div`
	position: relative;
	width: 400px;
	box-sizing: border-box;
`;

export default SearchModal;
