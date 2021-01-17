import React from "react";
import {
    Button,
    useNotify,
    useRefresh,
    useUnselectAll,
    useUpdate,
} from "react-admin";

function UpdateButton({ label, record, resource, updateData }) {
    const refresh = useRefresh();
    const notify = useNotify();
    const unselectAll = useUnselectAll();
    const [update, { loading }] = useUpdate(
        resource,
        record.id,
        updateData,
        record,
        {
            onSuccess: () => {
                refresh();
                notify('Row updated');
                unselectAll(resource);
            },
            onFailure: error => notify('Error: row not updated', 'warning'),
        }
    );

    return (
        <Button
            label={label}
            onClick={update}
            disabled={loading}
        />
    );
}

export default UpdateButton;
