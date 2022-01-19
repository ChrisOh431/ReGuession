import React from "react";

import { ModalUnstyled, styled, Typography } from "@mui/material";
import { ContainerPaper } from "./RegressionChartContainer";

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
	width: {xs: "80%", md: "50%"},
	bgcolor: 'background.paper',
	p: 2,
	px: 4
};

type GreetingModalProps = {
    open: boolean;
    handleOpen(): void;
    handleClose(): void;
}
export const GreetingModal = ({open, handleOpen, handleClose}: GreetingModalProps) => {
    return (<StyledModal
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
    >
        <ContainerPaper sx={style}>
            <Typography variant='h4' fontWeight={500}>
                📈 Reguession
            </Typography>
            <Typography variant='h5' fontWeight={300}>
                Welcome!
            </Typography>

            <Typography variant='body1' fontSize={"1.25em"} gutterBottom>
                Guess the linear regression as accurately as possible to gain points!
            </Typography>

            <Typography variant='body1'>
                Beware the massive penalty given by being completely innacurate.
            </Typography>

        </ContainerPaper>
    </StyledModal>);
}