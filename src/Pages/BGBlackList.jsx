import React, {cloneElement} from "react";
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
    SaveButton,
} from 'react-admin';

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by id" source="bg_id" alwaysOn />
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

export const BGBlackListList = (props) => (
    <List {...props} exporter={false} actions={<ListActions />} filters={<PostFilter />}>
        <Datagrid>
            <TextField source="bgId" label="Id in service" />
            <TextField source="service" />
            <TextField source="entityType" />
            <UrlField source="sourceLink" target="_blank" />
            <DateField source="addedAt" showTime />
        </Datagrid>
    </List>
);

const PostEditActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data} />
    </TopToolbar>
);

const PostCreateToolbar = props => (
    <Toolbar {...props} >
        <SaveButton
            label="Save and add"
            redirect="show"
            submitOnEnter={true}
        />
    </Toolbar>
);


export const BGBlackListCreate = (props) => (
    <Create {...props} title="Add background to black list" actions={<PostEditActions />}>
        <SimpleForm toolbar={<PostCreateToolbar />}>
            <TextInput source="bgId" label="Id in service" />
            <TextInput source="sourceLink" />
            <SelectInput source="service" allowEmpty={false} choices={[
                { id: 'UNSPLASH', name: 'Unsplash' },
                { id: 'PEXELS', name: 'Pexels' },
                { id: 'PIXABAY', name: 'Pixabay' },
            ]} />
            <SelectInput source="entityType" allowEmpty={false} choices={[
                { id: 'PUBLISHER', name: 'Publisher' },
                { id: 'BACKGROUND', name: 'Background' },
            ]} />
        </SimpleForm>
    </Create>
);
