import React, { Component } from 'react';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import theme from 'src/theme';
import api from 'src/api';
import CreateOrUpdateBetForm from 'components/CreateOrUpdateBetForm';

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
};

class Bets extends Component {
    static async getInitialProps() {
        const res = await api.getBets();
        const bets = await res.json();
        return { bets };
    }

    createBet = async (values, { setSubmitting }) => {
        const { id } = this.props.auth.getProfile();
        const payload = {
            userId: id,
            ...values
        };

        const res = await api.createBet(payload);
        console.log('res', res);
        if (res.ok && res.status === 201) {
            Router.push('/bets')
        }
        setSubmitting(false);
    };

    render() {
        const { classes } = this.props;

        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant="h3" align="center">
                    New Bet
                </Typography>
                <CreateOrUpdateBetForm
                    onSubmit={this.createBet}
                />
            </main>
        );
    }
}

export default withStyles(styles)(Bets);
