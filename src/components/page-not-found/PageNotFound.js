import React from "react";
import { Typography, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh"
  },
  paper: {
    padding: "2rem",
    backgroundColor: "red"
  }
});

const PageNotFound = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item>
        <Paper className={classes.paper}>
          <Typography variant="h5">PAGE NOT FOUND</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PageNotFound;
