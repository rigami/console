import * as React from "react";
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import Layout from './Layout';
import theme from "./Layout/theme";
import Dashboard from "./Pages/Dashboard";
import { BGCollectionsList } from "./Pages/BGCollections";
import { BGBlackList } from './Pages/BGBlackList';
import {
    CollectionsRounded as BGCollectionsIcon,
    BlockRounded as BGBlackListIcon,
} from "@material-ui/icons";
import authProvider from './authProvider';
import i18nProvider from './i18nProvider';

function App() {
    return (
        <Admin
            title=""
            theme={theme}
            layout={Layout}
            authProvider={authProvider}
            dataProvider={jsonServerProvider('https://jsonplaceholder.typicode.com')}
            i18nProvider={i18nProvider}
            dashboard={Dashboard}
            disableTelemetry
        >
            <Resource
                name="backgrounds/collections"
                options={{ label: "Collections" }}
                list={BGCollectionsList}
                icon={BGCollectionsIcon}
            />
            <Resource
                name="backgrounds/black-list"
                options={{ label: "Black list" }}
                list={BGBlackList}
                icon={BGBlackListIcon}
            />
        </Admin>
    );
}

export default App;
