import { Sidebar } from "react-admin";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: { height: 'unset' },
    drawerPaper: { width: 200 },
    fixed: { height: 'unset', width: 'inherit', },
}));

const CustomSidebar = ({ children, ...props }) => {
    const classes = useStyles();

    return (
        <Sidebar
            {...props}
            classes={{
                root: classes.root,
                drawerPaper: classes.drawerPaper,
                fixed: classes.fixed,
            }}
            userMenu={false}
        >
            {children}
        </Sidebar>
    );
};

export default CustomSidebar;
