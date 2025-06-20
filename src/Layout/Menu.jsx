import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { List, useMediaQuery, MenuItem, Link } from '@material-ui/core';
import { makeStyles, alpha } from '@material-ui/core/styles';
import {
    DashboardMenuItem,
    MenuItemLink,
    getResources, setSidebarVisibility,
} from 'react-admin';
import SubMenu from './SubMenu';
import { capitalize, first } from 'lodash';

const useStyles = makeStyles((theme) => ({
    list: {
        paddingRight: 0,
        paddingTop: 0,
    },
    root: {
        borderTopRightRadius: theme.spacing(2.25),
        borderBottomRightRadius: theme.spacing(2.25),
        paddingLeft: theme.spacing(3),
        wordBreak: 'break-word',
        whiteSpace: 'normal',
        fontSize: '.875rem',
        letterSpacing: '.0178571429em',
        lineHeight: '1.25rem',
        minHeight: theme.spacing(4.5),
    },
    active: {
        backgroundColor: alpha(theme.palette.primary.light, 0.12),
        color: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.light, 0.12),
        },
        '& svg': {
            color: theme.palette.primary.main,
        },
    },
    subMenuActive: {
        color: theme.palette.primary.main,
        '& svg': {
            color: theme.palette.primary.main,
        },
    },
}));

function TreeMenu({ sidebarIsOpen, onMenuClick, resources, dense, name }) {
    const classes = useStyles();

    const GroupIcon = first(resources)?.options?.groupIcon;
    const isActive = !!resources.find(({ name }) => window.location.hash === `#/${name}`)

    return (
        <SubMenu
            active={isActive}
            sidebarIsOpen={sidebarIsOpen}
            name={name}
            dense={dense}
            classes={{ root: classes.root, active: classes.subMenuActive }}
            icon={GroupIcon && <GroupIcon />}
        >
            {resources.map((item) => (
                <MenuItemLink
                    key={item.name}
                    to={`/${item.name}`}
                    primaryText={item.options?.label || item.name}
                    leftIcon={item.icon && <item.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={sidebarIsOpen}
                    dense={dense}
                    classes={{ root: classes.root, active: classes.active }}
                />
            ))}
        </SubMenu>
    );
}

const Menu = ({ onMenuClick, logout, dense = false }) => {
    const classes = useStyles();
    const isXSmall = useMediaQuery((theme) =>
        theme.breakpoints.down('xs')
    );
    const resources = useSelector(getResources);

    return (
        <List dense={false} className={classes.list}>
            <DashboardMenuItem
                onClick={onMenuClick}
                classes={{ root: classes.root, active: classes.active }}
                sidebarIsOpen
            />
            {resources.reduce((arr, item) => {
                if (item.name.indexOf("/") !== -1) {
                    const groupName = item.name.substring(0, item.name.indexOf("/"));
                    let group = arr.find((item) => item.type === 'group' && item.name === groupName);

                    if (!group) {
                        group = {
                            type: 'group',
                            name: groupName,
                            resources: [],
                        };
                        arr.push(group);
                    }

                    group.resources.push({ ...item, type: 'item' });
                    return arr;
                } else {
                    return [...arr, { ...item, type: 'item' }];
                }
            }, []).map((item) => {
                if (item.type === 'group') {
                    return (
                        <TreeMenu
                            key={item.name}
                            name={capitalize(item.name)}
                            dense={dense}
                            onMenuClick={onMenuClick}
                            resources={item.resources}
                            sidebarIsOpen
                        />
                    );
                } else {
                    return (
                        <MenuItemLink
                            key={item.name}
                            to={`/${item.name}`}
                            primaryText={item.options?.label || item.name}
                            onClick={onMenuClick}
                            leftIcon={item.icon && <item.icon />}
                            sidebarIsOpen
                            dense={dense}
                            classes={{ root: classes.root, active: classes.active }}
                        />
                    );
                }
            })}
            <SubMenu
                sidebarIsOpen
                name="Hotlinks"
                dense={dense}
                classes={{ root: classes.root, active: classes.subMenuActive }}
            >
                {[
                    { url: "https://rigami.io/", label: "Landing page" },
                    {
                        url: "https://chrome.google.com/webstore/detail/rigami-new-tab/hdpjmahlkfndaejogipnepcgdmjiamhd",
                        label: "Google chrome store",
                    },
                    { url: "https://traefik.rigami.io/", label: "Traefik admin panel" },
                ].map((item) => (
                    <MenuItem
                        key={item.url}
                        href={item.url}
                        target="_blank"
                        component={Link}
                        color="textSecondary"
                        sidebarIsOpen
                        dense={dense}
                        classes={{ root: classes.root, active: classes.active }}
                    >
                        {item.label || item.url}
                    </MenuItem>
                ))}
            </SubMenu>
            {isXSmall && logout}
        </List>
    );
};

export default Menu;
