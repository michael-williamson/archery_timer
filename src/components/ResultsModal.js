import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Box, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#000000f2",
    // color: theme.palette.primary.main,
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    width: "100%",
  },
  span: {
    // color: "#8dda20",
    // fontSize: "3rem",
    // marginLeft: ".75rem",
  },
}));

export const ResultsModal = (props) => {
  const classes = useStyles();
  return (
    <div>
      {" "}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.resultsModalOpen}
        onClose={() => props.setResultsModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.resultsModalOpen}>
          <Grid container className={classes.paper} spacing={4}>
            <Box
              color="primary.main"
              fontSize={32}
              textAlign="center"
              mt={2}
              mb={0}
              mx="auto"
              fontWeight="bold"
              py={2}
              px={2}
              border={2}
              borderColor="primary.light"
            >
              Arrow Speed Stats
            </Box>
            <Grid container item alignItems="center">
              <Grid item>
                <Box
                  // id="transition-modal-title"
                  fontSize={25}
                  color="primary.main"
                  pr={1}
                  fontWeight="bold"
                >
                  Velocity:
                </Box>
              </Grid>
              <Grid item>
                <Box color="primary.light" fontSize={48} fontWeight={500}>
                  {props.feetPerSecond} fps
                </Box>
              </Grid>
            </Grid>
            <Grid container item alignItems="center">
              <Grid item>
                <Box
                  fontSize={25}
                  fontWeight="bold"
                  color="primary.main"
                  pr={1}
                >
                  Distance:
                </Box>
              </Grid>
              <Grid item>
                <Box color="primary.light" fontSize={48} fontWeight={500}>
                  {props.distanceTilTarget} yards
                </Box>
              </Grid>
            </Grid>
            <Grid
              container
              item
              id="transition-modal-description"
              alignItems="center"
            >
              <Grid item>
                <Box
                  fontSize={25}
                  fontWeight="bold"
                  color="primary.main"
                  pr={1}
                >
                  It takes
                </Box>
                <Box color="primary.light" fontSize={48} fontWeight={500}>
                  {props.timeTilTarget} milliseconds
                </Box>
                <Box fontSize={25} fontWeight="bold" color="primary.main">
                  to reach the target
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
};
