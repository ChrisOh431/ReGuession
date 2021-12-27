import React from "react";

import ReguessionChartContainer from "./RegressionChartContainer";


import {
	Regression,
	RegressionDataset,
	RegressionType,
	test_data,
} from "../scripts/regressiondata";

import { styled } from "@mui/material/styles";
import { Box, Paper, Slider, Stack, Typography } from "@mui/material";
import { padding } from "@mui/system";

const TallStack = styled(Stack)(({ theme }) => ({
	height: "100vh",
	backgroundColor: theme.palette.background.default,
}));

let history = test_data.map(() =>
	Math.floor(Math.random() * test_data.length)
);

export default function ReguessionGame() {
	const [dataset_history, set_dataset_history] =
		React.useState<number[]>(history);
	const [current_dataset, change_dataset] = React.useState<RegressionDataset>(
		test_data[history[0]]
	);

	const [slope_guess, update_slope_guess] = React.useState(0);
	const [y_int_guess, update_y_int_guess] = React.useState(50);

	const [regression_guess, update_regression_guess] = React.useState<
		Regression<RegressionType.Guess>
	>({ reg_type: RegressionType.Guess, slope: 0, y_int: 0 });

	const [regression_answer, update_regression_answer] = React.useState<
		Regression<RegressionType.Answer>
	>({
		reg_type: RegressionType.Answer,
		slope: current_dataset.coeff,
		y_int: current_dataset.y_int,
	});

	console.log(`Datasets: ${history}\n`);
	console.log(`Datasets Objects:\n`);
	for (let set of history) {
		console.log(test_data[set]);
	}

	let current = test_data[history[0]];
	console.log(`Current Dataset:\n`);
	console.log(current);

	const changeSlope = (event: Event, newValue: number | number[]) => {
		update_slope_guess(newValue as number);
	};

	const changeYInt = (event: Event, newValue: number | number[]) => {
		update_y_int_guess(newValue as number);
	};

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
				<ReguessionChartContainer
					dataset={current}
					regressions={[
						{
							reg_type: RegressionType.Guess,
							slope: slope_guess,
							y_int: y_int_guess,
						},
						regression_answer,
					]}
				/>
			</Box>
			<Stack
				justifyContent={{ xs: "flex-start", md: "flex-end" }}
				alignItems={"center"}
				width={{ xs: "100%", md: "40%" }}
				spacing={{ xs: 2, md: 2 }}
			>
				<Stack
					direction={"column"}
					justifyContent={"center"}
					alignItems={"center"}
					width={{ xs: "90%", md: "80%" }}
					height={{ md: "100%" }}
					marginTop={{ xs: "2%" }}
					spacing={{ xs: 2, md: 2 }}
				>
					<Paper variant="outlined" sx={{
						width: "100%",
						padding: "5%"
					}}>
						<Stack
							direction={"column"}
							justifyContent={"center"}
							alignItems={"center"}>
							<Typography variant="h5">
								Slope: {Math.round(slope_guess * 10) / 10}
							</Typography>
							<Typography variant="h5">
								Y-Intercept: {y_int_guess}
							</Typography>
							<Slider value={slope_guess} min={-10} max={10} step={0.001} onChange={changeSlope} sx={{marginTop:"5%"}} />
							<Slider value={y_int_guess} onChange={changeYInt} />
						</Stack>
					</Paper>
				</Stack>
			</Stack>
		</TallStack>
	);
}
