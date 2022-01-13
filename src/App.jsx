import React from "react";
import { Admin, Resource } from 'react-admin';
import Layout from './Layout';
import theme from "./Layout/theme";
import Dashboard from "./Pages/Dashboard";
import { BGCollectionsList, BGCollectionsCreate } from "./Pages/BGCollections";
import { BGBlackListList, BGBlackListCreate } from './Pages/BGBlackList';
import {
    PhotoRounded as BGIcon,
    CollectionsRounded as BGCollectionsIcon,
    BlockRounded as BGBlackListIcon,
    BugReportRounded as BugReportIcon,
    HowToRegRounded as TestingRequestIcon,
} from "@material-ui/icons";
import i18nProvider from './i18nProvider';
import dataProvider from './dataProvider';
import authProvider from './authProvider';

function App() {
    return (
        <Admin
            theme={theme}
            layout={Layout}
            authProvider={authProvider}
            dataProvider={dataProvider}
            i18nProvider={i18nProvider}
            dashboard={Dashboard}
            disableTelemetry
        >
            <Resource
                name="backgrounds/collections"
                options={{ label: "Collections", groupIcon: BGIcon }}
                list={BGCollectionsList}
                create={BGCollectionsCreate}
                icon={BGCollectionsIcon}
            />
            <Resource
                name="backgrounds/black-list"
                options={{ label: "Black list" }}
                list={BGBlackListList}
                create={BGBlackListCreate}
                icon={BGBlackListIcon}
            />
        </Admin>
    );
}

export default App;
