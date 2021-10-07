import React from "react";
import { Grid } from "@material-ui/core";
import { ArrowRightAlt } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    animationName: `$arrowShoot`,
    animationFillMode: "forwards",
    animationDuration: (props) => `${props.timeTilTarget || 1000}ms`,
    animationPlayState: (props) => props.animationPlayState,
    animationTimingFunction: "linear",
    animationIterationCount: 1,
    height: 150,
    zIndex: 1111,
  },
  "@keyframes arrowShoot": {
    "0%": { transform: "translateX(0%)" },
    //width of 68px for target and slight margin include in calculation 100% - 34px places the arrow at the end of the parent div after animation and translateX
    "100%": { transform: "translateX(calc(100% - 34px))" },
  },
  arrowSVG: {
    fontSize: 80,
    //width of 68px for target and slight margin include in calculation 100% - 34px places the arrow at the end of the parent div after animation and translateX
    width: 80,
  },
});

function ArrowComp(props) {
  const classes = useStyles(props);
  return (
    <Grid
      container
      item
      alignContent="center"
      className={props.cycleAnimationClass ? null : classes.root}
    >
      <ArrowRightAlt className={classes.arrowSVG} />
    </Grid>
  );
}

export const Arrow = (mainProps) => {
  return <ArrowComp {...mainProps} />;
};
