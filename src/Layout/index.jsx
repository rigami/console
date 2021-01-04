import { Layout } from 'react-admin';
import AppBar from './AppBar';
// import MySidebar from './MySidebar';
import Menu from './Menu';
import CustomNotification from './Notification';

const MyLayout = props => <Layout
    {...props}
    appBar={AppBar}
    // sidebar={MySidebar}
    menu={Menu}
    notification={CustomNotification}
/>;

export default MyLayout;
