import React from "react";

import ReguessionChartContainer from "./RegressionChartContainer";
import regression_datasets from "../reguessiondatasets.json";
import {
	Regression,
	RegressionDataset,
	RegressionType,
	test_data
} from "../scripts/regressiondata";

import { styled } from "@mui/material/styles";
import { Box, Slider, Stack } from "@mui/material";

const TallStack = styled(Stack)(({ theme }) => ({
	height: "100%",
	backgroundColor: theme.palette.background.default,
}));

export default function ReguessionGame() {
	let history = test_data.map(() =>
		Math.floor(Math.random() * test_data.length)
	);

	const [dataset_history, set_dataset_history] =
		React.useState<number[]>(history);
	const [current_dataset, change_dataset] = React.useState<RegressionDataset>(
		test_data[history[0]]
	);

	const [regression_guess, update_regression_guess] = React.useState<
		Regression<RegressionType.Guess>
	>({ reg_type: RegressionType.Guess, slope: 0, y_int: 0 });

	console.log(`Datasets: ${history}\n`);
	console.log(`Datasets Objects:\n`);
	for (let set of history) {
		console.log(test_data[set]);
	}

	let current = test_data[history[0]];
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
				padding={{ xs: "0.5em", md: "2%" }}
				width={{ xs: "100%", md: "60%" }}
			>
				<ReguessionChartContainer dataset={current} regressions={[regression_guess]}/>
			</Box>
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
				>
					<Slider />
				</Stack>
			</Stack>
		</TallStack>
	);
}
