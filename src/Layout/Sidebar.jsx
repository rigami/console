import { Sidebar } from "react-admin";

const CustomSidebar = (props) => (
    <Sidebar
        {...props}
        userMenu={false}
    />
);

export default CustomSidebar;
