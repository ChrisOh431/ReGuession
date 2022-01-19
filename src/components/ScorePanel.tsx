import React from "react";

import { Box, Button, ModalUnstyled, Stack, styled, Typography } from "@mui/material";
import { ContainerPaper } from "./RegressionChartContainer";

interface ScorePanelProps {
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
            width: { xs: "60%", md: "45%" },
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

const StyledModal = styled(ModalUnstyled)`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
    width: { xs: "80%", md: "45%" },
    bgcolor: 'background.paper',
    p: 2,
    px: 4
};

interface EndScoreModalProps extends ScorePanelProps {
    open: boolean,
    averageRsq: number,
    replay(): void
}
export const EndScorePanel = ({ open, score, averageRsq, replay }: EndScoreModalProps) => {
    let scoreVal: number;

    try {
        scoreVal = parseInt(score);
    }
    catch {
        scoreVal = 0;
    }

    return (<StyledModal
        open={open}
        BackdropComponent={Backdrop}
    >
        <ContainerPaper sx={style}>
            <Typography variant='h4' fontWeight={500}>
                📈 Reguession
            </Typography>
            <Typography variant='h5' fontWeight={300}>
                Good Game!
            </Typography>

            <Stack direction={"row"} justifyContent="space-around" alignItems={"center"} mt={"0.5rem"}>
                <Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Typography variant="h5" fontSize={"2rem"}>
                        Total Score
                    </Typography>
                    <Typography variant="h3" color={scoreVal > 0 ? "green" : scoreVal < 0 ? "red" : "black"}>
                        {score}
                    </Typography>
                </Stack>

                <Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Typography variant="h5" fontSize={"2rem"}>
                        Average <var>R<sup>2</sup></var>
                    </Typography>
                    <Typography variant="h3" color={averageRsq > 0 ? "green" : averageRsq < 0 ? "red" : "black"}>
                        {averageRsq}
                    </Typography>
                </Stack>
            </Stack>

            <Box display="flex" alignItems={"center"} justifyContent={"center"} mt={"1rem"}>
                <Button size="large" variant="contained" color="primary" onClick={replay}>Replay</Button>
            </Box>
        </ContainerPaper>
    </StyledModal>);
}