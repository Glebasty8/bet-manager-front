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
        },
        forgotPassword: {
            marginRight: '8px'
        }
    }
};

class Login extends Component {
    static getInitialProps() {
       return {
           layout: false
       }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Typography variant="h3" gutterBottom align="left">
                    Log in
                </Typography>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={() => yup.object().shape({
                        email: yup
                            .string()
                            .email('Invalid email address')
                            .required('Email is required!'),
                        password: yup
                            .string()
                            .min(5, 'Minimum password length should be 5 symbols')
                            .required('Password is required!'),
                    })}
                    onSubmit={async (values, { setSubmitting, setStatus }) => {
                        const res = await auth.login(values);
                        if (res.ok) {
                            Router.push('/');
                        } else {
                            setStatus(res.message)
                        }
                        setSubmitting(false);
                    }}
                >
                    {({
                        handleSubmit,
                        isSubmitting,
                        values,
                        handleChange,
                        handleBlur,
                        errors,
                        touched,
                        status,
                        setStatus
                      }) => {
                        return (
                            <form autoComplete="off" onSubmit={handleSubmit}>
                                <FormControl>
                                    <span className="error centred">{status}</span>
                                    <TextField
                                        autoComplete="off"
                                        name="email"
                                        label="Email"
                                        className={classes.textField}
                                        margin="normal"
                                        value={values.email}
                                        onChange={(e) => {
                                            setStatus('');
                                            handleChange(e)
                                        }}
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
                                        onChange={(e) => {
                                            setStatus('');
                                            handleChange(e)
                                        }}
                                        error={!!touched.password && !!errors.password}
                                        helperText={touched.password && errors.password ? errors.password : ''}
                                        onBlur={handleBlur}
                                    />
                                    <Typography align="right">
                                        <Link href="/forgot-password" className={classes.forgotPassword}>
                                            <span className={`link ${classes.forgotPassword}`}>Forgot password?</span>
                                        </Link>
                                    </Typography>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        disabled={isSubmitting}
                                    >
                                        Login
                                    </Button>
                                    <Typography align="center">New to StructShare?
                                        <Link href="/signup">
                                            <span className="link">Sign Up</span>
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

export default withStyles(styles)(Login);
