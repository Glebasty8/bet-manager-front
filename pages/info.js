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

class Info extends PureComponent {
    render() {
        const { classes } = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant="h1" paragraph>
                    Info
                </Typography>
            </main>
        );
    }
}

export default compose(
    withStyles(styles),
    withTranslation(['info'])
)(Info);
