import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHform";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions, nameOptions } from "../../../constants/semester";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'



const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4, 5].map((number) => ({
    label: String(currentYear + number),
    value: String(currentYear + number)
}));

const CreateAcademicSemester = () => {

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const name = nameOptions[Number(data.name) - 1]?.label;
        const semmesterData = {
            name,
            code: data.name,
            year: data.year,
            startMonth: data.startMonth,
            endMonth: data.endMonth
        }
        console.log(semmesterData);
    };

    const academicSemesterSchema = z.object({
        name: z.string().min(1, { message: "Name is required" }),
        year: z.string().min(1, { message: "Year is required" }),
        startMonth: z.string().min(1, { message: "Start month is required" }),
        endMonth: z.string().min(1, { message: "End month is required" }),
    });


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