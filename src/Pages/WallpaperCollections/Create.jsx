import {Create, ListButton, SaveButton, SelectInput, SimpleForm, TextInput, Toolbar, TopToolbar, required, CreateContextProvider, useCreateController} from "react-admin";
import {Box, Divider, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(2, 0),
    },
}));

const PostEditActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data} />
    </TopToolbar>
);

const PostCreateToolbar = props => {

    console.log('PostCreateToolbar:', props)

    return (
        <Toolbar {...props} >
            <SaveButton
                label="Save and add"
                redirect="show"
                submitOnEnter={true}
            />
        </Toolbar>
    )
};

function ExampleCreateRow() {
    const classes = useStyles();

    return (
        <Box style={{ maxWidth: 500, margin: '1em' }}>
            <Typography variant="h5">Examples</Typography>
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
        </Box>
    );
}

export const CollectionCreate = (props) => {
    const [parsedLink, setParsedLink] = useState({});

    const parseLink = (sourceLink) => {
        let service;
        let type;
        let idInService;

        if (sourceLink.includes('unsplash')) {
            service = 'unsplash';
            type = 'image';

            let sourceLinkFixed = sourceLink;

            if (sourceLinkFixed.lastIndexOf('/') === sourceLinkFixed.length - 1) {
                sourceLinkFixed = sourceLink.substring(0, sourceLink.lastIndexOf('/'))
            }

            idInService = sourceLinkFixed.substring(sourceLinkFixed.lastIndexOf('/') + 1)
        } else if (sourceLink.includes('pexels')) {
            service = 'pexels';
            type = 'video';
            idInService = sourceLink.substring(sourceLink.lastIndexOf('-') + 1)
        } else if (sourceLink.includes('pixabay')) {
            service = 'pixabay';
            type = 'video';
            idInService = sourceLink.substring(sourceLink.lastIndexOf('-') + 1)
        } else {
            service = '';
            type = '';
            idInService = '';
        }

        if (idInService[idInService.length - 1] === '/') {
            idInService = idInService.substring(0, idInService.length - 1)
        }

        setParsedLink({
            sourceLink,
            service,
            type,
            idInService,
        })
    }

    return (
        <Create
            {...props}
            title="Add background to collection"
            aside={<ExampleCreateRow />}
            actions={<PostEditActions />}
        >
            <SimpleForm toolbar={<PostCreateToolbar />}>
                <Typography variant="h5">Add wallpaper in collection</Typography>
                <TextInput
                    source="sourceLink"
                    validate={required()}
                    onChange={(event) => parseLink(event.currentTarget.value)}
                />
                <TextInput
                    source="idInService"
                    label="Id in service"
                    validate={required()}
                    format={() => parsedLink.idInService || ''}
                />
                <SelectInput
                    source="type"
                    allowEmpty={false}
                    validate={required()}
                    format={() => parsedLink.type || ''}
                    choices={[
                        { id: 'image', name: 'Image' },
                        { id: 'video', name: 'Video' },
                    ]}
                />
                <SelectInput
                    source="service"
                    allowEmpty={false}
                    validate={required()}
                    format={() => parsedLink.service || ''}
                    choices={[
                        { id: 'unsplash', name: 'Unsplash' },
                        { id: 'pexels', name: 'Pexels' },
                        { id: 'pixabay', name: 'Pixabay' },
                    ]}
                />
                <SelectInput
                    source="collectionType"
                    allowEmpty={false}
                    validate={required()}
                    choices={[
                        { id: 'default', name: 'Default' },
                        { id: 'best', name: 'Best' },
                    ]}
                />
            </SimpleForm>
        </Create>
    );
};
