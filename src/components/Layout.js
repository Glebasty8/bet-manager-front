import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UsersIcon from '@material-ui/icons/Accessibility';
import BetsListIcon from '@material-ui/icons/List';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import { deepPurple } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

import AuthService from '../utils/AuthService';
import withAuth from 'src/utils/withAuth';
import { i18n } from 'src/utils/i18n';

import Visa from '../../static/img/visa.svg';
import MasterCard from '../../static/img/mastercard.svg';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    paymentIcon: {
      width: '40px',
      height: '40px',
      marginRight: '20px'
    },
    footer: {
      width: '100%',
      height: '40px',
      background: '#dedede',
      position: 'fixed',
      bottom: 0,
      display: 'flex',
      justifyContent: 'flex-end'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
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
    avatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
        cursor: 'pointer'
    }
}));

const adminTabs = [
    {
        name: 'Users',
        to: '/users',
        Icon: UsersIcon
    },
    {
        name: 'Bets',
        to: '/bets',
        Icon: BetsListIcon
    },
    {
        name: 'About us',
        to: '/about-us',
        Icon: InfoIcon,
    },
    {
        name: 'Terms of use',
        to: '/terms-of-use',
        Icon: ContactSupportIcon,
    },
];

const userTabs = [
    {
        name: 'Bets',
        to: '/',
        Icon: BetsListIcon
    },
    {
        name: 'About us',
        to: '/about-us',
        Icon: InfoIcon,
    },
    {
        name: 'Terms of use',
        to: '/terms-of-use',
        Icon: ContactSupportIcon,
    },
];

function Layout(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [snack, setSnack] = React.useState(null);
    const { role, userName = '' } = props.auth.getProfile();
    const tabs = getTabsByRole(role);

    function showSnackNotification(snack) {
        setSnack(snack);
        setTimeout(() => setSnack(null), 3000);
    };

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    function getTabsByRole(role) {
        if (role === 'admin') {
            return adminTabs;
        }
        return userTabs;
    }

    function transitionUp(props) {
        return <Slide {...props} direction="up" />;
    };

    const greeting = (userName) => {
        const d = new Date();
        const hours = d.getHours();

        if (hours < 12 && hours > 6) {
            return `Good morning, ${userName}`;
        } else if (hours >= 12) {
            return `Good afternoon, ${userName}`;
        } else if (hours > 18) {
            return `Good evening, ${userName}`;
        } else if (hours > 21) {
            return `Good evening, ${userName}`;
        } else {
            return `Hi ${userName}`
        }
    };

    return (
        <div className="flex full column">
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar className="flex justify-between">
                        <div className="flex align-center">
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: open,
                                })}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap>
                                {greeting(userName)}
                            </Typography>
                        </div>
                        <div className="flex align-center justify-center">
                            <Select
                                className="locale-switcher"
                                value={i18n.language}
                                onChange={(e) => {
                                    i18n.changeLanguage(e.target.value);
                                }}
                            >
                                <MenuItem value='en'>English</MenuItem>
                                <MenuItem value='ru'>Russian</MenuItem>
                            </Select>
                            <Avatar
                                alt="Remy Sharp"
                                className={classes.avatar}
                                onClick={() => Router.push('/profile')}
                            >
                                {userName.slice(0, 1)}
                            </Avatar>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                    open={open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List className="full">
                        <div className="flex full column justify-between">
                            <div className="flex column top-nav">
                                {tabs.map(({ name, Icon, to, onClick = () => {} })  => {
                                    return (
                                        <Link href={to} key={name}>
                                            <ListItem button onClick={onClick}>
                                                <ListItemIcon>
                                                    <Icon />
                                                </ListItemIcon>
                                                <ListItemText primary={name} />
                                            </ListItem>
                                        </Link>
                                    )
                                })}
                            </div>
                            <Link href="/login" key="Logout">
                                <ListItem button onClick={AuthService.logout}>
                                    <ListItemIcon>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            </Link>
                        </div>
                    </List>
                </Drawer>
                {React.cloneElement(props.children, { user: props.user, showSnackNotification })}
                {snack && <Snackbar
                    open={!!snack}
                    onClose={() => setSnack(null)}
                    TransitionComponent={transitionUp}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{snack.message}</span>}
                />}
                <div className={classes.footer}>
                    <div className="payment-icons">
                        <img src={Visa} alt="Visa" className={classes.paymentIcon} />
                        <img src={MasterCard} alt="MasterCard" className={classes.paymentIcon} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(Layout);
