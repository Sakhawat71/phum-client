import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHform";
import PHSelect from "../../../components/form/PHSelect";
import PHInput from "../../../components/form/PHinput";
import { Form, Input } from "antd";
import { toast } from "sonner";
import { useAddFacultryMutation } from "../../../redux/features/admin/userManagement.api";
import { useGetAcademicDepartmentQuery, useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";


const CreateFaculty = () => {
    const [createFaculty, { data: createFacultyData }] = useAddFacultryMutation();
    const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);
    const { data: academicDepartmentData } = useGetAcademicDepartmentQuery(undefined);


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating faculty profile...");
        const { image, ...faculty } = data;

        const facultyData = {
            password: "Faculty123",
            faculty: faculty,
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(facultyData));
        if (image) formData.append("file", image);

        try {
            await createFaculty(formData);
            toast.success("Faculty created successfully!", { id: toastId });
        } catch (error) {
            toast.error("Failed to create faculty!", { id: toastId });
        }
    };

    // console.log(academicFacultyData?.data);
    // console.log(academicDepartmentData?.data);
    // console.log(createFacultyData);

    const academicFacultyOptions = academicFacultyData?.data?.map((acaFac) => ({
        value: acaFac._id,
        label: acaFac.name
    }));

    const academicDepartmentOptions = academicDepartmentData?.data?.map((acaDep) => ({
        value: acaDep._id,
        label: acaDep.name,
    }))


    return (
        <PHForm onSubmit={onSubmit}>
            <h1 style={{ textAlign: "center" }}>Faculty Information</h1>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <PHInput name="name.firstName" type="text" label="First Name:" placeholder="First Name" />
                <PHInput name="name.middleName" type="text" label="Middle Name:" placeholder="Middle Name" />
                <PHInput name="name.lastName" type="text" label="Last Name:" placeholder="Last Name" />
                <PHSelect
                    name="gender"
                    label="Gender:"
                    options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" },
                    ]}
                    placeholder="Select Gender"
                />
                <PHSelect
                    name="bloogGroup"
                    label="Blood Group:"
                    options={[
                        { value: "A+", label: "A+" },
                        { value: "A-", label: "A-" },
                        { value: "B+", label: "B+" },
                        { value: "B-", label: "B-" },
                        { value: "AB+", label: "AB+" },
                        { value: "AB-", label: "AB-" },
                        { value: "O+", label: "O+" },
                        { value: "O-", label: "O-" },
                    ]}
                    placeholder="Select Blood Group"
                />
                <PHInput name="dateOfBirth" type="date" label="Date of Birth:" placeholder="Date of Birth" />
                <PHSelect
                    name="designation"
                    label="Designation:"
                    options={[
                        { value: "Lecturer", label: "Lecturer" },
                        { value: "Assistant Professor", label: "Assistant Professor" },
                        { value: "Professor", label: "Professor" },
                    ]}
                    placeholder="Select Designation"
                />
                <PHSelect
                    name="academicFaculty"
                    label="Academic Faculty:"
                    options={academicFacultyOptions || []}
                    placeholder="Select Faculty"
                />
                <PHSelect
                    name="academicDepartment"
                    label="Academic Department:"
                    options={academicDepartmentOptions || []}
                    placeholder="Select Department"
                />
                <Controller
                    name="image"
                    render={({ field: { onChange, value, ...field } }) => (
                        <Form.Item label="Profile Picture">
                            <Input
                                type="file"
                                {...field}
                                value={value?.fileName}
                                onChange={(e) => onChange(e.target.files?.[0])}
                            />
                        </Form.Item>
                    )}
                />
                <PHInput name="email" type="email" label="Email:" placeholder="Email Address" />
                <PHInput name="contactNo" type="text" label="Contact No:" placeholder="Contact Number" />
                <PHInput name="emergencyContactNo" type="text" label="Emergency Contact No:" placeholder="Emergency Contact" />
            </div>

            <PHInput name="presentAddress" type="text" label="Present Address:" placeholder="Present Address" />
            <PHInput name="permanentAddress" type="text" label="Permanent Address:" placeholder="Permanent Address" />
        </PHForm>
    );
};

export default CreateFaculty;
