import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHform";
import PHInput from "../../../components/form/PHinput";
import PHSelect from "../../../components/form/PHSelect";
import { Form, Input } from "antd";
import { toast } from "sonner";
import { useAddAdminMutation } from "../../../redux/features/admin/userManagement.api";


const CreateAdmin = () => {
    const [addAdmin,{data}] = useAddAdminMutation(undefined);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating admin profile...");
        const { image, ...admin } = data;
        admin.designation = "Admin";
        const adminData = {
            password: "Admin123",
            admin: admin,
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(adminData));
        if (image) formData.append("file", image);

        // console.log(data);
        // console.log(Object.fromEntries(formData));
        try {
            await addAdmin(formData);
            toast.success("Admin created successfully!", { id: toastId });
        } catch (error) {
            toast.error("Failed to create admin!", { id: toastId });
        }
    };

    console.log(data);

    return (
        <PHForm onSubmit={onSubmit} >
            <h1 style={{ display: "flex", justifyContent: "center" }}>Admin Information</h1>
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

export default CreateAdmin;
