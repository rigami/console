import React, {cloneElement, Fragment} from "react";
import {
    List,
    Datagrid,
    TextField,
    DateField,
    useListContext,
    TopToolbar,
    CreateButton,
    sanitizeListRestProps,
    Filter,
    TextInput,
    SelectInput,
    ListButton,
    Create,
    SimpleForm,
    UrlField,
    Toolbar,
    SaveButton, BulkDeleteButton,
} from 'react-admin';
import {Box, Divider, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { CollectionCreate } from './Create';

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by id in service" source="idInService" alwaysOn />
        <SelectInput
            source="collectionType"
            allowEmpty={false}
            alwaysOn
            choices={[
                { id: '', name: 'All' },
                { id: 'default', name: 'Default' },
                { id: 'best', name: 'Best' },
            ]}
        />
        <SelectInput
            source="service"
            allowEmpty={false}
            choices={[
                { id: '', name: 'All' },
                { id: 'unsplash', name: 'Unsplash' },
                { id: 'pexels', name: 'Pexels' },
                { id: 'pixabay', name: 'Pixabay' },
            ]}
        />
    </Filter>
);

const ListActions = (props) => {
    const {
        className,
        exporter,
        filters,
        maxResults,
        ...rest
    } = props;
    const {
        resource,
        displayedFilters,
        filterValues,
        basePath,
        showFilter,
    } = useListContext();
    return (
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
            {filters && cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button',
            })}
            <CreateButton basePath={basePath} label="Add" />
        </TopToolbar>
    );
};

const PostBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteButton {...props} undoable={false} />
    </Fragment>
);



export const CollectionsList = (props) => (
    <List {...props} exporter={false} actions={<ListActions />} filters={<PostFilter />} bulkActionButtons={<PostBulkActionButtons />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="idInService" label="Id in service" />
            <TextField source="collectionType" />
            <TextField source="service" />
            <UrlField source="sourceLink" target="_blank" />
            <DateField source="addedAt" showTime />
        </Datagrid>
    </List>
);

export { CollectionCreate };
