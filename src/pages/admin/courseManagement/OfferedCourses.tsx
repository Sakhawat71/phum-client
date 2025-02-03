import { useGetOfferedCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { Table, Typography, Spin, Alert } from "antd";
import { ICourse } from "../../../types/courseManagement.type";
const { Title } = Typography;

const OfferedCourses = () => {
    const { data: coursesData, isLoading, isError } = useGetOfferedCoursesQuery(undefined);

        // console.log(coursesData?.data?.result);
        // console.log(coursesData?.data?.meta);


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
            title: "Course Code",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Credits",
            dataIndex: "credits",
            key: "credits",
        },
    ];

    if (isLoading) {
        return <Spin size="large" style={{ display: "block", textAlign: "center", marginTop: "50px" }} />;
    }

    if (isError) {
        return <Alert message="Failed to fetch courses!" type="error" showIcon />;
    }

    return (
        <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
            <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
                Offered Courses
            </Title>
            <Table
                dataSource={coursesData?.data?.result?.map((course: ICourse) => ({ ...course, key: course._id })) || []}
                columns={columns}
                bordered
            />
            <div>
                <h3 style={{color: 'red'}}>page under construction</h3>
            </div>
        </div>
    );
};

export default OfferedCourses;
