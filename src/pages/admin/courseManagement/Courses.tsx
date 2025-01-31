import { Table, Space, Button, message, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGetCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import PHSelect from "../../../components/form/PHSelect";
import { useGetFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { useState } from "react";
import PHForm from "../../../components/form/PHform";
import { FieldValues, SubmitHandler } from "react-hook-form";

const Courses = () => {
    const { data: coursesData, isLoading, error, refetch } = useGetCoursesQuery(undefined);
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);


    // console.log(facultyData);

    if (error) {
        message.error("Failed to fetch courses.");
    }

    const showAssignFacultyModal = (courseId: string) => {
        setSelectedCourse(courseId);
    };

    const closeAssignFacultyModal = () => {
        setSelectedCourse(null);
    };

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
        {
            title: "Actions",
            key: "actions",
            render: (record: any) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => showAssignFacultyModal(record._id)}
                    >
                        Assign Faculty
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={coursesData?.data || []}
                loading={isLoading}
                rowKey="_id"
                bordered
            />

            {/* Assign Faculty Modal */}
            {selectedCourse && (
                <AddFacultyModal 
                    courseId={selectedCourse} 
                    onClose={closeAssignFacultyModal} 
                    refetch={refetch} 
                />
            )}
        </>
    );
};

const AddFacultyModal = ({
    courseId,
    onClose,
    refetch,
}: {
    courseId: string;
    onClose: () => void;
    refetch: () => void;
}) => {
    const { data: facultyData } = useGetFacultiesQuery(undefined);

    const facultyOptions = facultyData?.data?.map((faculty) => ({
        value: faculty._id,
        label: `${faculty.fullName} (${faculty?.academicFaculty?.name})`,
    }));
    
    // console.log(facultyData?.data);
    // console.log(facultyOptions);


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // console.log("Assigning faculty:", data.faculties, "to course:", courseId);
        
        
        // Here, you would call your API to assign the faculty to the course.
        
        
        console.log(data);

        message.success(`Faculty assigned successfully to course ID: ${courseId}`);
        onClose(); // Close modal after submission
        refetch(); // Refresh course data
    };

    return (
        <Modal
            title="Assign Faculty"
            open={true}
            onCancel={onClose}
            footer={null}
        >
            <PHForm onSubmit={onSubmit}>
                <PHSelect
                    name="faculties"
                    mode="multiple"
                    label="Select Faculty"
                    options={facultyOptions || []}
                    placeholder="Choose faculty"
                />
            </PHForm>
        </Modal>
    );
};

export default Courses;
