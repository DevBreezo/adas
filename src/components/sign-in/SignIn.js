import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import { makeStyles } from "@material-ui/styles";
import { withRouter, Link } from "react-router-dom";
import { compose } from "redux";
// import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Link as MUILink
} from "@material-ui/core";
// import useFetch from "../../hooks/useFetch";
import { object, string } from "yup";
import { useSnackbar } from "notistack";
// import { red, green, grey } from "@material-ui/core/colors";
// import { authenticationAction } from "../store/ducks/authentication";

import firebase from "../../config/firebase";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "100vh"
  },
  circularProgress: {
    flexGrow: 1,
    height: "10px",
    width: "90vw"
  }
}));

/**
 * Component AuthenticationForm
 */
const SignInForm = props => {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { values, status, isSubmitting } = props;
  const [circularProgress, setCircularProgress] = useState(false);

  useEffect(() => {
    isSubmitting
      ? setCircularProgress(isSubmitting)
      : setCircularProgress(false);
  }, [isSubmitting]);

  useEffect(() => {
    if (status) {
      enqueueSnackbar(status, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "left"
        }
      });
    } else {
      closeSnackbar();
    }
  }, [status, closeSnackbar, enqueueSnackbar]);

  return (
    <Grid
      className={classes.root}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Form>
        <Grid item>
          <Grid container direction="column" alignItems="center" spacing={4}>
            <Grid item>
              {circularProgress && <CircularProgress color="primary" />}
            </Grid>
            <Grid item>
              <Typography variant="h4">Sign In</Typography>
            </Grid>
            <Grid item>
              <Field
                render={({ field, form, meta }) => (
                  <TextField
                    value={values.email || ""}
                    name="email"
                    label="Email"
                    onChange={field.onChange}
                    helperText={
                      form.errors.email &&
                      form.touched.email &&
                      form.errors.email
                    }
                    error={form.errors.email && form.touched.email}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Field
                render={({ field, form }) => (
                  <TextField
                    value={values.password || ""}
                    name="password"
                    label="Password"
                    type="password"
                    onChange={field.onChange}
                    helperText={
                      form.errors.password &&
                      form.touched.password &&
                      form.errors.password
                    }
                    error={form.errors.password && form.touched.password}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item>
              <Typography>
                <Link to="/register">register</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <MUILink
                  component={() => (
                    <Link to="/lost-password">lost your password?</Link>
                  )}
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </Grid>
  );
};

/**
 * Validation Authentication Form
 */
const signInValidation = object().shape({
  email: string()
    .email()
    .required(),
  password: string()
    .min(6)
    .required()
});

/**
 * Redux Compose (swap for ramda.js compose)
 */
const SignIn = compose(
  withRouter,
  withFormik({
    // Handles our submission
    handleSubmit: (values, { props, setSubmitting, setStatus }) => {
      const { history } = props;
      setStatus(false);
      setSubmitting(true);

      firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then(user => {
          setSubmitting(false);
          setStatus(false);
          history.push("/dashboard");
        })
        .catch(error => {
          setSubmitting(false);
          setStatus(error.message);
          // console.log(error.message.toString());
        });
    },
    validationSchema: signInValidation,
    displayName: "SignIn Form"
  })
)(SignInForm);

export default withRouter(SignIn);
