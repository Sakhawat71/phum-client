import { zodResolver } from "@hookform/resolvers/zod";
import PHForm from "../../../components/form/PHform";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import PHInput from "../../../components/form/PHinput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { message } from "antd";


type AcademicFacultyFormData = z.infer<typeof academicFacultySchema>;

const CreateAcademicFaculty = () => {

    const [addAcademicFaculty] = useAddAcademicFacultyMutation();

    const {
        reset,
    } = useForm<AcademicFacultyFormData>({
        resolver: zodResolver(academicFacultySchema),
        defaultValues: {
            name: "",
        },
    });
    const onSubmit = async (data: AcademicFacultyFormData) => {
        console.log(data);
        try {
            await addAcademicFaculty(data).unwrap();
            message.success("Academic Faculty created successfully!");
            reset();
        } catch (error) {
            message.error("Failed to create Academic Faculty. Please try again.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{display : 'flex' , justifyContent : 'center', marginBottom: '10px'}}>Create Academic Faculty</h2>
            <PHForm
                onSubmit={onSubmit}
                resolver={zodResolver(academicFacultySchema)}
            >
                <PHInput
                    name="name"
                    label="Faculty Name"
                    type="text"
                    key="name"
                />
            </PHForm>
        </div>
    );
};

export default CreateAcademicFaculty;