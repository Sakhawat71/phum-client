import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router";
import PHForm from "../../components/form/PHform";
import PHInput from "../../components/form/PHinput";
import PHSelect from "../../components/form/PHSelect";
import { useGetAcademicDepartmentQuery, useGetAllSemestersQuery } from "../../redux/features/admin/academicManagement.api";
import { useGetStudentByIdQuery, useUpdateStudentMutation } from "../../redux/features/admin/userManagement.api";
import { Form, Input, Spin } from "antd";
import { toast } from "sonner";

const UpdateStudent = () => {
    const { studentId } = useParams();
    const { data: studentData, isLoading } = useGetStudentByIdQuery(studentId);
    const [updateStudent, { isLoading: updating }] = useUpdateStudentMutation();

    const { data: semesterData, isLoading: semLoading } = useGetAllSemestersQuery(undefined);
    const { data: DepData, isLoading: depLoading } = useGetAcademicDepartmentQuery(undefined);

    if (isLoading) return <Spin tip="Loading student data..." size="large" />;

    const student = studentData?.data;
    console.log('org data' , student);

    const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
        const toastId = toast.loading("Updating student profile...");
        try {
            await updateStudent({ studentId, updatedData: formData }).unwrap();
            toast.success("Student updated successfully!", { id: toastId });
        } catch (error) {
            toast.error("Failed to update student", { id: toastId });
        }
    };

    const semesterOptions = semesterData?.data?.map((sem) => ({
        value: sem._id,
        label: `${sem.name} ${sem.year}`,
    }));

    const departmentOptions = DepData?.data?.map((dep) => ({
        value: dep._id,
        label: dep.name,
    }));

    return (
        <PHForm onSubmit={onSubmit} key={"update-student"} defaultValues={student}>
            <h1 style={{ display: "flex", justifyContent: "center" }}>Update Student Information</h1>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <PHInput name="name.firstName" type="text" label="First Name:" />
                <PHInput name="name.middleName" type="text" label="Middle Name:" />
                <PHInput name="name.lastName" type="text" label="Last Name:" />
                <PHSelect
                    name="gender"
                    label="Gender:"
                    options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" },
                    ]}
                />
                <PHInput name="dateOfBirth" type="date" label="Date of Birth:" />

                <Controller
                    name="image"
                    render={({ field: { onChange, value, ...field } }) => (
                        <Form.Item label="Picture">
                            <Input type="file" {...field} value={value?.fileName} onChange={(e) => onChange(e.target.files?.[0])} />
                        </Form.Item>
                    )}
                />
                <PHInput name="email" type="email" label="Email:" />
                <PHInput name="contactNo" type="text" label="Contact No:" />
                <PHInput name="emergencyContactNo" type="text" label="Emergency Contact No:" />
            </div>

            <PHInput name="presentAddress" type="text" label="Present Address:" />
            <PHInput name="permanentAddress" type="text" label="Permanent Address:" />

            {/* Guardian Info */}
            <h3>Guardian Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <PHInput name="guardian.fatherName" type="text" label="Father's Name:" />
                <PHInput name="guardian.fatherOccupation" type="text" label="Father's Occupation:" />
                <PHInput name="guardian.fatherContactNo" type="text" label="Father's Contact No:" />
                <PHInput name="guardian.motherName" type="text" label="Mother's Name:" />
                <PHInput name="guardian.motherOccupation" type="text" label="Mother's Occupation:" />
                <PHInput name="guardian.motherContactNo" type="text" label="Mother's Contact No:" />
            </div>

            {/* Local Guardian Info */}
            <h3>Local Guardian Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <PHInput name="localGuardian.name" type="text" label="Name:" />
                <PHInput name="localGuardian.occupation" type="text" label="Occupation:" />
                <PHInput name="localGuardian.contactNo" type="text" label="Contact No:" />
            </div>
            <PHInput name="localGuardian.address" type="text" label="Address:" />

            {/* Academic Info */}
            <h3>Academic Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <PHSelect name="admissionSemester" label="Admission Semester:" disabled={semLoading} options={semesterOptions || []} />
                <PHSelect name="academicDepartment" label="Academic Department:" disabled={depLoading} options={departmentOptions || []} />
            </div>

            {/* <Button type="primary" htmlType="submit" loading={updating} style={{ marginTop: "16px", width: "100%" }}>
                Update Student
            </Button> */}
        </PHForm>
    );
};

export default UpdateStudent;
