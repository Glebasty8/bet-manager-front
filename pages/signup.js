import React, { Component } from 'react';
import { Formik } from 'formik';
import Router from "next/router";
import * as yup from 'yup';
import Link from 'next/link';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import theme from 'src/theme';
import AuthService from 'src/utils/AuthService';

const auth = new AuthService();

const styles = () => {
    return {
        root: {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            background: 'url(../static/img/better.svg) no-repeat center center fixed',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 400,
        },
        button: {
            margin: theme.spacing(1),
        }
    }
};

class Signup extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Typography variant="h3" gutterBottom>
                    Sign up
                </Typography>
                <Formik
                    initialValues={{
                        userName: '',
                        email: '',
                        password: ''
                    }}
                    validationSchema={() => yup.object().shape({
                        userName: yup
                            .string()
                            .min(5, 'Minimum username length should be 5 symbols')
                            .required('First name is required'),
                        email: yup
                            .string()
                            .email('Invalid email address')
                            .required('Email is required!'),
                        password: yup
                            .string()
                            .min(5, 'Minimum password length should be 5 symbols')
                            .required('Password is required!'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        const res = await auth.register(values);
                        console.log('res', res);
                        if (res) {
                            Router.push('/')
                        }
                        setSubmitting(false);
                    }}
                >
                    {({
                          handleSubmit,
                          isSubmitting,
                          values,
                          handleChange,
                          errors,
                          handleBlur,
                          touched
                      }) => {
                        return (
                            <form autoComplete="off" onSubmit={handleSubmit}>
                                <FormControl>
                                    <TextField
                                        autoComplete="off"
                                        name="userName"
                                        label="Username"
                                        className={classes.textField}
                                        margin="normal"
                                        value={values.userName}
                                        onChange={handleChange}
                                        error={!!touched.userName && !!errors.userName}
                                        helperText={touched.userName && errors.userName ? errors.userName : ''}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        autoComplete="off"
                                        name="email"
                                        label="Email"
                                        className={classes.textField}
                                        margin="normal"
                                        value={values.email}
                                        onChange={handleChange}
                                        error={!!touched.email && !!errors.email}
                                        helperText={touched.email && errors.email ? errors.email : ''}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        autoComplete="off"
                                        type="password"
                                        name="password"
                                        label="Password"
                                        className={classes.textField}
                                        margin="normal"
                                        value={values.password}
                                        onChange={handleChange}
                                        error={!!touched.password && !!errors.password}
                                        helperText={touched.password && errors.password ? errors.password : ''}
                                        onBlur={handleBlur}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                    >
                                        Sign Up
                                    </Button>
                                    <Typography gutterBottom align="center">
                                        Already a member?
                                        <Link href="/login">
                                            <span className="link">
                                                Login
                                            </span>
                                        </Link>
                                    </Typography>
                                </FormControl>
                            </form>
                        )
                    }}
                </Formik>
            </div>
        );
    }
}

Signup.getInitialProps = async ({ req }) => {
    return { layout: false };
};

export default withStyles(styles)(Signup);
