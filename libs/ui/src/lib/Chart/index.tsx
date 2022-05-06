import styled from "styled-components";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import ChartJS from "chart.js/auto";
import { format } from "date-fns";
import theme from "libs/themes/src/lib/admin-dashboard/theme";
import { useWindowSize } from "usehooks-ts";
import {
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
} from "chart.js";

ChartJS.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
);

export interface ChartProps {
    href?: string;
    heading: string;
    chartData: IChartData;
}

export interface IChartData {
    hourValues: number[];
    messageValues: number[];
    dayValues: Date[];
    labels: {
        hourLabel: string;
        messageLabel: string;
    };
}

export function Chart(props: ChartProps) {
    return (
        <StyledChartContainer>
            <StyledLabelContainer>
                <StyledHeading>{props.heading}</StyledHeading>
                {props.href ? (
                    <Link href={props.href} passHref>
                        <StyledSeeMore>See more</StyledSeeMore>
                    </Link>
                ) : null}
            </StyledLabelContainer>
            <StyledChartBackground>
                <StyledChart>
                    <ChartData {...props.chartData} />
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
    font-size: ${({ theme }) => theme.font.size.large};
    font-weight: ${({ theme }) => theme.font.weight.extraBold};
`;

const StyledSeeMore = styled.a`
    color: ${({ theme }) => theme.colors.primary[400]};
    font-size: ${({ theme }) => theme.font.size.large};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    text-decoration: none;
    cursor: pointer;
`;

//Chart
export const ChartData = (props: IChartData) => {
    const { width } = useWindowSize();
    const isSmall = useWindowSize().width < 768;

    return (
        <Line
            data={{
                labels: props.dayValues.map((days) => format(days, "dd-MM")),
                datasets: [
                    {
                        label: props.labels.hourLabel,
                        data: props.hourValues,
                        borderColor: theme.colors.primary[400],
                        backgroundColor: theme.colors.primary[400],
                    },
                    {
                        label: props.labels.messageLabel,
                        data: props.messageValues,
                        borderColor: theme.colors.primary[700],
                        backgroundColor: theme.colors.primary[700],
                    },
                ],
            }}
            options={{
                animations: {
                    y: {
                        easing: "easeInCubic",
                        delay: 500,
                    },
                    radius: {
                        easing: "easeInCubic",
                        delay: 500,
                    },
                },
                interaction: {
                    intersect: false,
                },
                plugins: {
                    tooltip: {
                        yAlign: "bottom",
                        xAlign: "center",
                        enabled: true,
                        displayColors: false,
                        bodyColor: theme.colors.primary[200],
                        backgroundColor: theme.colors.primary[800],
                        titleColor: theme.colors.primary[400],
                        titleAlign: "center",
                        titleFont: {
                            size: parseInt(theme.font.size.medium),
                        },
                        bodyFont: {
                            family: theme.font.family,
                            size: parseInt(theme.font.size.small),
                        },
                    },
                    legend: {
                        labels: {
                            padding: isSmall ? 16 : 32,
                            boxWidth: isSmall ? 10 : 14,
                            boxHeight: isSmall ? 10 : 14,
                            font: {
                                family: theme.font.family,
                                size: parseInt(
                                    isSmall
                                        ? theme.font.size.small
                                        : theme.font.size.medium
                                ),
                                weight: theme.font.weight.semiBold.toString(),
                            },
                        },
                    },
                },
                elements: {
                    point: {
                        radius: isSmall ? 2 : 4,
                        hoverRadius: isSmall ? 3 : 5,
                    },
                    line: {
                        borderCapStyle: "round",
                        borderJoinStyle: "round",
                        borderWidth: isSmall ? 3 : 5,
                        tension: 0.2,
                    },
                },
                aspectRatio: isSmall ? width / 364 : 1.75,
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
                                size: parseInt(
                                    isSmall
                                        ? theme.font.size.xsmall
                                        : theme.font.size.small
                                ),
                            },
                            padding: isSmall ? 8 : 16,
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
                                size: parseInt(
                                    isSmall
                                        ? theme.font.size.xsmall
                                        : theme.font.size.small
                                ),
                            },
                            padding: isSmall ? 8 : 16,
                            maxTicksLimit: 4,
                        },
                    },
                },
            }}
        />
    );
};
