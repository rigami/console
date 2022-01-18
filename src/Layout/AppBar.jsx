import { AppBar } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as Logo } from '../images/logo-header.svg';
import theme from "./theme";

const useStyles = makeStyles({
    root: {
        boxShadow: 'none',
        backgroundColor: 'unset',
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
});

const CustomAppBar = (props) => {
    const classes = useStyles();

    return (
        <AppBar
            {...props}
            color="transparent"
            className={classes.root}
            position="relative"
            classes={{
                toolbar: classes.toolbar,
            }}
        >
            <Logo className={classes.logo} />
            <span className={classes.spacer} />
        </AppBar>
    );
}

export default CustomAppBar;
