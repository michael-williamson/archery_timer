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
  h1: {
    textDecoration: "underline",
    textAlign: "center",
  },
  span: {
    color: "#8dda20",
    fontSize: "3rem",
    marginLeft: ".75rem",
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
            <h1 className={classes.h1}>Arrow Speed Stats</h1>
            <h2 id="transition-modal-title">
              Velocity:{" "}
              <span className={classes.span}>{props.feetPerSecond} fps</span>
            </h2>
            <h2>
              Distance:{" "}
              <span className={classes.span}>
                {props.distanceTilTarget} yards
              </span>
            </h2>
            <h2 id="transition-modal-description">
              It takes{" "}
              <span className={classes.span}>
                {props.timeTilTarget} milliseconds
              </span>{" "}
              to reach the target.
            </h2>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
