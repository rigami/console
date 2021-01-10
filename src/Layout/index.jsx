import React, { useEffect } from "react";
import AppBar from './AppBar';
import Sidebar from './Sidebar';
import Menu from './Menu';
import CustomNotification from './Notification';
import {Box, MuiThemeProvider} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { setSidebarVisibility } from "react-admin";
import theme from "./theme";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        position: 'relative',
    },
    contentWithSidebar: {
        display: 'flex',
        flexGrow: 1,
        overflow: 'auto',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 2,
        padding: theme.spacing(3),
        paddingTop: 0,
    },
}));

function Layout(props) {
    const {
        children,
        dashboard,
        logout,
        title,
    } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const open = useSelector(state => state.admin.ui.sidebarOpen);

    useEffect(() => {
        dispatch(setSidebarVisibility(true));
    }, [setSidebarVisibility]);

    return (
        <MuiThemeProvider theme={theme}>
            <Box className={classes.root}>
                <AppBar title={title} open={open} logout={logout} />
                <main className={classes.contentWithSidebar}>
                    <Sidebar>
                        <Menu logout={logout} hasDashboard={!!dashboard} />
                    </Sidebar>
                    <Box className={classes.content}>
                        {children}
                    </Box>
                </main>
                <CustomNotification />
            </Box>
        </MuiThemeProvider>
    );
}

export default Layout;
