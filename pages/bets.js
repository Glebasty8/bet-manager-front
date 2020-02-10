import React, { PureComponent } from 'react';
import compose from 'recompose/compose';
import Link from 'next/link';
import Router from 'next/router';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { withTranslation } from 'src/utils/i18n';
import theme from 'src/theme';
import api from 'src/api';
import BetsList from 'components/BetsList';
import {handleAuthSSR} from "../src/utils/handleAuthSSR";

const styles = {
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    fab: {
        margin: theme.spacing(1),
    },
};

class Bets extends PureComponent {
    static async getInitialProps(ctx) {
        const token = await handleAuthSSR(ctx);

        const [resBets, resSportTypes] = await Promise.all([api.getBets(token), api.getSportTypes(token)])
        const [bets, sportTypes] = await Promise.all([resBets.json(), resSportTypes.json()]);

        return { bets, sportTypes, namespacesRequired: ['bets'] };
    }

    onBetDelete = async (betId) => {
        await api.deleteBet(betId);
        Router.push('/bets')
    };

    render() {
        const { classes, bets, sportTypes, t } = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant="h1" paragraph>
                    {t('h1')}
                </Typography>
                <BetsList
                    bets={bets}
                    onBetDelete={this.onBetDelete}
                    sportTypes={sportTypes}
                />
                <div className="flex justify-end">
                    <Link href="/create-bet">
                        <Fab color="primary" aria-label="add" className={classes.fab}>
                            <AddIcon />
                        </Fab>
                    </Link>
                </div>
            </main>
        );
    }
}

export default compose(
    withStyles(styles),
    withTranslation(['bets'])
)(Bets);
