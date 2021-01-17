import React from "react";
import {
    Button,
    useNotify,
    useRefresh,
    useUnselectAll,
    useUpdateMany,
} from "react-admin";

function BulkUpdateButton({ label, updateData, selectedIds, resource }) {
    const refresh = useRefresh();
    const notify = useNotify();
    const unselectAll = useUnselectAll();
    const [updateMany, { loading }] = useUpdateMany(
        resource,
        selectedIds,
        updateData,
        {
            onSuccess: () => {
                refresh();
                notify('Rows updated');
                unselectAll(resource);
            },
            onFailure: error => notify('Error: rows not updated', 'warning'),
        }
    );

    return (
        <Button
            label={label}
            onClick={updateMany}
            disabled={loading}
        />
    );
}

export default BulkUpdateButton;
