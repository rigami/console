import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { List, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    DashboardMenuItem,
    MenuItemLink,
    getResources,
} from 'react-admin';
import SubMenu from './SubMenu';
import { capitalize } from 'lodash';

const useStyles = makeStyles((theme) => ({
    root: {
        borderTopRightRadius: theme.spacing(2.25),
        borderBottomRightRadius: theme.spacing(2.25),
        wordBreak: 'break-word',
        whiteSpace: 'normal',
    },
    active: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}));

function TreeMenu({ sidebarIsOpen, onMenuClick, resources, dense, name }) {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <SubMenu
            handleToggle={() => setIsOpen(!isOpen)}
            isOpen={isOpen}
            sidebarIsOpen={sidebarIsOpen}
            name={name}
            dense={dense}
            classes={{ root: classes.root }}
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
    const open = useSelector((state) => state.admin.ui.sidebarOpen);

    const resources = useSelector(getResources);

    return (
        <List dense={false}>
            <DashboardMenuItem
                onClick={onMenuClick}
                sidebarIsOpen={open} classes={{ root: classes.root, active: classes.active }}
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
                            sidebarIsOpen={open}
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
                            sidebarIsOpen={open}
                            dense={dense}
                            classes={{ root: classes.root, active: classes.active }}
                        />
                    );
                }
            })}
            {isXSmall && logout}
        </List>
    );
};

export default Menu;
