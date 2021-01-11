import React, { Fragment } from 'react';
import {
    ArrowRightRounded as ExpandMoreIcon,
    ArrowDropDownRounded as ExpandLessIcon,
    FolderRounded as FolderIcon,
} from '@material-ui/icons';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from 'react-admin';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    icon: { minWidth: theme.spacing(5) },
    sidebarIsOpen: {
        '& a': {
            paddingLeft: theme.spacing(4),
            transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
        },
    },
    sidebarIsClosed: {
        '& a': {
            paddingLeft: theme.spacing(2),
            transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
        },
    },
    arrowIcon: {
        position: 'absolute',
        left: 0,
    },
    collapse: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
}));

const SubMenu = (props) => {
    const {
        active,
        handleToggle,
        sidebarIsOpen,
        isOpen,
        name,
        icon,
        children,
        dense,
        classes: externalClasses = {},
    } = props;
    const translate = useTranslate();
    const classes = useStyles();

    const header = (
        <MenuItem
            dense={dense}
            button
            onClick={handleToggle}
            className={clsx(externalClasses.root, active && externalClasses.active)}
        >
            {!isOpen ? (
                <ExpandMoreIcon className={classes.arrowIcon} />
            ) : (
                <ExpandLessIcon className={classes.arrowIcon} />
            )}
            <ListItemIcon className={classes.icon}>
                {icon || (<FolderIcon />)}
            </ListItemIcon>
            <Typography
                variant="inherit"
                color="textSecondary"
                className={clsx(active && externalClasses.active)}
            >
                {translate(name)}
            </Typography>
        </MenuItem>
    );

    return (
        <Fragment>
            {sidebarIsOpen || isOpen ? (
                header
            ) : (
                <Tooltip title={translate(name)} placement="right">
                    {header}
                </Tooltip>
            )}
            <Collapse in={isOpen} timeout="auto" unmountOnExit={false} className={classes.collapse}>
                <List
                    dense={dense}
                    component="div"
                    disablePadding
                    className={
                        sidebarIsOpen
                            ? classes.sidebarIsOpen
                            : classes.sidebarIsClosed
                    }
                >
                    {children}
                </List>
            </Collapse>
        </Fragment>
    );
};

export default SubMenu;
