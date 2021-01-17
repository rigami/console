import React, { Fragment } from "react";
import {
    List,
    Datagrid,
    TextField,
    Filter,
    TextInput,
    EmailField,
    NumberField,
    BooleanField,
    BulkDeleteButton,
} from 'react-admin';
import BulkUpdateButton from "../components/BulkUpdateButton";
import UpdateButton from "../components/UpdateButton";

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

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

export const TestingRequestList = (props) => (
    <List {...props} exporter={false} filters={<PostFilter />} bulkActionButtons={<PostBulkActionButtons />}>
        <Datagrid>
            <NumberField source="id" />
            <EmailField source="email" />
            <TextField source="name" />
            <TextField source="reason" />
            <BooleanField source="processed" />
            <ActionsField />
        </Datagrid>
    </List>
);
