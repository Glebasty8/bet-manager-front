import React, { PureComponent } from 'react';
import { withRouter } from 'next/router';
import { compose } from 'recompose';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import theme from 'src/theme';
import api from 'src/api';
import { withTranslation } from 'src/utils/i18n';
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
    }
};

class Index extends PureComponent {
    static async getInitialProps({ query }) {
        const { betId } = query;
        const res = await api.getBet(betId);
        const bet = await res.json();
        return { bet };
    }

    onBetUpdate = async (values, { setSubmitting }) => {
        const { router, bet } = this.props;
        const res = await api.updateBet(bet.id, values);
        if (res.ok && res.status === 200) {
            router.push('/bets')
        }
        setSubmitting(false);
    };

    render() {
        const { classes, bet, t } = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant="h3" align="center">
                    {t('h1')}
                </Typography>
                <CreateOrUpdateBetForm
                    onSubmit={this.onBetUpdate}
                    initialValues={bet}
                />
            </main>
        );
    }
}

export default compose(
    withStyles(styles),
    withRouter,
    withTranslation('bet')
)(Index)
