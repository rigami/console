import React, {cloneElement} from "react";
import {
    List,
    Datagrid,
    TextField,
    useListContext,
    TopToolbar,
    CreateButton,
    sanitizeListRestProps,
    Filter,
    TextInput,
    EmailField,
    NumberField,
} from 'react-admin';

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
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

export const TestingRequestList = (props) => (
    <List {...props} exporter={false} actions={<ListActions />} filters={<PostFilter />}>
        <Datagrid>
            <NumberField source="id" />
            <EmailField source="email" />
            <TextField source="name" />
            <TextField source="reason" />
        </Datagrid>
    </List>
);
