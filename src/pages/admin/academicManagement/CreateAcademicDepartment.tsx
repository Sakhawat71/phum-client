import { zodResolver } from "@hookform/resolvers/zod";
import PHForm from "../../../components/form/PHform";
import { useAddAcademicDepartmentMutation, useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import PHSelect from "../../../components/form/PHSelect";
import PHInput from "../../../components/form/PHinput";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import { TCreateADepartment } from "../../../types/academicManagement.type";
import { toast } from "sonner";

const CreateAcademicDepartment = () => {

    const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
    const { data: facultyData } = useGetAcademicFacultiesQuery(undefined);
    const faculties = facultyData?.data;
    // console.log(faculties);

    const onSubmit = async (data: TCreateADepartment) => {
        // console.log(data);
        const toastId = toast.loading('Creating Department')

        try {
            await addAcademicDepartment({
                name: data.name,
                academicFaculty: data.academicFaculty,
            }).unwrap();
            toast.success("Academic Department created successfully!", {
                id: toastId
            });
        } catch (error) {
            toast.error("Failed to create Academic Department. Please try again.", {
                id: toastId
            });
        }
    };

    const facultyOptions = faculties?.map((faculty) => ({
        label: faculty.name,
        value: faculty._id,
    }))

    return (
        <div>
            <h2 style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>Create Academic Department</h2>

            <PHForm onSubmit={onSubmit} resolver={zodResolver(academicDepartmentSchema)} >
                <PHSelect
                    name="academicFaculty"
                    label="Select Faculty"
                    options={facultyOptions || []}
                />
                <PHInput
                    name="name"
                    type="text"
                    label="Department Name"
                    placeholder="Enter department name"
                />
            </PHForm>
        </div>
    );
};

export default CreateAcademicDepartment;