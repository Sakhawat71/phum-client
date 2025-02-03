import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.route";
import { facultyPaths } from "../../routes/faculty.route";
import { studentPaths } from "../../routes/student.route";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifytoken } from "../../utils/verifyToken";

const userRole = {
    ADMIN: 'admin',
    FACULTY: 'faculty',
    STUDENT: 'student',
};

const Sidebar = () => {
    let user;
    // const user = useAppSelector(useCurrentUser);
    const token = useAppSelector(useCurrentToken);

    if (token) {
        user = verifytoken(token);
    }

    let slidBarItems;

    switch ((user as TUser)?.role) {
        case userRole.ADMIN:
            slidBarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
            break;
        case userRole.FACULTY:
            slidBarItems = sidebarItemsGenerator(facultyPaths, userRole.FACULTY);
            break;
        case userRole.STUDENT:
            slidBarItems = sidebarItemsGenerator(studentPaths, userRole.STUDENT);
            break;

        default:
            break;
    };

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div
                style={{
                    color: 'white',

                    height: '4rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h1>PH Uni</h1>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['4']}
                items={slidBarItems}
            />
        </Sider>
    );
};

export default Sidebar;