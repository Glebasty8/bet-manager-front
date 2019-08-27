import React, { Component } from 'react';
import { Formik } from 'formik';
import * as yup from "yup";
import Link from 'next/link';
import Router from 'next/router'
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import theme from 'src/theme';
import api from 'src/api';
import ArbitroIcon from '../static/svg/arbitro.svg';

const styles = () => {
    return {
        root: {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 400,
        },
        button: {
            margin: theme.spacing(1),
        },
        icon: {
            width: '350px'
        }
    }
};

class ForgotPassword extends Component {
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
                    Forgot Password?
                </Typography>
                <img
                    className={classes.icon}
                    src={ArbitroIcon}
                    alt="Arbitrator"
                />
                <Formik
                    initialValues={{
                        email: '',
                    }}
                    validationSchema={() => yup.object().shape({
                        email: yup
                            .string()
                            .email('Invalid email address')
                            .required('Email is required!'),
                    })}
                    onSubmit={async (values, { setSubmitting, setStatus }) => {
                        const res = await api.forgotPassword(values);
                        console.log('res', res);
                        if (res.ok && res.status === 200) {
                            Router.push('/successfully-sent')
                        } else {
                            const { message } = await res.json();
                            setStatus(message);
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
                          touched,
                          status,
                          setStatus
                      }) => {
                        return (
                            <form autoComplete="off" onSubmit={handleSubmit}>
                                <Typography variant="subtitle1" gutterBottom align="center">
                                    We’ll email you a link to reset your password
                                </Typography>
                                <FormControl>
                                    <span className="error centred">{status}</span>
                                    <TextField
                                        autoComplete="off"
                                        name="email"
                                        label="Enter your email"
                                        className={classes.textField}
                                        margin="normal"
                                        value={values.email}
                                        onChange={(e) => {
                                            setStatus('');
                                            handleChange(e);
                                        }}
                                        onBlur={handleBlur}
                                        error={!!touched.email && !!errors.email}
                                        helperText={errors.email && touched.email ? errors.email : ''}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        disabled={isSubmitting}
                                    >
                                        Send
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={() => Router.push('/login')}
                                    >
                                        Back
                                    </Button>
                                    <Typography align="center">New to BetManager?
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

export default withStyles(styles)(ForgotPassword);
