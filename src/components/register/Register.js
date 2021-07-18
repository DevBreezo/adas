import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { withFormik, Form, Field } from "formik";
import { string, object, ref } from "yup";
import firebase from "../../config/firebase";
import { useSnackbar } from "notistack";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: "100vh"
  },
  textField: {
    margin: "0.5rem",
    width: 200
  },
  registerBtn: {},
  paper: {}
}));

const RegisterForm = props => {
  const classes = useStyles();
  const { values, status, isSubmitting, errors } = props;
  const [circularProgress, setCircularProgress] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(true);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  useEffect(() => {
    return console.log(errors);
  }, [errors]);

  useEffect(() => {
    if (isSubmitting) {
      setCircularProgress(isSubmitting);
    } else {
      setCircularProgress(false);
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (errors.type === "success") {
      enqueueSnackbar(errors.message, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "left"
        }
      });
    } else if (errors.type === "error") {
      enqueueSnackbar(errors.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "left"
        }
      });
    } else {
      closeSnackbar();
    }
  }, [enqueueSnackbar, closeSnackbar, errors]);

  return (
    <Grid
      className={classes.container}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Form>
        <Grid item>
          <Grid container direction="column" alignItems="center" spacing={3}>
            <Grid item>
              {circularProgress && <CircularProgress color="primary" />}
            </Grid>
            <Grid item>
              <Typography variant="h4">Register</Typography>
            </Grid>
            <Grid item>
              <Field
                render={({ field, form }) => (
                  <TextField
                    value={values.firstname || ""}
                    name="firstname"
                    label="Firstname"
                    onChange={field.onChange}
                    helperText={
                      form.errors.firstname &&
                      form.touched.firstname &&
                      form.errors.firstname
                    }
                    error={form.errors.firstname && form.touched.firstname}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Field
                render={({ field, form, meta }) => (
                  <TextField
                    value={values.lastname || ""}
                    name="lastname"
                    label="lastname"
                    onChange={field.onChange}
                    helperText={
                      form.errors.lastname &&
                      form.touched.lastname &&
                      form.errors.lastname
                    }
                    error={form.errors.lastname && form.touched.lastname}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Field
                render={({ field, form }) => (
                  <TextField
                    value={values.email || ""}
                    name="email"
                    label="email"
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
                    name="password"
                    value={values.password || ""}
                    type={showPassword ? "password" : "text"}
                    label="password"
                    onChange={field.onChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
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
              <Field
                render={({ field, form }) => (
                  <TextField
                    name="passwordConfirm"
                    value={values.passwordConfirm || ""}
                    type={showPasswordConfirm ? "password" : "text"}
                    label="password confirm"
                    onChange={field.onChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={handleClickShowPasswordConfirm}
                          >
                            {showPasswordConfirm ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    helperText={
                      form.errors.passwordConfirm &&
                      form.touched.passwordConfirm &&
                      form.errors.passwordConfirm
                    }
                    error={
                      form.errors.passwordConfirm &&
                      form.touched.passwordConfirm
                    }
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
                register
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </Grid>
  );
};

const registerValidation = object().shape({
  firstname: string().required(),
  lastname: string().required(),
  password: string()
    .min(6)
    .required(),
  passwordConfirm: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required()
});

export default withFormik({
  handleSubmit: (values, { props, resetForm, setErrors, setSubmitting }) => {
    setSubmitting(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(user => {
        resetForm();
        setErrors({
          type: "success",
          message: "Successfully registered user."
        });
        setSubmitting(false);
        setTimeout(() => {
          props.history.push("/");
        }, 3000);
      })
      .catch(error => {
        setSubmitting(false);
        setErrors({ type: "error", message: error.message });
      });
  },
  validationSchema: registerValidation,
  displayName: "RegisterForm"
})(RegisterForm);
