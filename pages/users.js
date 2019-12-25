import React, { Component } from 'react';
import compose from 'recompose/compose';
import moment from 'moment';
import Router from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

import theme from 'src/theme';
import api from 'src/api';
import { withTranslation } from "src/utils/i18n";

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
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
};

class Users extends Component {
    static async getInitialProps({ req }) {
        const res = await api.getUsers();
        const users = await res.json();
        return { users };
    }

    onUserDelete = async (userId) => {
        await api.deleteUser(userId);
        Router.push('/users')
    };

    render() {
        const { classes, users = [], t } = this.props;

        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant="h1" paragraph>
                    {t('h1')}
                </Typography>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                {/*<TableCell align="left">Country</TableCell>*/}
                                <TableCell align="left">Role</TableCell>
                                <TableCell align="left">Created At</TableCell>
                                <TableCell align="left" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(({ id, userName, email, country = '', role, createAt }) => (
                                <TableRow key={id}>
                                    <TableCell align="left">{id}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {userName}
                                    </TableCell>
                                    <TableCell align="left">{email}</TableCell>
                                   {/* <TableCell align="left">{country}</TableCell>*/}
                                    <TableCell align="left">{role}</TableCell>
                                    <TableCell align="left">
                                        {moment(createAt).format('DD-MM-YYYY')}
                                    </TableCell>
                                    <TableCell align="left">
                                        <DeleteIcon
                                            onClick={() => this.onUserDelete(id)}
                                            className="icon"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </main>
        );
    }
}


export default compose(
    withStyles(styles),
    withTranslation(['users'])
)(Users);

