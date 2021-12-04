import React from "react";
import {
	Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,ChartOptions,
	ChartData,
	CoreChartOptions,
} from "chart.js";

import { Scatter } from "react-chartjs-2";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import { RegressionDataSet, RegressionGuess } from "../scripts/regressiondata";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

type SortingChartContainerProps = {
	regression_data: RegressionDataSet;
    user_guess: RegressionGuess;
};

const ContainerPaper = styled(Paper)(({ theme }) => ({
	height: "fit-content",
	width: "100%",
	position: "relative",
	border: `2px solid ${theme.palette.divider}`,
	margin: "0.1rem 0",
}));

export const SortingChartContainer = ({
	chart_data,
	true_max,
}: SortingChartContainerProps) => {
	const chart_options: ChartOptions = {
		maintainAspectRatio: true,
		aspectRatio: 2,
		animation: false,
		responsive: true,
		layout: {
			padding: 5,
		},
		plugins: {
			tooltip: {
				enabled: false,
			},
			legend: { display: false },
		},
		scales: {
			yAxes: {
				display: false,
			},
			xAxes: {
				display: false,
			},
		},
	};

	return (
		<ContainerPaper elevation={2} sx={{}}>
			<Scatter
				options={chart_options as CoreChartOptions<"bar">}
				data={chart_data as ChartData<"bar", number[]>}
				key={chart_data.datasets[0].label? chart_data.datasets[0].label : ind }
			/>
		</ContainerPaper>
	);
};
