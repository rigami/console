import React, {cloneElement} from "react";
import {
    List,
    Datagrid,
    TextField,
    DateField,
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
        <TextInput label="Search by id" source="bg_id" alwaysOn />
        <SelectInput source="collection" allowEmpty={false} choices={[
            { id: 'all', name: 'All' },
            { id: 'default', name: 'Default' },
            { id: 'best', name: 'Best' },
        ]} />
        <SelectInput source="service" allowEmpty={false} choices={[
            { id: 'all', name: 'All' },
            { id: 'unsplash', name: 'Unsplash' },
            { id: 'pexels', name: 'Pexels' },
            { id: 'pixabay', name: 'Pixabay' },
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

export const BGCollectionsList = (props) => (
    <List {...props} exporter={false} actions={<ListActions />} filters={<PostFilter />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="bg_id" />
            <TextField source="collection_name" />
            <TextField source="service" />
            <DateField source="added_at" />
            <BooleanField source="commentable" />
        </Datagrid>
    </List>
);
