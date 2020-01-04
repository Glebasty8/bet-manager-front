import React, { PureComponent } from 'react';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import { withTranslation } from 'src/utils/i18n';
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

class AboutUs extends PureComponent {
    render() {
        const { classes, t } = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant="h1" paragraph>
                    {t('h1')}
                </Typography>
                <div className="flex column">
                    <span>Email: bet.manager.ask@gmail.com</span>
                    <span>Contact number: +380504022248</span>
                </div>

            </main>
        );
    }
}

export default compose(
    withStyles(styles),
    withTranslation(['contact-us'])
)(AboutUs);
