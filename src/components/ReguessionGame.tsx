import React from "react";

import ReguessionChartContainer from "./RegressionChartContainer";

import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";

import regression_datasets from "../reguessiondatasets.json";

import { RegressionDataset } from "../scripts/regressiondata" 

const TallStack = styled(Stack)(({ theme }) => ({
	height: "100%",
	backgroundColor: theme.palette.background.default,
}));

export default function ReguessionGame() {
	let sets: RegressionDataset[] = [];

	for (let dataset in regression_datasets)
	{
		let deserializeddata: RegressionDataset = {
			x_vals: [],
			y_vals: [],
			coeff: 0,
			y_int: 0
		};

		Object.assign(deserializeddata, dataset);
		console.log(deserializeddata);
		sets.push(deserializeddata);
	}

	<TallStack
		direction={{ xs: "column", md: "row" }}
		alignContent="flex-start"
		spacing={{ xs: 0, md: 0 }}
	>
		<Box
			display="flex"
			justifyContent="center"
			alignItems={"center"}
			padding={{ xs: "0.5em", md: "5.8%" }}
			width={{ xs: "100%", md: "60%" }}
		/>
		<Stack
			justifyContent={{ xs: "flex-start", md: "flex-end" }}
			alignItems={"center"}
			width={{ xs: "100%", md: "40%" }}
			spacing={{ xs: 2, md: 2 }}
		>
			<Stack
				direction={"row"}
				justifyContent={"center"}
				alignItems={"center"}
				width={{ xs: "90%", md: "50%" }}
				marginTop={{ xs: "2%" }}
				spacing={{ xs: 2, md: 2 }}
			></Stack>
		</Stack>
	</TallStack>;
}
