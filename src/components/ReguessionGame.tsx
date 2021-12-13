import React from "react";

import ReguessionChartContainer from "./RegressionChartContainer";

import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";

const TallStack = styled(Stack)(({ theme }) => ({
	height: "100%",
	backgroundColor: theme.palette.background.default,
}));

export default function ReguessionGame() {
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
		>
			<ReguessionChartContainer />
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
			></Stack>
		</Stack>
	</TallStack>;
}
