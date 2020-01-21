import React, { Component } from 'react';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import theme from 'src/theme';
import api from 'src/api';
import CreateOrUpdateBetForm from 'components/CreateOrUpdateBetForm';
import {handleAuthSSR} from "../src/utils/handleAuthSSR";

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

class CreateBet extends Component {
    static async getInitialProps(ctx) {
        const token = await handleAuthSSR(ctx);
        const res = await api.getSportTypes(token);
        const sportTypes = await res.json();
        return { sportTypes };
    }

    createBet = async (values, { setSubmitting }) => {
        const { id } = this.props.auth.getProfile();
        const payload = {
            userId: id,
            ...values,
            sportTypeId: values.sportType
        };

        const res = await api.createBet(payload);
        console.log('res', res);
        if (res.ok && res.status === 201) {
            Router.push('/bets')
        }
        setSubmitting(false);
    };

    render() {
        const { classes, sportTypes } = this.props;

        console.log('sportTypes', sportTypes);
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant="h3" align="center">
                    New Bet
                </Typography>
                <CreateOrUpdateBetForm
                    onSubmit={this.createBet}
                    data={{
                        sportTypes
                    }}
                />
            </main>
        );
    }
}

export default withStyles(styles)(CreateBet);
