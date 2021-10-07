import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Box, Grid } from "@material-ui/core";
import targetImg from "../media/target.png";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 960,
    margin: "0 auto",
  },
  paper: {
    backgroundColor: "#000000e0",
    padding: theme.spacing(4, 2),
    width: "100%",
  },
  itemContainer: {
    borderBottom: `1px solid ${theme.palette.primary.light}`,
  },
}));

export const ResultsModal = (props) => {
  const classes = useStyles();

  const handleClick = () => {
    props.setResultsModalOpen(false);
  };

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
            <Box width={1} textAlign="left">
              <Close color="primary" onClick={handleClick} />
            </Box>
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

            <Box textAlign="center" width={1} pt={4}>
              <img src={targetImg} alt="target" />
            </Box>

            <Grid
              container
              item
              alignItems="center"
              className={classes.itemContainer}
            >
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
            <Grid
              container
              item
              alignItems="center"
              className={classes.itemContainer}
            >
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
              className={classes.itemContainer}
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
