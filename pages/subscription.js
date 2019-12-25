import React, { Component } from 'react';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/styles';

import theme from 'src/theme';

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

class Subscription extends Component {
    render() {
        const { classes } = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <form method="POST" acceptCharset="utf-8" action="https://www.liqpay.ua/en/checkout/sandbox_i66391596845">
                    <input type="hidden" name="data"
                           value="eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXkiLCJwdWJsaWNfa2V5Ijoic2FuZGJveF9pNjYzOTE1OTY4NDUiLCJhbW91bnQiOiI1IiwiY3VycmVuY3kiOiJVQUgiLCJkZXNjcmlwdGlvbiI6Ik15IGdvb2RzIiwidHlwZSI6ImJ1eSIsImxhbmd1YWdlIjoicnUifQ=="/>
                    <input type="hidden" name="signature" value="2ovZd2qjlwb7zPcSkqklLV9AAe8="/>
                    <button style={{ padding: '10px', height: '40px', border: 'none', display: 'inline-block', textAlign: 'center; padding: 7px 20px',  color: '#fff', fontSize: '16px', fontWeight: '600', fontFamily: 'OpenSans, sans-serif', cursor: 'pointer', borderRadius: '2px', background: 'rgb(129,207,28)'}}>
                        <img src="https://static.liqpay.ua/buttons/logo-small.png" alt="arrow" name="btn_text"
                             style={{ marginRight: '7px', verticalAlign: 'middle'}}/>
                        <span style={{ verticalAlign: 'middle'}}>Pay 5 UAH</span>
                    </button>
                </form>

            </main>
        );
    }
}

export default compose(
    withStyles(styles),
)(Subscription);
