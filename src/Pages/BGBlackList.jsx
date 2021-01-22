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
import { Divider, Typography, Box } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(2, 0),
    },
}));

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
            <TextField source="entityId" label="Id in service" />
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

function ExampleCreateRow() {
    const classes = useStyles();

    return (
        <Box>
            <Typography variant="h5">Examples</Typography>
            <Typography variant="h6">Publisher</Typography>
            <Typography>
                <Typography variant="span" color="textSecondary">Unsplash: </Typography>
                https://unsplash.com/<Typography variant="span" color="secondary">@danilkinkin</Typography>
            </Typography>
            <Typography>
                <Typography variant="span" color="textSecondary">Pexels: </Typography>
                https://www.pexels.com/<Typography variant="span" color="secondary">@danil-zakhvatkin-11197472</Typography>/
            </Typography>
            <Typography>
                <Typography variant="span" color="textSecondary">Pixabay: </Typography>
                https://pixabay.com/ru/users/<Typography variant="span" color="secondary">danilkinkin</Typography>-5843520/
            </Typography>
            <Typography variant="h6">Background</Typography>
            <Typography>
                <Typography variant="span" color="textSecondary">Unsplash: </Typography>
                https://unsplash.com/photos/<Typography variant="span" color="secondary">nL1pAWmRFYU</Typography>
            </Typography>
            <Typography>
                <Typography variant="span" color="textSecondary">Pexels: </Typography>
                https://www.pexels.com/video/silhouette-of-maple-leaves-<Typography variant="span" color="secondary">1510090</Typography>/
            </Typography>
            <Typography>
                <Typography variant="span" color="textSecondary">Pixabay: </Typography>
                https://pixabay.com/videos/nature-rain-plant-water-garden-<Typography variant="span" color="secondary">42420</Typography>/
            </Typography>
            <Divider className={classes.margin} />
        </Box>
    );
}


export function BGBlackListCreate (props) {
    return (
        <Create {...props} title="Add background to black list" actions={<PostEditActions />}>
            <SimpleForm toolbar={<PostCreateToolbar />}>
                <ExampleCreateRow />
                <Typography variant="h5">Add row</Typography>
                <TextInput source="entityId" label="Id in service" />
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
}
