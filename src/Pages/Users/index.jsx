import { Datagrid, DateField, List, TextField } from "react-admin";
import React from "react";

export const UsersList = (props) => (
    <List {...props} exporter={false} bulkActionButtons={false}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="role" />
            <DateField source="createDate" showTime />
        </Datagrid>
    </List>
);
