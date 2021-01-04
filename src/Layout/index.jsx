import { Layout } from 'react-admin';
import AppBar from './AppBar';
// import MySidebar from './MySidebar';
import Menu from './Menu';
// import MyNotification from './MyNotification';

const MyLayout = props => <Layout
    {...props}
    appBar={AppBar}
    // sidebar={MySidebar}
    menu={Menu}
    // notification={MyNotification}
/>;

export default MyLayout;
