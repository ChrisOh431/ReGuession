import React from "react";

import { Typography } from "@mui/material";
import { ContainerPaper } from "./RegressionChartContainer";

type ScorePanelProps = {
    score: string
}
export const ScorePanel = ({ score }: ScorePanelProps) => {
    let scoreVal: number;

    try {
        scoreVal = parseInt(score);
    }
    catch {
        scoreVal = 0;
    }

    return (
        <ContainerPaper elevation={0} sx={{
            width: "25%",
            padding: "2% 10%",
            marginBottom: "0.6em",
            textAlign: "center",
        }}>
            <Typography variant="h3" color={scoreVal > 0 ? "green" : scoreVal < 0 ? "red" : "black"}>
                {score}
            </Typography>
        </ContainerPaper>
    );
}