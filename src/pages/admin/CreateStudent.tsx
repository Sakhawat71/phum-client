import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../components/form/PHform";
import PHInput from "../../components/form/PHinput";
import PHSelect from "../../components/form/PHSelect";

const CreateStudent = () => {


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // console.log(data);
        // const datax = JSON.stringify(data);
        // const formData = new FormData();
        // formData.append('data',datax);
        // console.log(Object.fromEntries(formData));
        // console.log(JSON.stringify(data));

        console.log(data);
    };

    return (

        <PHForm onSubmit={onSubmit} key={'create-student'}>

            <h1 style={{display : 'flex', justifyContent : 'center'}}>Student Information</h1>
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
                    options={[
                        { value: "676fb94c58dcd9e0647fb0c1", label: "Fall 2024" },
                        { value: "676fb0d2a5e867ac0d31ba5b", label: "Spring 2025" },
                    ]}
                    placeholder="Select Semester"
                />
                <PHSelect
                    name="academicDepartment"
                    label="Academic Department:"
                    options={[
                        { value: "676fb0d2a5e867ac0d31ba5b", label: "Computer Science" },
                        { value: "676fb0d2a5e867ac0d31ba5c", label: "Mathematics" },
                    ]}
                    placeholder="Select Department"
                />
            </div>
        </PHForm>
    );
};

export default CreateStudent;