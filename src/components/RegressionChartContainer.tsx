import React from "react";
import {
	Chart as ChartJS,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
	ChartOptions,
	ChartData,
	CoreChartOptions,
} from "chart.js";

import { Scatter } from "react-chartjs-2";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import {
	RegressionDataset,
	Regression,
	RegressionType,
} from "../scripts/regressiondata";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

type SortingChartContainerProps = {
	dataset: RegressionDataset;
	regressions: Regression<RegressionType>[];
};

const ContainerPaper = styled(Paper)(({ theme }) => ({
	height: "fit-content",
	width: "100%",
	position: "relative",
	border: `2px solid ${theme.palette.divider}`,
	margin: "0.1rem 0",
}));

export default function SortingChartContainer({
	dataset,
	regressions,
}: SortingChartContainerProps) {
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

	// build chart dataset here, not in an external manner, then take in cues to know what style to display/data to highlight

	return <ContainerPaper elevation={2} sx={{}}></ContainerPaper>;
}
