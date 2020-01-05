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

import theme from 'src/theme';
import api from 'src/api';
import { withTranslation } from "../src/utils/i18n";
import BetsList from 'components/BetsList';

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
    tabs: {
        marginBottom: '20px'
    },
    card: {
        minWidth: 400,
        width: 500,
        height: 170,
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

const subscriptions = [
    { title: 'Subscription for day', value: '200', description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica', data: 'eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXkiLCJwdWJsaWNfa2V5IjoiaTIxMDM2NzE2NjMzIiwiYW1vdW50IjoiMjAwIiwiY3VycmVuY3kiOiJSVUIiLCJkZXNjcmlwdGlvbiI6Ik15IGdvb2RzIiwidHlwZSI6ImJ1eSIsImxhbmd1YWdlIjoicnUifQ==', signature: 'LxGmSAGmZsL+gtcJWuroxVSL3pQ=' },
    { title: 'Subscription for week', value: '400', description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica', data: 'eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXkiLCJwdWJsaWNfa2V5IjoiaTIxMDM2NzE2NjMzIiwiYW1vdW50IjoiNDAwIiwiY3VycmVuY3kiOiJSVUIiLCJkZXNjcmlwdGlvbiI6Ik15IGdvb2RzIiwidHlwZSI6ImJ1eSIsImxhbmd1YWdlIjoicnUifQ==', signature: 'Jyo8Y4JRWXaAPXk+AeyOBsAcKcw=' },
    { title: ' Subscription for month', value: '1000', description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica', data: 'eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXkiLCJwdWJsaWNfa2V5IjoiaTIxMDM2NzE2NjMzIiwiYW1vdW50IjoiNDAwIiwiY3VycmVuY3kiOiJSVUIiLCJkZXNjcmlwdGlvbiI6Ik15IGdvb2RzIiwidHlwZSI6ImJ1eSIsImxhbmd1YWdlIjoicnUifQ==', signature: 'uJf+uHQuz2E3OEsIuQ7DmKkVMi8=' },
];

class Bets extends PureComponent {
    state = {
        selectedTab: 0,
        isInfoModalOpened: false
    };

    static async getInitialProps() {
        const [resBets, resSportTypes] = await Promise.all([api.getBets(), api.getSportTypes()])
        const [bets, sportTypes] = await Promise.all([resBets.json(), resSportTypes.json()]);

        return { bets, sportTypes, namespacesRequired: ['bets'] };
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
        const { classes } = this.props;
        return (
           <div className="flex column align-center">
               <Typography variant="h1" paragraph>
                   Subscriptions
               </Typography>
               {subscriptions.map(({ title, value, description  }) => {
                   return (
                       <Card key={title} className={classes.card}>
                           <Typography gutterBottom variant="h5" component="h2">
                               {title}
                           </Typography>
                           <Typography variant="body2" color="textSecondary" component="p" align="center">
                              {description}
                           </Typography>
                           <form method="POST" acceptCharset="utf-8" action="https://www.liqpay.ua/api/3/checkout">
                               <input type="hidden" name="data"
                                      value="eyJhY3Rpb24iOiJwYXkiLCJhbW91bnQiOiIxIiwiY3VycmVuY3kiOiJVU0QiLCJkZXNjcmlwdGlvbiI6ImRlc2NyaXB0aW9uIHRleHQiLCJvcmRlcl9pZCI6IjEiLCJ2ZXJzaW9uIjoiMyIsInB1YmxpY19rZXkiOiJzYW5kYm94X2k2NjM5MTU5Njg0NSJ9"/>
                               <input type="hidden" name="signature" value="01MqduPN6KxpfDBIouK/aoNfHIE="/>
                               <Button
                                   type="submit"
                                   variant="contained"
                                   color="primary"
                                   className={classes.button}
                               >
                                   <img src="https://static.liqpay.ua/buttons/logo-small.png" alt="arrow" name="btn_text"
                                        style={{ marginRight: '7px', verticalAlign: 'middle'}}/>
                                   <span style={{ verticalAlign: 'middle'}}>{`Subscribe (${value}₽)`}</span>
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
        const { subscription = {} } = this.props.auth.getProfile();
        const { id: subscriptionId = null, completionDate } = subscription || {};
        const isSubscriptionExpired = moment().diff(completionDate) < 0;
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {!subscriptionId && isSubscriptionExpired ? this.renderAvailableBets() : this.renderSubscriptionOptions()}
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
