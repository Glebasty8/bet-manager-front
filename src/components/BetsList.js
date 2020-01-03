import React, { Fragment } from 'react';
import cn from "classnames";
import { makeStyles, createStyles } from '@material-ui/styles';
import moment from 'moment';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';

const useStyles = makeStyles((theme) => createStyles({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const renderStatus = (status) => {
    if (status === 1) {
        return 'Pending'
    } else if (status === 2) {
        return 'Succeeded'
    } else if (status === 3) {
        return 'Failed'
    }
    return 'Pending';
};

const renderCompetitors = (competitors = []) => {
    if (!competitors) return '';
    if (competitors.length === 1) {
        return competitors[0]
    } else if (competitors.length > 1) {
        return `${competitors[0]} - ${competitors[1]}`
    }
    return '';
};

const BetsList = ({ bets, onBetDelete, sportTypes }) => {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="left">Event Date</TableCell>
                        <TableCell>Sport</TableCell>
                        <TableCell align="left">Competition</TableCell>
                        <TableCell>Competitors</TableCell>
                        <TableCell align="left">Forecast</TableCell>
                        <TableCell align="left">Coefficient</TableCell>
                        <TableCell align="left">Bet Amount</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Profit</TableCell>
                        <TableCell align="left">Free</TableCell>
                        {onBetDelete && <TableCell align="left" />}
                        {onBetDelete && <TableCell align="left" />}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bets.map(({ id, sportTypeId, competition, forecast, betAmount, coefficient, isFree, eventDate, competitors = [], status }) => {

                        const sportType = sportTypes.find(sportType => sportType.id === sportTypeId);
                        return (
                            <TableRow key={id}>
                                <TableCell align="left">{id}</TableCell>
                                <TableCell align="left">{moment(eventDate).format('DD-MM-YYYY HH:MM')}</TableCell>
                                <TableCell component="th" scope="row">
                                    {sportType ? sportType.name : ''}
                                </TableCell>
                                <TableCell align="left">{competition}</TableCell>
                                <TableCell align="left">{renderCompetitors(competitors)}</TableCell>
                                <TableCell align="left">{forecast}</TableCell>
                                <TableCell align="left">{coefficient}</TableCell>
                                <TableCell align="left">{betAmount}</TableCell>
                                <TableCell
                                    align="left"
                                    className={cn({
                                        'pending': status === 1,
                                        'succeeded': status === 2,
                                        'failed': status === 3
                                    })}
                                >
                                    {renderStatus(status)}
                                </TableCell>
                                <TableCell align="left">{(betAmount * coefficient) - betAmount}</TableCell>
                                <TableCell align="left">{isFree ? 'Yes' : 'No'}</TableCell>

                                {onBetDelete ? <Fragment>
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
                                    </Fragment>
                                    : null}
                            </TableRow>
                        )})}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default BetsList;
