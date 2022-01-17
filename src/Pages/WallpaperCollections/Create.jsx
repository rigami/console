import {Create, ListButton, SaveButton, SelectInput, SimpleForm, TextInput, Toolbar, TopToolbar, required, CreateContextProvider, useCreateController, FormGroupContextProvider} from "react-admin";
import {Box, Divider, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import { useFormState, useForm, useField } from 'react-final-form';

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

const PostCreateToolbar = ({ disabledSave, ...props }) => {

    return (
        <Toolbar {...props} >
            <SaveButton
                label="Save and add"
                redirect="show"
                disabled={disabledSave}
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

const EditableFormContent = ({ children, mutationOnChange }) => {
    const form = useForm();

    useEffect(() => {
        if (mutationOnChange && form) {
            let prevState;

            const subscribes = Object.keys(mutationOnChange).map((key) => {
                return form.subscribe((state) => {

                    mutationOnChange[key](form, state.values, prevState);

                    prevState = state.values;
                }, { [key]: true });
            });

            return () => subscribes.forEach((unsub) => unsub());
        }
    }, [form])

    return children;
}


const EditableForm = ({ children, mutationOnChange, ...props }) => {
    return (
        <SimpleForm {...props}>
            <EditableFormContent mutationOnChange={mutationOnChange}>
                {children}
            </EditableFormContent>
        </SimpleForm>
    );
}

export const CollectionCreate = (props) => {
    const [allowSave, setAllowSave] = useState(false);

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

        return {
            sourceLink,
            service,
            type,
            idInService,
        }
    }

    return (
        <Create
            {...props}
            title="Add background to collection"
            aside={<ExampleCreateRow />}
            actions={<PostEditActions />}
        >
            <EditableForm
                toolbar={(
                    <PostCreateToolbar
                        disabledSave={!allowSave}
                    />
                )}
                mutationOnChange={{
                    values: (form, state, prevState) => {
                        if (state.sourceLink !== prevState?.sourceLink) {
                            const parsedLink = parseLink(state.sourceLink || '');

                            form.batch(() => {
                                form.change('service', parsedLink.service);
                                form.change('type', parsedLink.type);
                                form.change('idInService', parsedLink.idInService);
                            });


                            setAllowSave(
                                !!parsedLink.sourceLink
                                && !!parsedLink.idInService
                                && !!parsedLink.type
                                && !!parsedLink.service
                                && !!state.collectionType
                            );
                        } else {
                            setAllowSave(
                                !!state.sourceLink
                                && !!state.idInService
                                && !!state.type
                                && !!state.service
                                && !!state.collectionType
                            );
                        }
                    }
                }}
            >
                <Box display="flex" flexDirection="column" maxWidth={360}>
                    <Typography variant="h5">Add wallpaper in collection</Typography>
                    <TextInput source="sourceLink" />
                    <SelectInput
                        source="service"
                        allowEmpty={false}
                        choices={[
                            { id: 'unsplash', name: 'Unsplash' },
                            { id: 'pexels', name: 'Pexels' },
                            { id: 'pixabay', name: 'Pixabay' },
                        ]}
                    />
                    <SelectInput
                        source="type"
                        allowEmpty={false}
                        choices={[
                            { id: 'image', name: 'Image' },
                            { id: 'video', name: 'Video' },
                        ]}
                    />
                    <TextInput
                        source="idInService"
                        label="Id in service"
                    />
                    <SelectInput
                        source="collectionType"
                        allowEmpty={false}
                        choices={[
                            { id: 'default', name: 'Default' },
                            { id: 'best', name: 'Best' },
                        ]}
                    />
                </Box>
            </EditableForm>
        </Create>
    );
};
