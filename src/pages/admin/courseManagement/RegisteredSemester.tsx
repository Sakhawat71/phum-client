import { Table, Space, Button, message, Dropdown, Menu } from "antd";
import { useGetRegisterSemesterQuery, useUpdateRegisterSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { EditOutlined } from "@ant-design/icons";
import { toast } from "sonner";

const RegisteredSemester = () => {

    const { data: semestersData, isLoading, error } = useGetRegisterSemesterQuery(undefined);
    const [updateRegisterSemester] = useUpdateRegisterSemesterMutation();
    const semesters = semestersData?.data;


    if (error) {
        message.error("Failed to fetch registered semesters.");
    }

    const handleStatusUpdate = async (record: any, newStatus: string) => {

        const toastId = toast.loading('Semester status updating...')
        const id = record._id;
        const update = { status: newStatus };

        try {
            await updateRegisterSemester({ id, update }).unwrap();
            toast.success('Semester updated successfully', { id: toastId })
            // refetch()
        } catch (err: any) {
            // console.log(err?.data?.message);
            toast.error(err?.data?.message || 'An error occurred', { id: toastId })
        }
    };


    const columns = [
        {
            title: "Academic Semester",
            dataIndex: "academicSemester",
            key: "academicSemester",
            render: (data: any) =>
                ` ${data.name} ${data.year}`,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                let color = "";
                if (status === "ONGOING") color = "green";
                else if (status === "UPCOMING") color = "blue";
                else if (status === "ENDED") color = "red";

                return <span style={{ color, fontWeight: "bold" }}>{status}</span>;
            },
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
            render: (record: any) => {
                const menu = (
                    <Menu
                        onClick={({ key }) => handleStatusUpdate(record, key)}
                        items={[
                            { label: "Ongoing", key: "ONGOING" },
                            { label: "Upcoming", key: "UPCOMING" },
                            { label: "Ended", key: "ENDED" },
                        ]}
                    />
                );

                return (
                    <Space>
                        <Dropdown overlay={menu} trigger={["click"]}>
                            <Button type="primary" icon={<EditOutlined />}>Update</Button>
                        </Dropdown>
                    </Space>
                );
            },
        }
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
