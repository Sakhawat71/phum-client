import { Button, Layout } from "antd";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";
const { Header, Content } = Layout;


const MainLayout = () => {

    const dispatch = useAppDispatch();
    const handelLogOut = () => {
        dispatch(logOut())
    };


    return (
        <Layout style={{ height: '100%' , minHeight : '100vh'}}>
            <Sidebar />
            <Layout>
                <Header style={{ padding: 0, display: 'flex', justifyContent: 'right', alignContent: 'center', paddingRight: '50px' }} >
                    <div>
                        <Button
                            style={{ color: 'white', background: '#001529' }}
                            onClick={handelLogOut}
                        >Log Out</Button>
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>

            </Layout>

        </Layout>
    );
};

export default MainLayout;