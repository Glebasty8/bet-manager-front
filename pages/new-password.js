import React, { Component } from 'react';
import { Formik } from 'formik';
import Router from 'next/router';
import * as yup from 'yup';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import theme from 'src/theme';
import api from 'src/api';
import FutbolistaIcon from '../static/svg/futbolista.svg';

const styles = () => {
    return {
        root: {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
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

class NewPassword extends Component {
    static getInitialProps({ query }) {
        return {
            layout: false,
            query
        }
    }

    render() {
        const { classes, query: { token } } = this.props;
        return (
            <div className={classes.root}>
                <Typography variant="h3" gutterBottom align="left">
                    New Password
                </Typography>
                <img
                    className={classes.icon}
                    src={FutbolistaIcon}
                    alt="Futbolista"
                />
                <Formik
                    initialValues={{
                        newPassword: '',
                        passwordRepeat: ''
                    }}
                    validationSchema={() => yup.object().shape({
                        newPassword: yup
                            .string()
                            .min(5, 'Minimum password length should be 5 symbols')
                            .required('Password is required!'),
                        passwordRepeat: yup
                            .string()
                            .oneOf([yup.ref('newPassword'), null], 'Passwords doesnt match')
                            .min(5, 'Minimum password length should be 5 symbols')
                            .required('Password is required!'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        const res = await api.newPassword({ ...values, recoveryToken: token });
                        if (res.ok && res.status === 200) {
                            Router.push('/login')
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
                      }) => {
                        return (
                            <form autoComplete="off" onSubmit={handleSubmit}>
                                <FormControl>
                                    <TextField
                                        autoComplete="off"
                                        type="password"
                                        name="newPassword"
                                        label="New Password"
                                        className={classes.textField}
                                        margin="normal"
                                        value={values.newPassword}
                                        onChange={handleChange}
                                        error={!!touched.newPassword && !!errors.newPassword}
                                        helperText={touched.newPassword && errors.newPassword ? errors.newPassword : ''}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        autoComplete="off"
                                        type="password"
                                        name="passwordRepeat"
                                        label="Repeat password"
                                        className={classes.textField}
                                        margin="normal"
                                        value={values.passwordRepeat}
                                        onChange={handleChange}
                                        error={!!touched.passwordRepeat && !!errors.passwordRepeat}
                                        helperText={touched.passwordRepeat && errors.passwordRepeat ? errors.passwordRepeat : ''}
                                        onBlur={handleBlur}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        disabled={isSubmitting}
                                    >
                                        Reset
                                    </Button>
                                </FormControl>
                            </form>
                        )
                    }}
                </Formik>
            </div>
        );
    }
}

export default withStyles(styles)(NewPassword);
