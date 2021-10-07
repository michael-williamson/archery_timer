import React, { useEffect, useState } from "react";
import { Arrow } from "./Arrow";
import {
  Grid,
  Button,
  Typography,
  InputAdornment,
  FormHelperText,
  OutlinedInput,
  FormControl,
  makeStyles,
} from "@material-ui/core";

import { ResultsModal } from "./ResultsModal";
import { minMaxValidationFn } from "../helperFunctions/minMaxValidationFn";
import { TrackChanges } from "@material-ui/icons";
import bowDrawAudioURL from "../media/bow_draw.mp3";
import arrowImpactURL from "../media/arrow_impact.mp3";
import applauseURL from "../media/applause.mp3";
import { StepperComp } from "./Stepper";

const useStyles = makeStyles((theme) => ({
  muiOutlinedInput: {
    background: theme.palette.secondary.main,
    fontSize: "1.25rem",
  },
  muiFormHelperText: {
    color: theme.palette.primary.contrastText,
    fontSize: "1.25rem",
    backgroundColor: theme.palette.primary.main,
    borderRadius: 7,
    textAlign: "center",
  },
  muiFormErrorText: {
    fontSize: "1rem",
    textAlign: "center",
    borderRadius: 15,
    fontWeight: "bold",
    backgroundColor: "#000000c4",
  },
  muiCountdownDisplay: {
    backgroundColor: "#000000a3",
    borderRadius: 9,
  },
  muiStepperContainer: { padding: "40px 0" },
  muiCountdownText: {
    backgroundColor: theme.palette.secondary.main,
    padding: "0.2rem 2.25rem",
    borderRadius: 11,
    fontWeight: "bold",
  },
  muiCounter: {
    backgroundColor: "black",
    padding: "0.2rem 2.25rem",
    borderRadius: 11,
  },
  muiArrowContainer: {
    backgroundColor: "#fffcf970",
    height: 200,
    padding: 0,
    marginTop: 40,
  },
  targetContainer: {
    marginRight: 5,
  },
  target: {
    width: 68,
    height: 150,
    borderRadius: "50%",
    background: "radial-gradient(#ee0000, #e81717)",
    position: "relative",
    isolation: "isolate",
    "&::after": {
      content: "''",
      position: "absolute",
      inset: "38px 0 0 9px",
      background: "white",
      width: 40,
      height: 75,
      borderRadius: "50%",
      zIndex: -1,
    },
    "&::before": {
      content: "''",
      position: "absolute",
      inset: "57px 0 0 18px",
      background: "red",
      width: 20,
      height: 36,
      borderRadius: "50%",
    },
  },
}));

export const BowDemo = () => {
  const [showCounter, setShowCounter] = useState(false);
  const [counter, setCounter] = useState(3);
  const [animationPlayState, setAnimationPlayState] = useState("paused");
  const [cycleAnimationClass, setCycleAnimationClass] = useState(false);
  const [feetPerSecond, setFeetPerSecond] = useState(170);
  const [timeTilTarget, setTimeTilTarget] = useState(120);
  const [distanceTilTarget, setDistanceTilTarget] = useState(20);
  const [resultsModalOpen, setResultsModalOpen] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  const classes = useStyles();

  useEffect(() => {
    if (resultsModalOpen) {
      //setting state back to default
      setAnimationPlayState("paused");
      setShowCounter(false);
      setCounter(3);
      setBtnDisabled(false);
    }
  }, [resultsModalOpen]);

  useEffect(() => {
    cycleAnimationClass && setCycleAnimationClass(false);
  }, [cycleAnimationClass]);

  useEffect(() => {
    const arrowImpactAudio = new Audio(arrowImpactURL);
    const applauseAudio = new Audio(applauseURL);
    //turn down volume on applause audio
    applauseAudio.volume = 0.15;
    if (!counter) {
      setActiveStep((prevStep) => prevStep + 1);
      setTimeout(() => {
        arrowImpactAudio.play();
      }, timeTilTarget);
      //before animation runs make sure animation will leave arrow in target
      setAnimationPlayState("running");

      setTimeout(() => {
        setResultsModalOpen(true);
        applauseAudio.play();
        setActiveStep(-1);
        !cycleAnimationClass && setCycleAnimationClass(true);
      }, timeTilTarget + 2000);
    }
    counter > 0 &&
      showCounter &&
      setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter, showCounter, timeTilTarget, cycleAnimationClass]);

  const handleChange = (prop) => (event) => {
    const timeTilTargetCalculator = (fps, distance) => {
      let val = (distance * 3) / fps;
      val = val * 1000;
      val = parseInt(val.toFixed());
      setTimeTilTarget(val);
    };

    "fps" === prop
      ? timeTilTargetCalculator(event.target.value, distanceTilTarget)
      : timeTilTargetCalculator(feetPerSecond, event.target.value);
    "fps" === prop
      ? setFeetPerSecond(parseInt(event.target.value))
      : setDistanceTilTarget(parseInt(event.target.value));
  };

  const archeryDrawSequence = () => {
    //disable button to prevent excess function calls that might complicate sequence
    setBtnDisabled(true);
    // created audio objects for each sound
    const bowDrawAudio = new Audio(bowDrawAudioURL);
    //play drawing of the bow
    bowDrawAudio.play();
    //begin sequence of steps with timers
    setActiveStep((prevStep) => prevStep + 1);
    setTimeout(() => {
      setActiveStep((prevStep) => prevStep + 1);
    }, 3000);
    // begins the countdown in useEffect Hook by setting showCounter to true
    setTimeout(() => {
      setShowCounter(true);
    }, 5000);
  };

  return (
    <Grid container item alignItems="center" direction="column" spacing={4}>
      <Grid
        //container for both inputs
        container
        item
        justifyContent="center"
      >
        <Grid item xs={8}>
          <FormControl margin="normal">
            <OutlinedInput
              className={classes.muiOutlinedInput}
              value={feetPerSecond}
              type="number"
              error={minMaxValidationFn(50, 500, feetPerSecond)}
              onChange={handleChange("fps")}
              // aria-describedby="standard-speed-helper-text"
              endAdornment={
                <InputAdornment position="end">feet per second</InputAdornment>
              }
              inputProps={{ "aria-label": "Velocity" }}
            />
            <FormHelperText
              error={minMaxValidationFn(50, 500, feetPerSecond)}
              classes={{ root: classes.muiFormErrorText }}
            >
              {minMaxValidationFn(50, 500, feetPerSecond)
                ? `Entry must be between 50 and 500`
                : ""}
            </FormHelperText>
            <FormHelperText
              id="standard-velocity-helper-text"
              classes={{ root: classes.muiFormHelperText }}
            >
              Velocity
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <FormControl margin="normal">
            <OutlinedInput
              className={classes.muiOutlinedInput}
              value={distanceTilTarget}
              type="number"
              error={minMaxValidationFn(10, 300, distanceTilTarget)}
              onChange={handleChange("yards")}
              endAdornment={
                <InputAdornment position="end">yards</InputAdornment>
              }
              inputProps={{ "aria-label": "Distance" }}
            />
            <FormHelperText
              error={minMaxValidationFn(10, 300, distanceTilTarget)}
              classes={{ root: classes.muiFormErrorText }}
            >
              {minMaxValidationFn(10, 300, distanceTilTarget)
                ? `Entry must be between 10 and 300`
                : ""}
            </FormHelperText>
            <FormHelperText
              id="standard-distance-helper-text"
              classes={{ root: classes.muiFormHelperText }}
            >
              Distance
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Grid
        //container for click button and countdown display
        className={classes.muiCountdownDisplay}
        container
        item
        justifyContent="center"
        xs={10}
      >
        <Grid item xs={12}>
          <Button
            onClick={() => archeryDrawSequence()}
            disabled={btnDisabled}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<TrackChanges fontSize="large" color="secondary" />}
          >
            Click to Draw Bow
          </Button>
        </Grid>
        <Grid item xs={12} className={classes.muiStepperContainer}>
          <StepperComp activeStep={activeStep} />
        </Grid>
        <Grid item xs={8}>
          {counter > -1 && showCounter ? (
            <Typography
              variant="h3"
              component="h3"
              color="primary"
              classes={{ root: classes.muiCounter }}
            >
              {!counter ? "Fire!!" : counter}
            </Typography>
          ) : (
            <Typography
              variant="h3"
              component="h3"
              color="primary"
              classes={{ root: classes.muiCounter }}
            >
              {"..."}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        direction="row"
        wrap="nowrap"
        className={classes.muiArrowContainer}
        alignContent="center"
      >
        {/* arrow is wrapped with a grid item */}
        <Arrow
          animationPlayState={animationPlayState}
          cycleAnimationClass={cycleAnimationClass}
          timeTilTarget={timeTilTarget}
        />

        <Grid item className={classes.targetContainer}>
          <div className={classes.target}></div>
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <ResultsModal
          resultsModalOpen={resultsModalOpen}
          setResultsModalOpen={setResultsModalOpen}
          feetPerSecond={feetPerSecond}
          distanceTilTarget={distanceTilTarget}
          timeTilTarget={timeTilTarget}
        />
      </Grid>
    </Grid>
  );
};
