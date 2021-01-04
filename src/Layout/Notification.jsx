import { Notification } from 'react-admin';
import {Slide} from "@material-ui/core";

const CustomNotification = props => (
    <Notification
        {...props}
        autoHideDuration={5000}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        TransitionComponent={Slide}
        TransitionProps={{
            direction: 'right'
        }}
    />
);

export default CustomNotification;
