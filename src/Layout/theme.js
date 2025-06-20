import { defaultTheme } from "react-admin";
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    ...defaultTheme,
    palette: {
        primary: {
            light: '#28DEC8',
            main: '#49C5B6',
            dark: '#299286',
            contrastText: '#fff',
        },
        secondary: {
            main: '#3386E4',
            contrastText: '#fff',
        },
    },
    sidebar: {
        width: 272, // The default value is 240
        closedWidth: 55, // The default value is 55
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: { WebkitFontSmoothing: 'auto' },
                body: {
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                },
            },
        },
        MuiTypography: {
            'h1': {
                fontWeight: 800,
                wordBreak: 'break-word',
            },
            'h2': {
                fontWeight: 800,
                wordBreak: 'break-word',
            },
            'h3': { wordBreak: 'break-word' },
            'h5': {
                fontSize: 18,
                fontWeight: 'bold',
                wordBreak: 'break-word',
            },
            'h4': {
                fontSize: 32,
                wordBreak: 'break-word',
            },
            'h6': {
                fontWeight: 800,
            },
            'body1': {
                fontSize: 16,
                wordBreak: 'break-word',
            },
        },
        MuiContainer: {
            root: {
                '@media (min-width: 600px)': {
                    paddingLeft: 32,
                    paddingRight: 32,
                },
            },
        },
        MuiButton: { label: { wordBreak: 'break-word', fontWeight: 600 } },
        MuiTableCell: {
            head: {
                fontWeight: 600,
            },
        },
        MuiMenuItem: {
            root: {
                fontWeight: 600,
            },
        },
    },
    typography: { fontFamily: '"Manrope", sans-serif' },
    props: { MuiButton: { disableElevation: true } },
    shape: {
        borderRadius: 4,
        borderRadiusBold: 8,
    },
    transitions: {
        easing: {
            extraEaseInOut: 'cubic-bezier(0.85, 0.01, 0.13, 1)',
            invertEaseInOut: 'cubic-bezier(0, 0.79, 0.98, 0.19)',
        },
        duration: { extra: 450 },
    },
    shadows: [
        'none',
        '0px 2px 1px -1px rgba(0,0,0,0.08),0px 1px 1px 0px rgba(0,0,0,0.04),0px 1px 3px 0px rgba(0,0,0,0.02)',
        '0px 3px 1px -2px rgba(0,0,0,0.08),0px 2px 2px 0px rgba(0,0,0,0.04),0px 1px 5px 0px rgba(0,0,0,0.02)',
        '0px 3px 3px -2px rgba(0,0,0,0.08),0px 3px 4px 0px rgba(0,0,0,0.04),0px 1px 8px 0px rgba(0,0,0,0.02)',
        '0px 2px 4px -1px rgba(0,0,0,0.08),0px 4px 5px 0px rgba(0,0,0,0.04),0px 1px 10px 0px rgba(0,0,0,0.02)',
        '0px 3px 5px -1px rgba(0,0,0,0.08),0px 5px 8px 0px rgba(0,0,0,0.04),0px 1px 14px 0px rgba(0,0,0,0.02)',
        '0px 3px 5px -1px rgba(0,0,0,0.08),0px 6px 10px 0px rgba(0,0,0,0.04),0px 1px 18px 0px rgba(0,0,0,0.02)',
        '0px 4px 5px -2px rgba(0,0,0,0.08),0px 7px 10px 1px rgba(0,0,0,0.04),0px 2px 16px 1px rgba(0,0,0,0.02)',
        '0px 5px 5px -3px rgba(0,0,0,0.08),0px 8px 10px 1px rgba(0,0,0,0.04),0px 3px 14px 2px rgba(0,0,0,0.02)',
        '0px 5px 6px -3px rgba(0,0,0,0.08),0px 9px 12px 1px rgba(0,0,0,0.04),0px 3px 16px 2px rgba(0,0,0,0.02)',
        '0px 6px 6px -3px rgba(0,0,0,0.08),0px 10px 14px 1px rgba(0,0,0,0.04),0px 4px 18px 3px rgba(0,0,0,0.02)',
        '0px 6px 7px -4px rgba(0,0,0,0.08),0px 11px 15px 1px rgba(0,0,0,0.04),0px 4px 20px 3px rgba(0,0,0,0.02)',
        '0px 7px 8px -4px rgba(0,0,0,0.08),0px 12px 17px 2px rgba(0,0,0,0.04),0px 5px 22px 4px rgba(0,0,0,0.02)',
        '0px 7px 8px -4px rgba(0,0,0,0.08),0px 13px 19px 2px rgba(0,0,0,0.04),0px 5px 24px 4px rgba(0,0,0,0.02)',
        '0px 7px 9px -4px rgba(0,0,0,0.08),0px 14px 21px 2px rgba(0,0,0,0.04),0px 5px 26px 4px rgba(0,0,0,0.02)',
        '0px 8px 9px -5px rgba(0,0,0,0.08),0px 15px 22px 2px rgba(0,0,0,0.04),0px 6px 28px 5px rgba(0,0,0,0.02)',
        '0px 8px 10px -5px rgba(0,0,0,0.08),0px 16px 24px 2px rgba(0,0,0,0.04),0px 6px 30px 5px rgba(0,0,0,0.02)',
        '0px 8px 11px -5px rgba(0,0,0,0.08),0px 17px 26px 2px rgba(0,0,0,0.04),0px 6px 32px 5px rgba(0,0,0,0.02)',
        '0px 9px 11px -5px rgba(0,0,0,0.08),0px 18px 28px 2px rgba(0,0,0,0.04),0px 7px 34px 6px rgba(0,0,0,0.02)',
        '0px 9px 12px -6px rgba(0,0,0,0.08),0px 19px 29px 2px rgba(0,0,0,0.04),0px 7px 36px 6px rgba(0,0,0,0.02)',
        '0px 10px 13px -6px rgba(0,0,0,0.08),0px 20px 31px 3px rgba(0,0,0,0.04),0px 8px 38px 7px rgba(0,0,0,0.02)',
        '0px 10px 13px -6px rgba(0,0,0,0.08),0px 21px 33px 3px rgba(0,0,0,0.04),0px 8px 40px 7px rgba(0,0,0,0.02)',
        '0px 10px 14px -6px rgba(0,0,0,0.08),0px 22px 35px 3px rgba(0,0,0,0.04),0px 8px 42px 7px rgba(0,0,0,0.02)',
        '0px 11px 14px -7px rgba(0,0,0,0.08),0px 23px 36px 3px rgba(0,0,0,0.04),0px 9px 44px 8px rgba(0,0,0,0.02)',
        '0px 11px 15px -7px rgba(0,0,0,0.08),0px 24px 38px 3px rgba(0,0,0,0.04),0px 9px 46px 8px rgba(0,0,0,0.02)',
    ],
});

export default theme;
