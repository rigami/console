import React from "react";
import { Container, Typography } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: { textAlign: 'center', paddingTop: '15%' },
}));

export default () => {
    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.root}>
            <Typography variant="h2">
                Welcome to <Typography variant="inherit" component="span" color="primary">console</Typography>
            </Typography>
        </Container>
    );
};
