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
    UrlField, BulkDeleteButton,
} from 'react-admin';
import { BlockCreate } from "./Create";

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by id" source="idInSource" alwaysOn />
        <SelectInput
            source="source"
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


export const BlockList = (props) => (
    <List
        {...props}
        exporter={false}
        actions={<ListActions />}
        bulkActionButtons={<PostBulkActionButtons />}
        filters={<PostFilter />}
    >
        <Datagrid>
            <TextField source="idInSource" label="Id in source" />
            <TextField source="source" />
            <TextField source="blockedType" />
            <TextField source="blockedMethod" />
            <UrlField source="sourceLink" target="_blank" />
            <DateField source="createDate" showTime />
        </Datagrid>
    </List>
);

export { BlockCreate };








