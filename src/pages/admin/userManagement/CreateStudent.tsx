import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { Form, Input } from "antd";
import { toast } from "sonner";
import { useGetAcademicDepartmentQuery, useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import PHInput from "../../../components/form/PHinput";
import PHForm from "../../../components/form/PHform";
import PHSelect from "../../../components/form/PHSelect";




// const defStudent = {
//     // password: "Student123",
//     student: {
//         name: {
//             firstName: "Pablo",
//             middleName: "",
//             lastName: "Doe"
//         },
//         gender: "male",
//         dateOfBirth: "2000-08-12",
//         email: "pablo@gmail.com",
//         contactNo: "+9876543211",
//         emergencyContactNo: "+1234567899",
//         presentAddress: "45 Sunshine Avenue, City, Country",
//         permanentAddress: "90 Cloud Street, City, Country",
//         guardian: {
//             fatherName: "Mark Doe",
//             fatherOccupation: "Architect",
//             fatherContactNo: "+9988776655",
//             motherName: "Laura Doe",
//             motherOccupation: "Professor",
//             motherContactNo: "+8877665544"
//         },
//         localGuardian: {
//             name: "Alice Green",
//             occupation: "Software Engineer",
//             contactNo: "+6677889900",
//             address: "23 Blossom Lane, City, Country"
//         },
//         admissionSemester: "676fb94c58dcd9e0647fb0c1",
//         academicDepartment: "676fb0d2a5e867ac0d31ba5b",
//         isDeleted: false
//     }
// }




const CreateStudent = () => {

    const { data: semesterData, isLoading: semLoading } = useGetAllSemestersQuery(undefined);
    const { data: DepData, isLoading: depLoading } = useGetAcademicDepartmentQuery(undefined);
    const [addStudent,] = useAddStudentMutation();
    // console.log('data -> ', data);
    // console.log('error -> ', error);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        const toastId = toast.loading('Creating student profile')
        const { image, ...student } = data;
        const studentData = {
            password: 'Student123',
            student: student,
        };

        const formData = new FormData();
        formData.append('data', JSON.stringify(studentData));
        formData.append('file', image);
        // console.log(Object.fromEntries(formData));


        try {
            addStudent(formData);
            toast.success('Student created successfully',{id: toastId});
        } catch (error) {
            toast.error('Fail to create student', { id: toastId });
        }
    };


    const semesterOptions = semesterData?.data?.map((sem) => ({
        value: sem._id,
        label: `${sem.name} ${sem.year}`,
    }))

    const departmentOptions = DepData?.data?.map((dep) => ({
        value: dep._id,
        label: dep.name,
    }));

    return (

        <PHForm onSubmit={onSubmit} key={'create-student'}>

            <h1 style={{ display: 'flex', justifyContent: 'center' }}>Student Information</h1>
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
                    name="bloodGroup"
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

                <Controller
                    name="image"
                    render={({ field: { onChange, value, ...field } }) => (
                        <Form.Item label="Picture" >
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

            {/* Guardian Info */}
            <h3>Guardian Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <PHInput name="guardian.fatherName" type="text" label="Father's Name:" placeholder="Father's Name" />
                <PHInput name="guardian.fatherOccupation" type="text" label="Father's Occupation:" placeholder="Occupation" />
                <PHInput name="guardian.fatherContactNo" type="text" label="Father's Contact No:" placeholder="Contact Number" />
                <PHInput name="guardian.motherName" type="text" label="Mother's Name:" placeholder="Mother's Name" />
                <PHInput name="guardian.motherOccupation" type="text" label="Mother's Occupation:" placeholder="Occupation" />
                <PHInput name="guardian.motherContactNo" type="text" label="Mother's Contact No:" placeholder="Contact Number" />
            </div>

            {/* Local Guardian Info */}
            <h3>Local Guardian Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <PHInput name="localGuardian.name" type="text" label="Name:" placeholder="Guardian's Name" />
                <PHInput name="localGuardian.occupation" type="text" label="Occupation:" placeholder="Occupation" />
                <PHInput name="localGuardian.contactNo" type="text" label="Contact No:" placeholder="Contact Number" />
            </div>
            <PHInput name="localGuardian.address" type="text" label="Address:" placeholder="Guardian's Address" />

            {/* Academic Info */}
            <h3>Academic Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <PHSelect
                    name="admissionSemester"
                    label="Admission Semester:"
                    disabled={semLoading}
                    options={semesterOptions || []}
                    placeholder="Select Semester"
                />
                <PHSelect
                    name="academicDepartment"
                    label="Academic Department:"
                    disabled={depLoading}
                    options={departmentOptions || []}
                    placeholder="Select Department"
                />
            </div>
        </PHForm>
    );
};

export default CreateStudent;