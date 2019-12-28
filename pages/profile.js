import React, { Component } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
// import Avatar from '@material-ui/core/Avatar';
import { deepPurple } from '@material-ui/core/colors';
import {
    DatePicker,
} from '@material-ui/pickers';

import theme from 'src/theme';
import AuthService from 'src/utils/AuthService';
import api from 'src/api';

const auth = new AuthService();

const styles = () => {
    return {
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        content: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 400,
        },
        button: {
            margin: theme.spacing(1),
        },
        profileAvatar: {
            width: '150px',
            height: '150px',
            fontSize: '60px',
            cursor: 'pointer',
            backgroundColor: deepPurple[500],
        }
    }
};

class Profile extends Component {
    render() {
        const { classes } = this.props;
        const profile = auth.getProfile();
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant="h3" gutterBottom>
                    Edit Profile
                </Typography>
                <Formik
                    initialValues={{
                        ...profile,
                        dateOfBirth: null
                    }}
                    validationSchema={() => yup.object().shape({
                        userName: yup
                            .string()
                            .required('First name is required'),
                        email: yup
                            .string()
                            .email('Invalid email address')
                            .required('Email is required!'),
                        bank: yup
                            .number()
                            .positive('Bank should be positive')
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        const res = await api.updateUser(profile.id, values);
                        const updatedProfile = await res.json();
                        auth.setProfile(updatedProfile);
                        setSubmitting(false);
                    }}
                >
                    {({
                          handleSubmit,
                          dirty,
                          isSubmitting,
                          values,
                          handleChange,
                          errors,
                          handleBlur,
                          touched,
                          setFieldValue,
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
                                        disabled
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
                                        disabled
                                    />
                                    <TextField
                                        autoComplete="off"
                                        type="number"
                                        name="bank"
                                        label="Bank"
                                        className={classes.textField}
                                        margin="normal"
                                        value={values.bank}
                                        onChange={handleChange}
                                        error={!!touched.bank && !!errors.bank}
                                        helperText={touched.bank && errors.bank ? errors.bank : ''}
                                        onBlur={handleBlur}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">₽</InputAdornment>,
                                        }}
                                    />
                                    <DatePicker
                                        className={classes.textField}
                                        name="dateOfBirth"
                                        margin="normal"
                                        id="mui-pickers-date"
                                        label="Date of birth"
                                        value={values.dateOfBirth}
                                        onChange={(value) => {
                                            setFieldValue("dateOfBirth", value);
                                        }}
                                        format="YYYY/MM/DD"
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        disabled={isSubmitting || !dirty}
                                    >
                                        Update
                                    </Button>
                                </FormControl>
                            </form>
                        )
                    }}
                </Formik>
            </main>
        );
    }
}

export default withStyles(styles)(Profile);
