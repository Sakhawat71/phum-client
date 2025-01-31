import { Table, Space, Button, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGetCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import PHSelect from "../../../components/form/PHSelect";
import { useGetFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { useState } from "react";

const Courses = () => {
    const { data: coursesData, isLoading, error, refetch } = useGetCoursesQuery(undefined);
    const { data: facultyData } = useGetFacultiesQuery(undefined);
    console.log(facultyData?.data);
    const [selectedFaculties, setSelectedFaculties] = useState<Record<string, string>>({});


    if (error) {
        message.error("Failed to fetch courses.");
    }

    const handleAssignFaculty = async (courseId: string) => {
        const facultyId = prompt("Enter Faculty ID to assign:");
        if (!facultyId) return;

        // const toastId = message.loading("Assigning faculty...");
        // try {
        //     await assignFaculty({ courseId, facultyId }).unwrap();
        //     message.success("Faculty assigned successfully!", toastId);
        //     refetch();
        // } catch (err) {
        //     message.error("Failed to assign faculty.", toastId);
        // }
    };


    const facultyOptions = facultyData?.data?.map((faculty) => ({
        value: faculty._id,
        label: `${faculty.name} (${faculty.department})`,
    }));


    const columns = [
        {
            title: "Course Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Prefix",
            dataIndex: "prefix",
            key: "prefix",
        },
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Credits",
            dataIndex: "credits",
            key: "credits",
        },
        // {
        //     title: "Actions",
        //     key: "actions",
        //     render: (record: any) => (
        //         <Space>
        //             <PHSelect
        //                 name={`faculty-${record._id}`}
        //                 label="Assign Faculty"
        //                 options={facultyData?.data || []}
        //                 placeholder="Select Faculty"
        //                 value={selectedFaculties[record._id] || undefined}
        //                 onChange={(value) => setSelectedFaculties({ ...selectedFaculties, [record._id]: value })}
        //             />
        //             <Button type="primary" icon={<EditOutlined />} onClick={() => handleAssignFaculty(record._id)}>
        //                 Assign
        //             </Button>
        //         </Space>
        //     ),
        // },
    ];


    return (
        <Table
            columns={columns}
            dataSource={coursesData?.data || []}
            loading={isLoading}
            rowKey="_id"
            bordered
        />
    );
};

export default Courses;
