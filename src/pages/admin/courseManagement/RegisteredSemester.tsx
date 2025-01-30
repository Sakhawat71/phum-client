import { Table, Space, Button, message } from "antd";
import { useGetRegisterSemesterQuery } from "../../../redux/features/admin/courseManagement.api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const RegisteredSemester = () => {
    const { data: semestersData, isLoading, error } = useGetRegisterSemesterQuery(undefined);

    const semesters = semestersData.data;

    if (error) {
        message.error("Failed to fetch registered semesters.");
    }

    const columns = [
        {
            title: "Academic Semester",
            dataIndex: "academicSemester",
            key: "academicSemester",
            render: (data : any) =>
                ` ${data.name} ${data.year}`,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Start Date",
            dataIndex: "startDate",
            key: "startDate",
            render: (date: string) => new Date(date).toDateString(),
        },
        {
            title: "End Date",
            dataIndex: "endDate",
            key: "endDate",
            render: (date: string) => new Date(date).toDateString(),
        },
        {
            title: "Min Credit",
            dataIndex: "minCredit",
            key: "minCredit",
        },
        {
            title: "Max Credit",
            dataIndex: "maxCredit",
            key: "maxCredit",
        },
        {
            title: "Actions",
            key: "actions",
            render: (record: any) => (
                <Space>
                    <Button type="primary" icon={<EditOutlined />}>
                        Update
                    </Button>
                    <Button danger icon={<DeleteOutlined />}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={semesters || []}
            loading={isLoading}
            rowKey="_id"
            bordered
        />
    );
};

export default RegisteredSemester;
