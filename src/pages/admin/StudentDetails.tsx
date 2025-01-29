import { Card, Descriptions, Spin, Avatar, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { useGetStudentByIdQuery } from "../../redux/features/admin/userManagement.api";

const StudentDetails = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetStudentByIdQuery(studentId);
    const student = data?.data;
    // console.log(data);

    if (isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <Card
            title={
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate(-1)}
                    />
                    Student Details
                </div>
            }
            style={{ maxWidth: 800, margin: "auto", marginTop: 20 }}
        >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                <Avatar
                    size={100}
                    src={student?.profileImg || ""}
                />
            </div>

            <Descriptions bordered column={1}>
                <Descriptions.Item label="Full Name">
                    {`${student?.name?.firstName || ""} ${student?.name?.middleName || ""} ${student?.name?.lastName || ""}`}
                </Descriptions.Item>
                <Descriptions.Item label="Student ID">{student?.id}</Descriptions.Item>
                <Descriptions.Item label="Email">{student?.email}</Descriptions.Item>
                <Descriptions.Item label="Contact No">{student?.contactNo}</Descriptions.Item>
                <Descriptions.Item label="Gender">{student?.gender}</Descriptions.Item>
                <Descriptions.Item label="Date of Birth">{student?.dateOfBirth}</Descriptions.Item>
            </Descriptions>

            <h3 style={{ marginTop: 20 }}>Guardian Information</h3>
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Father's Name">{student?.guardian?.fatherName}</Descriptions.Item>
                <Descriptions.Item label="Father's Contact">{student?.guardian?.fatherContactNo}</Descriptions.Item>
                <Descriptions.Item label="Mother's Name">{student?.guardian?.motherName}</Descriptions.Item>
                <Descriptions.Item label="Mother's Contact">{student?.guardian?.motherContactNo}</Descriptions.Item>
            </Descriptions>

            <h3 style={{ marginTop: 20 }}>Academic Information</h3>
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Admission Semester">{student?.admissionSemester?.name}</Descriptions.Item>
                <Descriptions.Item label="Department">{student?.academicDepartment?.name}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default StudentDetails;
