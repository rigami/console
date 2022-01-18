import React from "react";
import {Create, ListButton, SaveButton, SelectInput, SimpleForm, TextInput, Toolbar, TopToolbar} from "react-admin";
import {Box, Divider, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(2, 0),
    },
}));

const PostCreateToolbar = props => (
    <Toolbar {...props} >
        <SaveButton
            label="Save and add"
            redirect="show"
            submitOnEnter={true}
        />
    </Toolbar>
);

const PostEditActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data} />
    </TopToolbar>
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

export function BlackListCreate (props) {
    return (
        <Create {...props} title="Add background to black list" actions={<PostEditActions />}>
            <SimpleForm toolbar={<PostCreateToolbar />}>
                <ExampleCreateRow />
                <Typography variant="h5">Add row</Typography>
                <TextInput source="idInService" label="Id in service" />
                <TextInput source="sourceLink" />
                <SelectInput source="service" allowEmpty={false} choices={[
                    { id: 'unsplash', name: 'Unsplash' },
                    { id: 'pexels', name: 'Pexels' },
                    { id: 'pixabay', name: 'Pixabay' },
                ]} />
                <SelectInput source="blockedType" allowEmpty={false} choices={[
                    { id: 'publisher', name: 'Publisher' },
                    { id: 'wallpaper', name: 'Wallpaper' },
                ]} />
            </SimpleForm>
        </Create>
    );
}
