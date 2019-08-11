import React, { PureComponent } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import moment from 'moment';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import theme from 'src/theme';
import api from 'src/api';

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
    fab: {
        margin: theme.spacing(1),
    },
};

class Bets extends PureComponent {
    static async getInitialProps({ req }) {
        const res = await api.getBets();
        const bets = await res.json();
        return { bets };
    }

    onDeleteBet = async (betId) => {
        await api.deleteBet(betId);
        Router.push('/bets')
    };

    render() {
        const { classes, bets } = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant="h1" paragraph>
                    Bets
                </Typography>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Sport</TableCell>
                                <TableCell align="left">Competition</TableCell>
                                <TableCell align="left">Forecast</TableCell>
                                <TableCell align="left">Bet Amount</TableCell>
                                <TableCell align="left">Coefficient</TableCell>
                                <TableCell align="left">Free</TableCell>
                                <TableCell align="left">Created At</TableCell>
                                <TableCell align="left" />
                                <TableCell align="left" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bets.map(({ id, sportType, competition, forecast, betAmount, coefficient, isFree, createdAt, competitors }) => (
                                <TableRow key={id}>
                                    <TableCell align="left">{id}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {sportType}
                                    </TableCell>
                                    <TableCell align="left">{competition}</TableCell>
                                    <TableCell align="left">{forecast}</TableCell>
                                    <TableCell align="left">{betAmount}</TableCell>
                                    <TableCell align="left">{coefficient}</TableCell>
                                    <TableCell align="left">{isFree ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="left">{moment(createdAt).format('DD-MM-YYYY')}</TableCell>
                                    <TableCell align="left">
                                        <Link href={`/bet/[betId]`} as={`/bet/${id}`}>
                                            <EditIcon className="icon" />
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">
                                        <DeleteIcon
                                            onClick={() => this.onDeleteBet(id)}
                                            className="icon"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
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

export default withStyles(styles)(Bets);
