import React from "react";
import { Admin, Resource } from 'react-admin';
import Layout from './Layout';
import theme from "./Layout/theme";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import { UsersList } from './Pages/Users';
import { CollectionsList, CollectionCreate } from "./Pages/WallpaperCollections";
import { BlockList, BlockCreate } from './Pages/WallpaperBlockList';
import {
    PeopleRounded as UsersIcon,
    PhotoRounded as WallpaperIcon,
    CollectionsRounded as WallpaperCollectionIcon,
    BlockRounded as WallpaperBlockIcon,
} from "@material-ui/icons";
import i18nProvider from './i18nProvider';
import dataProvider from './dataProvider';
import authProvider from './authProvider';

function App() {
    return (
        <Admin
            theme={theme}
            layout={Layout}
            loginPage={LoginPage}
            authProvider={authProvider}
            dataProvider={dataProvider}
            i18nProvider={i18nProvider}
            dashboard={Dashboard}
            disableTelemetry
        >
            <Resource
                name="users"
                options={{ label: "Users" }}
                list={UsersList}
                icon={UsersIcon}
            />
            <Resource
                name="wallpapers/collections"
                options={{ label: "Collections", groupIcon: WallpaperIcon }}
                list={CollectionsList}
                create={CollectionCreate}
                icon={WallpaperCollectionIcon}
            />
            <Resource
                name="wallpapers/blocked"
                options={{ label: "Blocked list" }}
                list={BlockList}
                create={BlockCreate}
                icon={WallpaperBlockIcon}
            />
        </Admin>
    );
}

export default App;
