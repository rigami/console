import React from "react";
import {
    List,
    Datagrid,
    TextField,
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

export const TestingRequestList = (props) => (
    <List {...props} exporter={false} filters={<PostFilter />}>
        <Datagrid>
            <NumberField source="id" />
            <EmailField source="email" />
            <TextField source="name" />
            <TextField source="reason" />
        </Datagrid>
    </List>
);
