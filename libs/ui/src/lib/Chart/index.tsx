import styled from "styled-components";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import { registerables } from "chart.js";
import ChartJS from "chart.js/auto";
import { format } from "date-fns";
import theme from "libs/themes/src/lib/admin-dashboard/theme";

ChartJS.register(...registerables);

export interface ChartProps {
    href?: string;
    minuteValues: number[];
    messageValues: number[];
    dayValues: Date[];
    labels: {
        firstLabel: string;
        secondLabel: string;
    };
}

export function Chart(props: ChartProps) {
    return (
        <StyledChartContainer>
            <StyledLabelContainer>
                <StyledHeading>Last 30 days</StyledHeading>
                {props.href ? (
                    <Link href={props.href}>
                        <StyledSeeMore>See more</StyledSeeMore>
                    </Link>
                ) : null}
            </StyledLabelContainer>
            <StyledChartBackground>
                <StyledChart>
                    <ChartData
                        minuteValues={props.minuteValues}
                        messageValues={props.messageValues}
                        dayValues={props.dayValues}
                        labels={props.labels}
                    />
                </StyledChart>
            </StyledChartBackground>
        </StyledChartContainer>
    );
}

const StyledChart = styled.div`
    width: 100%;
    background: ${({ theme }) => theme.colors.background};
    border-radius: 8px;
`;

const StyledChartBackground = styled.div`
    width: 100%;
    min-height: auto;
    padding: 16px;
    background: ${({ theme }) => theme.colors.primary[100]};
    border-radius: 8px;
`;

const StyledChartContainer = styled.div`
    width: 100%;
    min-height: auto;
`;

const StyledLabelContainer = styled.div`
    display: flex;
    width: 100%;
    min-height: auto;
    background: transparent;
    margin-bottom: 18px;
    font-family: ${({ theme }) => theme.font.family};
    font-size: ${({ theme }) => theme.font.size.large};
`;

const StyledHeading = styled.h2`
    margin-right: auto;
    color: ${({ theme }) => theme.colors.primary[700]};
    font-weight: 800;
`;

const StyledSeeMore = styled.h2`
    color: ${({ theme }) => theme.colors.primary[400]};
    font-weight: 700;
    cursor: pointer;
`;

//Chart
export const ChartData = (props: ChartProps) => {
    return (
        <Line
            data={{
                labels: props.dayValues.map((days) => format(days, "dd-MM")),
                datasets: [
                    {
                        label: props.labels.firstLabel,
                        data: props.minuteValues,
                        borderColor: theme.colors.primary[400],
                        backgroundColor: theme.colors.primary[400],
                    },
                    {
                        label: props.labels.secondLabel,
                        data: props.messageValues,
                        borderColor: theme.colors.primary[700],
                        backgroundColor: theme.colors.primary[700],
                    },
                ],
            }}
            options={{
                plugins: {
                    legend: {
                        labels: {
                            padding: 32,
                            boxWidth: 20,
                            boxHeight: 20,
                            font: {
                                family: theme.font.family,
                                size: parseInt(theme.font.size.medium),
                                weight: "600",
                            },
                        },
                    },
                },
                elements: {
                    point: {
                        radius: 0,
                        hoverRadius: 0,
                    },
                    line: {
                        borderCapStyle: "round",
                        borderJoinStyle: "round",
                        borderWidth: 5,
                    },
                },
                aspectRatio: 3,
                responsive: true,
                color: theme.colors.primary[700],
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false,
                        },
                        ticks: {
                            color: theme.colors.primary[300],
                            font: {
                                family: theme.font.family,
                                size: parseInt(theme.font.size.small),
                            },
                            padding: 16,
                            maxTicksLimit: 5,
                        },
                    },
                    y: {
                        grid: {
                            display: false,
                            drawBorder: false,
                        },
                        ticks: {
                            color: theme.colors.primary[300],
                            font: {
                                family: theme.font.family,
                                size: parseInt(theme.font.size.small),
                            },
                            padding: 16,
                            stepSize: 1000,
                        },
                    },
                },
            }}
        />
    );
};
