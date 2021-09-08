import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
          <div className={classes.paper}>
            <h2 id="transition-modal-title">
              Feet Per Second: {props.feetPerSecond}
            </h2>
            <h2>Distance in Yards: {props.distanceTilTarget}</h2>
            <h2 id="transition-modal-description">
              It takes {props.timeTilTarget} milliseconds to reach the target.
            </h2>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
