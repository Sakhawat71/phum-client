import { Table, Button, Space } from "antd";
import { useGetStudentsQuery } from "../../redux/features/admin/userManagement.api";

const StudentData = () => {
    const { data, isLoading } = useGetStudentsQuery(undefined);
    const studentData = data?.data?.result || [];

    const columns = [
        {
            title: "Student ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Student Name",
            dataIndex: "name",
            key: "name",
            render: (name: { firstName: string; lastName: string }) =>
                `${name.firstName} ${name.lastName}`,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button type="link" onClick={() => console.log("Details", record)}>Details</Button>
                    <Button type="primary" onClick={() => console.log("Update", record)}>Update</Button>
                    <Button type="dashed" danger onClick={() => console.log("Delete", record)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h2>Total Students: {studentData.length}</h2>
            <Table
                columns={columns}
                dataSource={studentData}
                loading={isLoading}
                rowKey="id"
                bordered
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default StudentData;
