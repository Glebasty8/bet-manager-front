import React, { Component } from 'react';
import Router from 'next/router'
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import theme from 'src/theme';
import FootballerIcon from '../static/svg/footballer.svg';

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
        }
    }
};

class SuccessfullySent extends Component {
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
                    Password resetting
                </Typography>
                <img
                    className="sports-men-icon"
                    src={FootballerIcon}
                    alt="Football players"
                />
                <Typography variant="subtitle1" gutterBottom align="center">
                    The letter with next steps has already being sent to your email. Check it to finish.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => Router.push('/')}
                >
                    go home
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(SuccessfullySent);
