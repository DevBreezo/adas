import React from "react";
import { withRouter, Link } from "react-router-dom";
import firebase from "../../config/firebase";
import { Button, Grid, Typography } from "@material-ui/core";
import useAuth from "../../hooks/useAuth";

const Dashboard = props => {
  const user = useAuth();

  const handleSignOut = () => {
    const { history } = props;
    firebase
      .auth()
      .signOut()
      .then(res => {
        history.push("/");
      })
      .catch(err => {
        // Handle errors
        history.push("/");
      });
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item>
        <Typography variant="h6">Olá, {user.email}</Typography>
      </Grid>
      <Grid item>
        <Button onClick={handleSignOut} size="small" variant="contained">
          sair
        </Button>
      </Grid>
      <Grid item>
        <Link to="/test">test</Link>
      </Grid>
    </Grid>
  );
};

export default withRouter(Dashboard);
