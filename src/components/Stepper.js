import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Stepper, Step, StepLabel, StepConnector } from "@material-ui/core";
import { CompareArrows, Done, DoubleArrow } from "@material-ui/icons";

const useColorlibStepIconStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage: "linear-gradient(45deg, #556b2f82, darkolivegreen)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    color: theme.palette.secondary.main,
  },
  completed: {
    backgroundColor: "#ccc",
  },
}));

const useStyles = makeStyles({
  root: {
    backgroundColor: "transparent",
    padding: 0,
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <CompareArrows />,
    2: <Done />,
    3: <DoubleArrow />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const StepLabelComp = withStyles({
  label: {
    color: "#ccc",
    fontWeight: "bold",
    "&$active": { color: "#8ecf1d", fontWeight: "bold" },
  },
  active: { color: "darkolivegreen" },
})(StepLabel);

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage: "linear-gradient(45deg, #556b2f82, darkolivegreen)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage: "linear-gradient(45deg, #556b2f82, darkolivegreen)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "darkolivegreen",
    borderRadius: 1,
  },
})(StepConnector);

function getSteps() {
  return ["Drawing Arrow", "Arrow Drawn", "Released"];
}

export const StepperComp = (props) => {
  const classes = useStyles();
  const { activeStep } = props;
  const steps = getSteps();
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      connector={<ColorlibConnector />}
      className={classes.root}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabelComp StepIconComponent={ColorlibStepIcon}>
            {label}
          </StepLabelComp>
        </Step>
      ))}
    </Stepper>
  );
};
