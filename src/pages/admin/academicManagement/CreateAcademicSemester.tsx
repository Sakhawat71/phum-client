import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHform";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions, nameOptions } from "../../../constants/semester";
import { zodResolver } from '@hookform/resolvers/zod';
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TAcademicSemester } from "../../../types/global.type";


type TResData = {
    data?: {
        data?: TAcademicSemester;
        message: string;
        success: boolean;
    }
    error?: any;
}

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4, 5].map((number) => ({
    label: String(currentYear + number),
    value: String(currentYear + number)
}));



const CreateAcademicSemester = () => {

    const [addAcademicSemester] = useAddAcademicSemesterMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const name = nameOptions[Number(data.name) - 1]?.label;
        const semmesterData = {
            name,
            code: data.name,
            year: data.year,
            startMonth: data.startMonth,
            endMonth: data.endMonth
        }

        // console.log(semmesterData);

        try {
            const res = await addAcademicSemester(semmesterData) as TResData;

            const successMessage = res.data?.message;
            const errorMessage = res.error?.data?.message;
            console.log(res);

            if (res.data?.success) {
                toast.success(successMessage);
            }
            if (res.error) {
                toast.error(errorMessage)
            }

        } catch (error) {
            // console.log(error);
            toast.error('Something went wrong')
        }
    };


    return (
        <PHForm onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)} >

            <PHSelect
                name="name"
                label="Semester Name:"
                placeholder="Select Semester"
                options={nameOptions}
            />
            <PHSelect
                name="year"
                label="Semester Year:"
                placeholder="Select Year"
                options={yearOptions}
            />

            <PHSelect
                name="startMonth"
                label="Start Month:"
                placeholder="Select start month"
                options={monthOptions}
            />
            <PHSelect
                name="endMonth"
                label="End Month"
                placeholder="Select end month"
                options={monthOptions}
            />
        </PHForm>
    );
};

export default CreateAcademicSemester;