import React, { cloneElement, Fragment } from "react";
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
    EmailField,
    NumberField,
    BulkDeleteButton,
} from 'react-admin';
import BulkUpdateButton from '../components/BulkUpdateButton';
import UpdateButton from "../components/UpdateButton";

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <SelectInput source="type" allowEmpty={false} choices={[
            { id: '', name: 'All' },
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

const PostBulkActionButtons = props => (
    <Fragment>
        <BulkUpdateButton label='Mark as processed' updateData={{ processed: true }} {...props} />
        <BulkUpdateButton label='Mark as not processed' updateData={{ processed: false }} {...props} />
        <BulkDeleteButton {...props} />
    </Fragment>
);

function ActionsField({ record, ...props }) {
    return (
        <UpdateButton
            label={record.processed ? "Mark as not processed" : "Mark as processed"}
            record={record}
            updateData={{ processed: !record.processed }}
            {...props}
        />
    );
}

export const ReportsList = (props) => (
    <List
        {...props}
        exporter={false}
        actions={<ListActions />}
        filters={<PostFilter />}
        bulkActionButtons={<PostBulkActionButtons />}
    >
        <Datagrid>
            <NumberField source="id" />
            <EmailField source="email" />
            <TextField source="text" />
            <TextField source="type" />
            <BooleanField source="processed" />
            <ActionsField />
        </Datagrid>
    </List>
);
