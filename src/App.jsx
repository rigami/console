import * as React from "react";
import { Admin, Resource } from 'react-admin';
import Layout from './Layout';
import theme from "./Layout/theme";
import Dashboard from "./Pages/Dashboard";
import { BGCollectionsList } from "./Pages/BGCollections";
import { BGBlackList } from './Pages/BGBlackList';
import {
    CollectionsRounded as BGCollectionsIcon,
    BlockRounded as BGBlackListIcon,
} from "@material-ui/icons";
import i18nProvider from './i18nProvider';
import dataProvider from './dataProvider';

function App() {
    return (
        <Admin
            theme={theme}
            layout={Layout}
            dataProvider={dataProvider}
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
