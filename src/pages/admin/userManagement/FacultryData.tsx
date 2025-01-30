import { Button, Popconfirm, Space, Table } from "antd";
import { useGetFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const FacultryData = () => {

    const { data: faculties , error, isLoading} = useGetFacultiesQuery(undefined)

    // console.log(faculties?.data);

    if (error) {
        toast.error("Failed to fetch admins.");
    }

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
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (name: { firstName: string; lastName: string }) =>
                `${name.firstName} ${name.lastName}`,
        },
        {
            title: "Actions",
            key: "actions",
            render: (record : any) => (
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
            dataSource={faculties?.data || []}
            loading={isLoading}
            rowKey="_id"
            bordered
        />
    );
};

export default FacultryData;