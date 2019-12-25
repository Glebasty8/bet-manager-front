import React, { Fragment } from 'react';
import { FieldArray, Formik } from "formik";
import * as yup from "yup";
import { makeStyles, createStyles } from '@material-ui/styles';
import { DateTimePicker } from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import { betTypes } from "../constants";

const defaultInitialValues = {
    sportType: '',
    competition: '',
    forecast: '',
    betAmount: undefined,
    coefficient: undefined,
    isFree: false,
    competitors: [''],
    eventDate: null,
    status: 1
};

const useStyles = makeStyles((theme) => createStyles({
    textField: {
        marginRight: theme.spacing(1),
        width: 400,
    },
    formControl: {
        position: 'relative',
        maxWidth: 400
    }
}));

const CreateOrUpdateBetForm = ({ initialValues, onSubmit }) => {
    const classes = useStyles();
    return (
        <Formik
            initialValues={initialValues ? initialValues : defaultInitialValues}
            onSubmit={onSubmit}
            validationSchema={() => yup.object().shape({
                competitors: yup.array()
                    .of(yup.string().required('Competitor is required'))
                    .min(1, 'Minimum of 1 competitor'),
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
                    .required('Bet Amount is required'),
                coefficient: yup
                    .number()
                    .positive('Value should be positive')
                    .required('Coefficient is required'),
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
                  setFieldValue
              }) => {
                return (
                    <form
                        onSubmit={handleSubmit}
                        className={`flex column align-center`}
                    >
                        <FormControl>
                            <FieldArray
                                name="competitors"
                                render={arrayHelpers => {
                                    return (
                                        <Fragment>
                                            {values.competitors && values.competitors.length > 0 ? (
                                                values.competitors.map((competitor, index) => (
                                                    <div className="flex align-center" key={index}>
                                                        <TextField
                                                            autoComplete="off"
                                                            name={`competitors.${index}`}
                                                            label={`Competitor #${index + 1}`}
                                                            className={classes.textField}
                                                            value={competitor}
                                                            margin="normal"
                                                            onChange={handleChange}
                                                            error={touched.competitors &&errors.competitors && !!touched.competitors[index] && !!errors.competitors[index]}
                                                            helperText={touched.competitors &&errors.competitors && touched.competitors[index] && errors.competitors[index] ? errors.competitors[index] : ''}
                                                            onBlur={handleBlur}
                                                        />
                                                        {index !== 0 ? <button
                                                            type="button"
                                                            onClick={() => {
                                                                arrayHelpers.remove(index)
                                                            }} // remove a friend from the list
                                                        >
                                                            -
                                                        </button> : null}
                                                        {index !== 1 && values.competitors.length === 1 ?  <button
                                                            type="button"
                                                            onClick={() => {
                                                                arrayHelpers.push('')
                                                            }} // insert an empty string at a position
                                                        >
                                                            +
                                                        </button> : null}
                                                    </div>
                                                ))
                                            ) : (
                                                <button type="button" onClick={() => arrayHelpers.push('')}>
                                                    Add a competitors
                                                </button>
                                            )}
                                        </Fragment>
                                    )}
                                }
                            />
                            <TextField
                                autoComplete="off"
                                name="sportType"
                                label="Sport"
                                className={classes.textField}
                                margin="normal"
                                value={values.sport}
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
                            <DateTimePicker
                                className={classes.textField}
                                format="YYYY/MM/DD h:mm a"
                                name="eventDate"
                                margin="normal"
                                label="Event Date"
                                value={values.eventDate}
                                onChange={value => {
                                    setFieldValue("eventDate", value);
                                }}
                            />
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink htmlFor="status">
                                    Status
                                </InputLabel>
                                <Select
                                    name="status"
                                    id="status"
                                    className={classes.textField}
                                    value={values.status}
                                    onChange={handleChange}
                                >
                                    {betTypes.map(({ value, label }) => {
                                        return (
                                            <MenuItem
                                                key={value}
                                                value={value}
                                            >
                                                {label}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
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
                                Create Bet
                            </Button>
                        </FormControl>
                    </form>
                )
            }}
        </Formik>
    );
};

export default CreateOrUpdateBetForm;
