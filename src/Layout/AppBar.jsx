import { Typography } from "@material-ui/core";
import { AppBar } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
});

const CustomAppBar = (props) => {
    const classes = useStyles();

    return (
        <AppBar {...props} title="Rigami admin panel" userMenu={false}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
            >
                Rigami admin panel
            </Typography>
            <span className={classes.spacer} />
        </AppBar>
    );
}

export default CustomAppBar;
