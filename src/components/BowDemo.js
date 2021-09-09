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

export const BowDemo = () => {
  const [drawing, setDrawing] = useState("Countdown Sequence");
  const [showCounter, setShowCounter] = useState(false);
  const [counter, setCounter] = useState(3);
  const [animationPlayState, setAnimationPlayState] = useState("paused");
  const [animationFillMode, setAnimationFillMode] = useState("forwards");
  const [feetPerSecond, setFeetPerSecond] = useState(170);
  const [timeTilTarget, setTimeTilTarget] = useState(120);
  const [distanceTilTarget, setDistanceTilTarget] = useState(20);
  const [resultsModalOpen, setResultsModalOpen] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

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
      position: "relative",
    },
    target: {
      width: 200,
      height: 150,
      borderRadius: "50%",
      background: "radial-gradient(#ee0000, white)",
      transform: "rotateY( 70deg)",
      position: "absolute",
      top: 0,
      right: -30,
      marginTop: 20,
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    if (resultsModalOpen) {
      //setting state back to default
      setAnimationFillMode("initial");
      setShowCounter(false);
      setCounter(3);
      setDrawing("Countdown Sequence");
      setBtnDisabled(false);
    }
  }, [resultsModalOpen]);

  useEffect(() => {
    const arrowImpactAudio = new Audio(arrowImpactURL);
    const applauseAudio = new Audio(applauseURL);
    if (!counter) {
      //before animation runs make sure animation will leave arrow in target
      setAnimationFillMode("forwards");
      setAnimationPlayState("running");
      setTimeout(() => {
        arrowImpactAudio.play();
      }, timeTilTarget);
      setDrawing("Released");
      setTimeout(() => {
        setResultsModalOpen(true);
        applauseAudio.play();
      }, timeTilTarget + 2000);
    }
    counter > 0 &&
      showCounter &&
      setTimeout(() => setCounter(counter - 1), 1000) &&
      setDrawing("Releasing in");
  }, [counter, showCounter, timeTilTarget]);

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
    setDrawing("Drawing Arrow");
    setTimeout(() => {
      setDrawing("Arrow Drawn");
    }, 3000);
    // begins the countdown in useEffect Hook by setting showCounter to true
    setTimeout(() => {
      setShowCounter(true);
    }, 5000);
  };

  return (
    <Grid
      container
      item
      alignItems="center"
      direction="column"
      xs={12}
      spacing={5}
    >
      <Grid container item xs={4} justifyContent="center" direction="column">
        <FormControl margin="normal">
          <OutlinedInput
            classes={{ root: classes.muiOutlinedInput }}
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
        <FormControl margin="normal">
          <OutlinedInput
            classes={{ root: classes.muiOutlinedInput }}
            value={distanceTilTarget}
            type="number"
            error={minMaxValidationFn(10, 300, distanceTilTarget)}
            onChange={handleChange("yards")}
            endAdornment={<InputAdornment position="end">yards</InputAdornment>}
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

      <Grid
        container
        item
        xs={12}
        alignItems="center"
        direction="column"
        spacing={2}
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
        <Grid item xs={8}>
          <Typography
            variant="h6"
            component="h6"
            color="primary"
            classes={{ root: classes.muiCountdownText }}
          >
            {drawing}
          </Typography>
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
        classes={{ root: classes.muiArrowContainer }}
        alignContent="center"
      >
        <Arrow
          animationPlayState={animationPlayState}
          animationFillMode={animationFillMode}
          timeTilTarget={timeTilTarget}
        />
        <div className={classes.target}></div>
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
