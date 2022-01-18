import React, {cloneElement, Fragment} from "react";
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
    SaveButton, BulkDeleteButton,
} from 'react-admin';
import {Box, Breadcrumbs, CardMedia, Divider, Link, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { CollectionCreate } from './Create';

const useStyles = makeStyles((theme) => ({
    previewCard: {
        width: 237,
        height: 160,
        borderRadius: theme.shape.borderRadius,
        marginRight: theme.spacing(2)
    },
}));

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by id in service" source="idInService" alwaysOn />
        <SelectInput
            source="collectionType"
            allowEmpty={false}
            alwaysOn
            choices={[
                { id: '', name: 'All' },
                { id: 'default', name: 'Default' },
                { id: 'best', name: 'Best' },
            ]}
        />
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

const PostBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteButton {...props} undoable={false} />
    </Fragment>
);

const Wallpaper = ({ record, ...props }) => {
    const classes = useStyles();

    console.log(record, props)

    return (
        <Box display="flex" flexDirection="row">
            <Link href={record.sourceLink} target="_blank">
                <CardMedia image={record.previewSrc} className={classes.previewCard} />
            </Link>
            <Box>
                <Link href={record.sourceLink} target="_blank">
                    <Breadcrumbs>
                        <Typography variant="inherit" component="span" color="textPrimary">{record.service}</Typography>
                        <Typography variant="inherit" component="span" color="textPrimary">{record.type}</Typography>
                        <Typography variant="inherit" component="span" color="primary">{record.idInService}</Typography>
                    </Breadcrumbs>
                </Link>
                <Typography variant="caption" color="textSecondary">id:{record.id}</Typography>
            </Box>
        </Box>
    );
}

export const CollectionsList = (props) => (
    <List
        {...props}
        exporter={false}
        actions={<ListActions />}
        filters={<PostFilter />}
        bulkActionButtons={<PostBulkActionButtons />}
        sort={{ field: 'createDate', order: 'DESC' }}
    >
        <Datagrid>
            <Wallpaper source="wallpaper" sortable={false} />
            <TextField source="collectionType" />
            <DateField source="createDate" showTime />
        </Datagrid>
    </List>
);

export { CollectionCreate };
