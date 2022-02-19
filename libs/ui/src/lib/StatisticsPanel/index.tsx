import styled from "styled-components";
import InfoCard, { InfoCardProps } from "../InfoCard";
import Link from "next/link";

export interface StatisticsPanelProps {
    heading: string;
    statistics: InfoCardProps[];
    href: string;
}

export function StatisticsPanel(props: StatisticsPanelProps, href: string) {
    return (
        <StyledStatisticsPanel>
            <StyledHeading>{props.heading}</StyledHeading>
            <Link href={href}>
                <StyledSeeMore>See more</StyledSeeMore>
            </Link>
            <StyledCardContainer>
                {props.statistics.map((statistic) => (
                    <InfoCard {...statistic} />
                ))}
            </StyledCardContainer>
        </StyledStatisticsPanel>
    );
}

const StyledStatisticsPanel = styled.div`
    font-family: Outfit;
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 672px;
    grid-template-rows: auto auto;
`;

const StyledHeading = styled.h2`
    font-weight: 800;
    font-size: 20px;
    color: #09095d;
`;

const StyledSeeMore = styled.h2`
    font-weight: 700;
    font-size: 20px;
    text-decoration: none;
    color: #7879f1;
    text-align: right;
    cursor: pointer;
`;

const StyledCardContainer = styled.div`
    margin-top: 16px;
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-column: 1 / -1;
`;

export default StatisticsPanel;
