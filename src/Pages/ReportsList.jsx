import React, {cloneElement} from "react";
import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    useListContext,
    TopToolbar,
    CreateButton,
    sanitizeListRestProps,
    Filter,
    TextInput,
    SelectInput,
} from 'react-admin';

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <SelectInput source="type" allowEmpty={false} choices={[
            { id: 'all', name: 'All' },
            { id: 'bug', name: 'Bug' },
            { id: 'review', name: 'Review' },
        ]} />
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
            <CreateButton basePath={basePath} />
        </TopToolbar>
    );
};

export const ReportsList = (props) => (
    <List {...props} exporter={false} actions={<ListActions />} filters={<PostFilter />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="email" />
            <TextField source="text" />
            <TextField source="type" />
            <BooleanField source="commentable" />
        </Datagrid>
    </List>
);
