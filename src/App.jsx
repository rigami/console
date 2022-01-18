import React from "react";
import { Admin, Resource } from 'react-admin';
import Layout from './Layout';
import theme from "./Layout/theme";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import { CollectionsList, CollectionCreate } from "./Pages/WallpaperCollections";
import { BGBlackListList, BGBlackListCreate } from './Pages/BGBlackList';
import {
    PhotoRounded as BGIcon,
    CollectionsRounded as BGCollectionsIcon,
    BlockRounded as BGBlackListIcon,
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
                name="wallpapers/collections"
                options={{ label: "Collections", groupIcon: BGIcon }}
                list={CollectionsList}
                create={CollectionCreate}
                icon={BGCollectionsIcon}
            />
            <Resource
                name="wallpapers/black-list"
                options={{ label: "Black list" }}
                list={BGBlackListList}
                create={BGBlackListCreate}
                icon={BGBlackListIcon}
            />
        </Admin>
    );
}

export default App;
