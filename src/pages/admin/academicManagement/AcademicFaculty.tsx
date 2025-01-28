import { Table } from "antd";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicFaculty = () => {

    const { data : facultyData, isError, isLoading } = useGetAcademicFacultiesQuery(undefined);
    // console.log(data, isError, isLoading);


    const columns = [
        {
            title: "Faculty Name",
            dataIndex: "name",
            key: "name",
        },
    ];

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Failed to load data. Please try again later.</p>;
    }

    const tableData = facultyData?.data?.map((faculty) => ({
        key: faculty._id,
        name: faculty.name,
    }));

    return (
        <div style={{ padding: "20px" }}>
            <h2>Academic Faculties</h2>
            <Table
                columns={columns}
                dataSource={tableData}
                bordered
                pagination={{ pageSize: 5 }}
                rowKey="key"
            />
        </div>
    );
};

export default AcademicFaculty;