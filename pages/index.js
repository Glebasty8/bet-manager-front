import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import compose from 'recompose/compose';
import Router from 'next/router';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';

import theme from 'src/theme';
import api from 'src/api';
import { withTranslation } from "../src/utils/i18n";
import BetsList from 'components/BetsList';
import { handleAuthSSR } from 'src/utils/handleAuthSSR';

const styles = {
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    root: {
        width: '100%',
        padding: theme.spacing(1),
        overflowX: 'auto',
    },
    content: {
        flexGrow: 1,
    },
    tabs: {
        marginBottom: '20px'
    },
    card: {
        minWidth: 400,
        width: 500,
        height: 190,
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10
    },
    button: {
        marginTop: 10
    },
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    closeIcon: {
        position: 'absolute',
        right: 0,
        top: 0
    }
};

class Bets extends PureComponent {
    state = {
        selectedTab: 0,
        isInfoModalOpened: false
    };

    static async getInitialProps(ctx) {
        const token = await handleAuthSSR(ctx);

        const [resBets, resSportTypes, resSubscriptions] = await Promise.all([api.getBets(token), api.getSportTypes(token), api.getSubscriptions(token)])
        const [bets, sportTypes, subscriptions] = await Promise.all([resBets.json(), resSportTypes.json(), resSubscriptions.json()]);

        return { bets, sportTypes, subscriptions, namespacesRequired: ['bets'] };
    }

    onTabClick = (e, selectedTab) => {
        this.setState({
            selectedTab
        })
    };

    onBetDelete = async (betId) => {
        await api.deleteBet(betId);
        Router.push('/bets')
    };

    onSubscribe = (subscriptionPrice) => {
        const { balance } = this.props.auth.getProfile();
        if (balance < subscriptionPrice) {
            this.setState({
                isInfoModalOpened: true
            });
            return;
        }
    };

    closeInfoModal = () => {
        this.setState({
            isInfoModalOpened: false
        });
    };

    openInfoModal = () => {
        this.setState({
            isInfoModalOpened: true
        });
    };

    renderAvailableBets = () => {
        const { classes, bets, t, sportTypes } = this.props;
        const { selectedTab } = this.state;
        return (
            <Fragment>
                <Typography variant="h1" paragraph>
                    {t('h1')}
                </Typography>
                <div className="flex justify-center">
                    <Tabs
                        className={classes.tabs}
                        value={selectedTab}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.onTabClick}
                        aria-label="disabled tabs example"
                    >
                        <Tab label={`All`} />
                        <Tab label={`Active`} />
                        <Tab label={`History`} />
                    </Tabs>
                </div>
                <BetsList
                    bets={bets}
                    onBetDelete={this.onBetDelete}
                    sportTypes={sportTypes}
                />
            </Fragment>
        )
    };

    renderSubscriptionOptions = () => {
        const { classes, subscriptions = [] } = this.props;
        return (
           <div className="flex column align-center">
               <Typography variant="h4" paragraph align="center">
                   Подписки на описания с прогнозами к предстоящим спортивным событиям
               </Typography>
               {subscriptions.map(({ title, cost, description, data, signature }) => {
                   return (
                       <Card key={title} className={classes.card}>
                           <Typography gutterBottom variant="h5" component="h2">
                               {title}
                           </Typography>
                           <Typography variant="body2" color="textSecondary" component="p" align="center">
                              {description}
                           </Typography>
                           <form method="POST" acceptCharset="utf-8" action="https://www.liqpay.ua/api/3/checkout">
                               <input type="hidden" name="data" value={data} />
                               <input type="hidden" name="signature" value={signature} />
                               <Button
                                   type="submit"
                                   variant="contained"
                                   color="primary"
                                   className={classes.button}
                               >
                                   <img src="https://static.liqpay.ua/buttons/logo-small.png" alt="arrow" name="btn_text"
                                        style={{ marginRight: '7px', verticalAlign: 'middle'}}/>
                                   <span style={{ verticalAlign: 'middle'}}>{`Subscribe (${cost}₽)`}</span>
                               </Button>
                           </form>
                       </Card>
                   )
               })}
           </div>
       )
    };

    render() {
        const { classes } = this.props;
        const { isInfoModalOpened } = this.state;
        const { subscriptions = [] } = this.props.auth.getProfile();
        const isSubscription = subscriptions && subscriptions.length;
        const isSubscriptionExpired = !!subscriptions.find(subscription => {
            return moment(subscription.createdAt).add(subscription.subscription.subscriptionTimeInHours, 'hours').isBefore(moment())
        });
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Paper className={classes.root}>
                    {isSubscription && !isSubscriptionExpired ? this.renderAvailableBets() : this.renderSubscriptionOptions()}
                </Paper>
                <Modal
                    open={isInfoModalOpened}
                    onClose={this.closeInfoModal}
                    className={classes.modal}
                >
                    <div className={classes.paper}>
                        <CloseIcon className={classes.closeIcon} onClick={this.closeInfoModal} />
                        <Typography variant="h2" paragraph>
                            Info
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" align="center">
                            You dont have enough balance on your account to buy this subscription
                        </Typography>
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={() => {}}
                        >
                            Replenish balance
                        </Button>
                    </div>
                </Modal>
            </main>
        );
    }
}

export default compose(
    withStyles(styles),
    withTranslation(['index'])
)(Bets);
