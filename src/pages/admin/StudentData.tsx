import { Table, Button, Space } from "antd";
import { useState } from "react";
import { useGetStudentsQuery } from "../../redux/features/admin/userManagement.api";

const StudentData = () => {
    const [currentPage, setCurrentPage] = useState(1); // Manage page state
    const pageSize = 10; // Set the limit per page

    const query = {
        // searchTerm: "Mrs",
        // email: "mir@example.com",
        sort: "id",
        page: currentPage,
        // fields: "name,email,contactNo",
        limit: pageSize,
    };

    const { data, isLoading } = useGetStudentsQuery(query);
    const studentData = data?.data?.result || [];
    const totalStudents = data?.data?.meta?.total || 0; // Assuming your API returns total count
    // console.log(refetch);

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
            <h2>Total Students: {totalStudents}</h2>
            <Table
                columns={columns}
                dataSource={studentData}
                loading={isLoading}
                rowKey="id"
                bordered
                pagination={{
                    current: currentPage,
                    pageSize,
                    total: totalStudents,
                    onChange: (page) => setCurrentPage(page), // Update page on change
                }}
            />
        </div>
    );
};

export default StudentData;
