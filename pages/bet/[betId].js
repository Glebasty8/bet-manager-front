import React, { PureComponent } from 'react';
import { withRouter } from 'next/router';
import { compose } from 'recompose';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import * as yup from 'yup';
import { withStyles } from '@material-ui/styles';

import theme from 'src/theme';
import api from 'src/api';

const styles = {
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    fab: {
        margin: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400,
    },
};

class Index extends PureComponent {
    static async getInitialProps({ query }) {
        const { betId } = query;
        const res = await api.getBet(betId);
        const bet = await res.json();
        return { bet };
    }

    render() {
        const { classes, router, bet } = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant="h3" align="center">
                    New Bet
                </Typography>
                <Formik
                    initialValues={bet}
                    onSubmit={async (values, { setSubmitting }) => {
                        const res = await api.updateBet(bet.id, values);
                        if (res.ok && res.status === 200) {
                            // router.push('/bets')
                        }
                        setSubmitting(false);
                    }}
                    validationSchema={() => yup.object().shape({
                        sportType: yup
                            .string()
                            .required('Sport is required'),
                        competition: yup
                            .string()
                            .required('Competition is required'),
                        forecast: yup
                            .string()
                            .required('Forecast is required'),
                        betAmount: yup
                            .number()
                            .positive('Value should be positive')
                            .required('Index Amount is required'),
                        coefficient: yup
                            .number()
                            .positive('Value should be positive')
                            .required('Coefficient is required')
                    })}
                >
                    {({
                          handleSubmit,
                          handleChange,
                          handleBlur,
                          errors,
                          values,
                          touched,
                          isSubmitting,
                          ...rest
                      }) => {
                        console.log('rest', rest);
                        return (
                            <form
                                onSubmit={handleSubmit}
                                className={`flex column align-center`}
                            >
                                <FormControl>
                                    <TextField
                                        autoComplete="off"
                                        name="sportType"
                                        label="Sport"
                                        className={classes.textField}
                                        margin="normal"
                                        value={values.sportType}
                                        onChange={handleChange}
                                        error={!!touched.sportType && !!errors.sportType}
                                        helperText={touched.sportType && errors.sportType ? errors.sportType : ''}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        autoComplete="off"
                                        name="competition"
                                        label="Competition"
                                        className={classes.textField}
                                        margin="normal"
                                        value={values.competition}
                                        onChange={handleChange}
                                        error={!!touched.competition && !!errors.competition}
                                        helperText={touched.competition && errors.competition ? errors.competition : ''}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        autoComplete="off"
                                        name="forecast"
                                        label="Forecast"
                                        className={classes.textField}
                                        margin="normal"
                                        value={values.forecast}
                                        onChange={handleChange}
                                        error={!!touched.forecast && !!errors.forecast}
                                        helperText={touched.forecast && errors.forecast ? errors.forecast : ''}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        type="number"
                                        autoComplete="off"
                                        name="betAmount"
                                        label="Bet Amount"
                                        className={classes.textField}
                                        margin="normal"
                                        value={values.betAmount}
                                        onChange={handleChange}
                                        error={!!touched.betAmount && !!errors.betAmount}
                                        helperText={touched.betAmount && errors.betAmount ? errors.betAmount : ''}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        type="number"
                                        autoComplete="off"
                                        name="coefficient"
                                        label="Coefficient"
                                        className={classes.textField}
                                        margin="normal"
                                        value={values.coefficient}
                                        onChange={handleChange}
                                        error={!!touched.coefficient && !!errors.coefficient}
                                        helperText={touched.coefficient && errors.coefficient ? errors.coefficient : ''}
                                        onBlur={handleBlur}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={values.isFree}
                                                onChange={handleChange}
                                                value={values.isFree}
                                                name="isFree"
                                                color="primary"
                                            />
                                        }
                                        label="Free"
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        disabled={isSubmitting}
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

export default compose(
    withStyles(styles),
    withRouter,
)(Index)
