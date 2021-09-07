import React, { useEffect, useState } from "react";
import { Arrow } from "./Arrow";
import { Grid, IconButton, Typography, Input } from "@material-ui/core";
import { TrackChanges } from "@material-ui/icons";
import bowDrawAudioURL from "../media/bow_draw.mp3";
import arrowImpactURL from "../media/arrow_impact.mp3";

export const BowDemo = () => {
  const [drawing, setDrawing] = useState("Click to Draw Arrow");
  const [showCounter, setShowCounter] = useState(false);
  const [counter, setCounter] = useState(3);
  const [animationPlayState, setAnimationPlayState] = useState("paused");
  const [feetPerSecond, setFeetPerSecond] = useState(170);
  const [timeTilTarget, setTimeTilTarget] = useState(120);
  const [distanceTilTarget, setDistanceTilTarget] = useState(210);

  useEffect(() => {
    const arrowImpactAudio = new Audio(arrowImpactURL);
    if (!counter) {
      setAnimationPlayState("running");
      setTimeout(() => {
        arrowImpactAudio.play();
      }, timeTilTarget);
    }
    counter > 0 &&
      showCounter &&
      setTimeout(() => setCounter(counter - 1), 1000) &&
      setDrawing("Releasing");
  });

  const handleChange = (prop) => (event) => {
    const timeTilTargetCalculator = (fps, distance) => {
      console.log(distance, "distance in yards");
      let val = (distance * 3) / fps;
      val = val * 1000;
      val = val.toFixed();
      setTimeTilTarget(val);
    };

    console.log(prop, "prop in console");

    "fps" === prop
      ? timeTilTargetCalculator(event.target.value, distanceTilTarget)
      : timeTilTargetCalculator(feetPerSecond, event.target.value);
    "fps" === prop
      ? setFeetPerSecond(event.target.value)
      : setDistanceTilTarget(event.target.value);
  };

  const archeryDrawSequence = () => {
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
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <IconButton onClick={() => archeryDrawSequence()}>
          <TrackChanges fontSize="large" />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <Input value={feetPerSecond} onChange={handleChange("fps")} />
      </Grid>
      <Grid item xs={12}>
        <Input value={distanceTilTarget} onChange={handleChange("yards")} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" component="h3">
          {drawing}
        </Typography>
        {counter > -1 && showCounter ? (
          <Typography variant="h3" component="h3">
            {counter}
          </Typography>
        ) : (
          <Typography variant="h3" component="h3">
            {" ..."}
          </Typography>
        )}
      </Grid>
      <Grid container item xs={12}>
        <Arrow
          animationPlayState={animationPlayState}
          timeTilTarget={timeTilTarget}
        />
      </Grid>
    </Grid>
  );
};
