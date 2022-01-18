import { Notification, LoginForm } from 'react-admin';
import { Container, MuiThemeProvider } from '@material-ui/core';
import theme from '../Layout/theme';
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as Logo } from "../images/logo-header.svg";

const useStyles = makeStyles({
    container: {
        marginTop: '20vh',
        display: 'flex',
        flexDirection: 'column',
    },
    logo: {
        width: '70%',
        margin: 'auto',
        height: 'auto',
        marginBottom: theme.spacing(3),
    },
});

const LoginPage = ({ theme }) => {
    const classes = useStyles();

    return (
        <MuiThemeProvider theme={theme}>
            <Container className={classes.container} maxWidth="xs">
                <Logo className={classes.logo} />
                <LoginForm />
            </Container>
            <Notification />
        </MuiThemeProvider>
    );
};

export default LoginPage;
