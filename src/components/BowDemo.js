import React, { useEffect, useState } from "react";
import { Arrow } from "./Arrow";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { TrackChanges, ArrowRightAlt } from "@material-ui/icons";
import bowDrawAudioURL from "../media/bow_draw.mp3";
import arrowImpactURL from "../media/arrow_impact.mp3";

export const BowDemo = () => {
  const [drawing, setDrawing] = useState("Click to Draw Arrow");
  const [showCounter, setShowCounter] = useState(false);
  const [counter, setCounter] = useState(3);
  const [animationPlayState, setAnimationPlayState] = useState("paused");

  useEffect(() => {
    !counter && setAnimationPlayState("running");
    counter > 0 &&
      showCounter &&
      setTimeout(() => setCounter(counter - 1), 1000) &&
      setDrawing("Releasing");

    console.log(new Date());
    console.log(counter, "counter in useEffect");
  });

  const archeryDrawSequence = () => {
    const bowDrawAudio = new Audio(bowDrawAudioURL);
    const arrowImpactAudio = new Audio(arrowImpactURL);
    bowDrawAudio.play();
    setDrawing("Drawing Arrow");
    setTimeout(() => {
      setDrawing("Arrow Drawn");
    }, 3000);

    setTimeout(() => {
      setShowCounter(true);
    }, 5000);

    setTimeout(() => {
      arrowImpactAudio.play();
    }, 9000);
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <IconButton onClick={() => archeryDrawSequence()}>
          <TrackChanges fontSize="large" />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" component="h3">
          {drawing}
        </Typography>
        {counter > -1 && showCounter === true ? (
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
        <Arrow animationPlayState={animationPlayState} />
      </Grid>
    </Grid>
  );
};
