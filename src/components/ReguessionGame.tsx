import React from "react";

import ReguessionChartContainer from "./RegressionChartContainer";
import regression_datasets from "../reguessiondatasets.json";
import { RegressionDataset } from "../scripts/regressiondata";


import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";


const TallStack = styled(Stack)(({ theme }) => ({
	height: "100%",
	backgroundColor: theme.palette.background.default,
}));

export default function ReguessionGame() {
	let dataset_objects: RegressionDataset[] = [];

	for (let dataset of regression_datasets) {
		let deserialized_data: RegressionDataset = {
			x_vals: [],
			y_vals: [],
			coeff: 0,
			y_int: 0,
		};

		Object.assign(deserialized_data, dataset);
		dataset_objects.push(deserialized_data);
	}

	let history = new Array(dataset_objects.length).fill(() => Math.floor(Math.random()*dataset_objects.length));

	const [dataset_history, set_dataset_history] = React.useState<number[]>(history);
	const [current_dataset, change_dataset] = React.useState<RegressionDataset>(dataset_objects[history[0]]);

	console.log(`Datasets: ${history}\n`);
	console.log(`Dataset Objects:\n`);
	for (let set of history)
	{
		console.log(dataset_objects[set]);	
	}

	let current = dataset_objects[history[0]]; 
	console.log(`Current Dataset:\n`);
	console.log(current);

	return (
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
		</TallStack>
	);
}
