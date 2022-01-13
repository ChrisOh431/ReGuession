import React from "react";

import ReguessionChartContainer from "./RegressionChartContainer";

import {
	Regression,
	RegressionDataset,
	RegressionType,
	test_data,
	compare_regressions,
	RegressionComparison
} from "../scripts/regressiondata";

import regressions from "../reguessiondatasets.json";

import { styled } from "@mui/material/styles";
import { Box, Button, Paper, Slider, Stack, Typography } from "@mui/material";
import { padding } from "@mui/system";
import SidePanel from "./SIdePanel";
import { compare } from "mathjs";

const TallStack = styled(Stack)(({ theme }) => ({
	height: "100vh",
	backgroundColor: theme.palette.background.default,
}));

let history = test_data.map(() =>
	Math.floor(Math.random() * test_data.length)
);


console.log(`Datasets: ${history}\n`);
console.log(`Datasets Objects:\n`);
for (let set of history) {
	console.log(test_data[set]);
}

let current = test_data[history[0]];
console.log(`Current Dataset:\n`);
console.log(history[0]);

export default function ReguessionGame() {
	const [dataset_history, set_dataset_history] =
		React.useState<number[]>(history);
	const [current_dataset, change_dataset] = React.useState<RegressionDataset>(
		test_data[history[0]]
	);

	let answer_reg: Regression<RegressionType.Answer> = { reg_type: RegressionType.Answer, slope: current_dataset.coeff, y_int: current_dataset.y_int }

	const [slope_guess, update_slope_guess] = React.useState(0);
	const [y_int_guess, update_y_int_guess] = React.useState(50);

	const [results_panel_vis, toggle_results_panel] = React.useState(false);

	const [results, update_results] = React.useState<RegressionComparison>(compare_regressions(current_dataset, { reg_type: RegressionType.Guess, slope: slope_guess, y_int: y_int_guess }, answer_reg));

	const changeSlope = (event: Event, newValue: number | number[]) => {
		update_slope_guess(newValue as number);
	};

	const changeYInt = (event: Event, newValue: number | number[]) => {
		update_y_int_guess(newValue as number);
	};

	const guessClicked = (reg_a: Regression<RegressionType>, reg_b: Regression<RegressionType>) => {
		let results = compare_regressions(current_dataset, reg_a, reg_b);

		console.dir(results);
		update_results(results)

		toggle_results_panel(true);
	}

	const nextClicked = () => {
		toggle_results_panel(false)
	}

	const resetClicked = () => {
		update_slope_guess(0)
		update_y_int_guess(0)
	}

	return (
		<>
			<TallStack
				direction={{ xs: "column", md: "row" }}
				alignContent="flex-start"
				spacing={{ xs: 0, md: 0 }}
			>
				<Box
					display="flex"
					flexDirection={"column"}
					justifyContent="center"
					alignItems={"center"}
					padding={{ xs: "0.5em", md: "2%" }}
					width={{ xs: "100%", md: "60%" }}
				>
					<Paper sx={{
						width: "25%",
						marginBottom: "0.6em"
					}}>
						<Box
							padding={"0.7em"}
						>
							swag
						</Box>
					</Paper>
					<ReguessionChartContainer
						dataset={current}
						regressions={[
							{
								reg_type: RegressionType.Guess,
								slope: slope_guess,
								y_int: y_int_guess,
							},
							{
								reg_type: RegressionType.Answer,
								slope: current_dataset.coeff,
								y_int: current_dataset.y_int
							}
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
						<SidePanel
							answer={answer_reg}
							guess={{ reg_type: RegressionType.Guess, slope: slope_guess, y_int: y_int_guess }}
							results={results}
							results_panel_vis={results_panel_vis}
							guessClicked={guessClicked}
							change_guess_slope={changeSlope}
							change_guess_yint={changeYInt}
							reset_clicked={resetClicked}
							next_clicked={() => { }}
						/>
					</Stack>
				</Stack>
			</TallStack>
		</>
	);
}
