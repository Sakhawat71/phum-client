import { Card, Table, Typography } from "antd";
import { useGetAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
const { Title } = Typography;

const AcademicDepartment = () => {

    const { data, isFetching } = useGetAcademicDepartmentQuery(undefined);
    // console.log(isFetching, data);


    const tableData = data?.data?.map((department: any) => ({
        key: department._id,
        name: department.name,
        facultyName: department.academicFaculty.name,
    }));

    const columns = [
        {
            title: "Department Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Faculty Name",
            dataIndex: "facultyName",
            key: "facultyName",
        },
    ];


    if (isFetching) {
        return <div>loading.......</div>
    }
    return (
        <div style={{ padding: "20px" }}>
            <Card style={{ borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
                <Title level={3} style={{display: 'flex', justifyContent: 'center', marginBottom: "16px" }}>
                    Academic Departments
                </Title>
                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={{ pageSize: 5 }}
                    bordered
                />
            </Card>
        </div>
    );
};

export default AcademicDepartment;