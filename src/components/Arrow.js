import React from "react";
import { Grid } from "@material-ui/core";
import { ArrowRightAlt } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    animation: `$arrowShoot linear 1 forwards`,
    animationDuration: (props) => `${props.timeTilTarget}ms`,
    animationPlayState: (props) => props.animationPlayState,
  },
  "@keyframes arrowShoot": {
    "0%": { transform: "translateX(0%)" },
    //width of 80px include in calculation 100% - 80px places the arrow at the end of the parent div after animation and translateX
    "100%": { transform: "translateX(calc(100% - 80px))" },
  },
  arrowSVG: {
    fontSize: 80,
    //width of 80px include in calculation 100% - 80px places the arrow at the end of the parent div after animation and translateX
    width: 80,
  },
});

function ArrowComp(props) {
  const classes = useStyles(props);
  return (
    <Grid container item xs={12} className={classes.root}>
      <ArrowRightAlt className={classes.arrowSVG} />
    </Grid>
  );
}

export const Arrow = (mainProps) => {
  return <ArrowComp {...mainProps} />;
};
