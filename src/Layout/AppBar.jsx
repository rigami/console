import { Fragment } from "react";
import { AppBar } from 'react-admin';
import {alpha, makeStyles} from '@material-ui/core/styles';
import { ReactComponent as Logo } from '../images/logo-header.svg';
import theme from "./theme";

const useStyles = makeStyles({
    root: {
        boxShadow: 'none',
        backdropFilter: 'blur(16px)',
        backgroundColor: alpha(theme.palette.background.default, 0.38)
    },
    logo: {
        height: 36,
        width: 'auto',
    },
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
    toolbar: {
        minHeight: theme.spacing(8),
    },
    menuButton: {
        marginLeft: theme.spacing(1.5),
        marginRight: theme.spacing(1.5),
    },
});

const CustomAppBar = (props) => {
    const classes = useStyles();

    return (
        <AppBar
            {...props}
            color="transparent"
            className={classes.root}
            position="sticky"
            classes={{
                toolbar: classes.toolbar,
                menuButton: classes.menuButton,
            }}
            container={Fragment}
        >
            <Logo className={classes.logo} />
            <span className={classes.spacer} />
        </AppBar>
    );
}

export default CustomAppBar;
