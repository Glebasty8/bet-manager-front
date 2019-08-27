import React from 'react';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Router from "next/router";

import theme from "src/theme";
import AstronautIcon from '../static/svg/astronaut.svg';


const styles = () => {
    return {
        button: {
            margin: theme.spacing(1),
            marginTop: '50px'
        },
    }
};

const NotFound = (props) => {
    return (
        <div className="flex column full align-center justify-center">
            <Typography
                variant="h2"
                paragraph
                component="h2"
            >
                Error: 404 page not found
            </Typography>
            <img
                width={350}
                className="icon"
                src={AstronautIcon} alt="Astronaut"
            />
            <Button
                variant="contained"
                color="primary"
                className={props.classes.button}
                onClick={() => Router.push('/')}
            >
                go home
            </Button>
        </div>
    );
};

NotFound.getInitialProps = () => {
    return { layout: false, namespacesRequired: [] };
};

export default withStyles(styles)(NotFound);
