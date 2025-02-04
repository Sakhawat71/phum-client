import { Table, Typography, Tag } from "antd";
import { useGetEnrolledCoursesQuery } from "../../redux/features/student/studentCourse.api";

const { Title } = Typography;

const EnrolledCourses = () => {
    const { data: enrolledCourses, isLoading } = useGetEnrolledCoursesQuery(undefined);

    const columns = [
        {
            title: "Course Code",
            dataIndex: "code",
            key: "code",
            render: (_: any, record: any) => `${record.course.prefix}-${record.course.code}`,
        },
        {
            title: "Course Name",
            dataIndex: "title",
            key: "title",
            render: (_: any, record: any) => record.course.title,
        },
        {
            title: "Grade",
            dataIndex: "grade",
            key: "grade",
            render: (_: any, record: any) =>
                record.isCompleted ? (
                    <Tag color={record.grade !== "NA" ? "blue" : "red"}>
                        {record.grade !== "NA" ? record.grade : "Not Available"}
                    </Tag>
                ) : (
                    <Tag color="orange">In Progress</Tag>
                ),
        },
        {
            title: "GPA",
            dataIndex: "gradePoints",
            key: "gradePoints",
            render: (_: any, record: any) =>
                record.isCompleted ? (
                    <Tag color={record.gradePoints > 0 ? "green" : "red"}>
                        {record.gradePoints > 0 ? record.gradePoints.toFixed(2) : "0.00"}
                    </Tag>
                ) : (
                    <Tag color="orange">In Progress</Tag>
                ),
        },
    ];

    if (isLoading) return <div>Loading enrolled courses...</div>;

    return (
        <div style={{ padding: "20px" }}>
            <Title level={2} style={{ textAlign: "center" }}>Enrolled Courses</Title>
            <Table
                dataSource={enrolledCourses?.data}
                columns={columns}
                rowKey={(record) => record._id}
                pagination={{ pageSize: 5 }}
                bordered
            />
        </div>
    );
};

export default EnrolledCourses;
