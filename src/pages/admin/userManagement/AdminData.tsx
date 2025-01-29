import { Table, Button, Space, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetAdminsQuery } from "../../../redux/features/admin/userManagement.api";
import { IAdmin } from "../../../types";
import { Link } from "react-router";
// import { useNavigate } from "react-router";

const AdminData = () => {
    const { data, isLoading, error } = useGetAdminsQuery(undefined);
    const admins = data?.data as IAdmin[] || [];
    // const navigate = useNavigate();

    if (error) {
        message.error("Failed to fetch admins.");
    }

    // const handleDelete = async (id: string) => {
    //     try {
    //         await deleteAdmin(id).unwrap();
    //         message.success("Admin deleted successfully!");
    //     } catch {
    //         message.error("Failed to delete admin.");
    //     }
    // };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Contact No",
            dataIndex: "contactNo",
            key: "contactNo",
        },
        {
            title: "Admin Name",
            dataIndex: "name",
            key: "name",
            render: (name: { firstName: string; lastName: string }) =>
                `${name.firstName} ${name.lastName}`,
        },
        {
            title: "Actions",
            key: "actions",
            render: (record: IAdmin) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                    // onClick={() => navigate(`/admin/edit/${record._id}`)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure?"
                        // onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<DeleteOutlined />}>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    return (
        <Table
            columns={columns}
            dataSource={admins as IAdmin[] || []}
            loading={isLoading}
            rowKey="_id"
            bordered
        />
    );
};

export default AdminData;
